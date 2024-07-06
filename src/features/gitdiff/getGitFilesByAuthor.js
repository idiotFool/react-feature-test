const { execSync } = require('child_process');
const fs = require('fs');

// 获取命令行参数
const author = process.argv[2];
const since = process.argv[3];
const until = process.argv[4];

if (!author || !since || !until) {
  console.error("Usage: node getFinalChanges.js <author> <since> <until>");
  process.exit(1);
}

try {
  // 检查当前工作目录是否干净
  const statusCommand = `git status --porcelain`;
  const status = execSync(statusCommand, { encoding: 'utf8' }).trim();

  if (status !== '') {
    console.log("Uncommitted changes found in the working directory. Committing or stashing changes...");
    // 提交或者暂存当前修改
    // execSync(`git add . && git commit -m "Committing current changes"`);
    // 或者使用 git stash
    execSync(`git stash`);
  }

  // 构建 git log 命令，获取相关的提交哈希
  const logCommand = `git log --author="${author}" --since="${since}" --until="${until}" --pretty=format:%H`;
  const commitHashes = execSync(logCommand, { encoding: 'utf8' }).trim().split('\n').filter(hash => hash !== '');

  if (commitHashes.length === 0) {
    console.log("No commits found for the specified author and date range.");
    process.exit(0);
  }

  // 创建一个临时分支
  const tempBranchName = `temp-branch-${Date.now()}`;
  execSync(`git checkout -b ${tempBranchName}`);

  try {
    // 应用每个提交到临时分支上
    commitHashes.forEach(hash => {
      try {
        // 每次 cherry-pick 前检查是否有未提交的修改
        const statusCheck = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
        if (statusCheck !== '') {
          console.log("Uncommitted changes found. Stashing changes before cherry-pick...");
          execSync(`git stash push -m "Stash before cherry-pick"`);
        }

        // 执行 cherry-pick 操作
        execSync(`git cherry-pick ${hash}`);
      } catch (error) {
        if (error.message.includes('The previous cherry-pick is now empty')) {
          console.log(`Skipping empty cherry-pick for commit ${hash}`);
          execSync('git cherry-pick --skip');
        } else if (error.message.includes('conflict')) {
          console.log(`Conflict encountered during cherry-pick of commit ${hash}. Aborting cherry-pick.`);
          execSync('git cherry-pick --abort');
          throw new Error(`Cherry-pick failed for commit ${hash}.`);
        } else {
          throw error;
        }
      }
    });

    // 获取所有文件的最终变动
    const diffCommand = `git diff HEAD^ HEAD`;
    const finalDiff = execSync(diffCommand, { encoding: 'utf8' });

    // 输出最终变动到文件
    const outputFile = `finalChanges_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    fs.writeFileSync(outputFile, finalDiff, 'utf8');
    console.log(`Final changes written to ${outputFile}`);
  } finally {
    // 切回主分支并删除临时分支
    execSync(`git checkout -`);
    execSync(`git branch -D ${tempBranchName}`);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
}
