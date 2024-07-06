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