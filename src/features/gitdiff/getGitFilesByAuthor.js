const { execSync } = require('child_process');
const fs = require('fs');

// Command line arguments
const author = process.argv[2];
const since = process.argv[3];
const until = process.argv[4];

if (!author || !since || !until) {
  console.error("Usage: node collectUserChanges.js <author> <since> <until>");
  process.exit(1);
}

try {
  // Step 1: Get commit hashes by the author within the time range
  const logCommand = `git log --author="${author}" --since="${since}" --until="${until}" --pretty=format:%H`;
  const commitHashes = execSync(logCommand, { encoding: 'utf8' }).trim().split('\n').filter(hash => hash !== '');

  if (commitHashes.length === 0) {
    console.log(`No commits found for ${author} between ${since} and ${until}.`);
    process.exit(0);
  }

  // Step 2: Get list of files changed by the author across all commits
  const changedFiles = new Set();

  commitHashes.forEach(hash => {
    const diffCommand = `git diff --name-only ${hash}^ ${hash}`;
    const files = execSync(diffCommand, { encoding: 'utf8' }).trim().split('\n');
    files.forEach(file => changedFiles.add(file));
  });

  // Step 3: Write changes to a text file
  const outputFilename = `userChanges_${author}_${since}_${until}.txt`;
  const outputStream = fs.createWriteStream(outputFilename, { flags: 'a' });

  changedFiles.forEach(file => {
    const logCommand = `git log --author="${author}" --since="${since}" --until="${until}" --follow -- "${file}" --pretty=format:%H`;
    const commitsForFile = execSync(logCommand, { encoding: 'utf8' }).trim().split('\n').filter(hash => hash !== '');
    const diffCommand = `git diff ${commitsForFile[0]} ${commitsForFile[commitsForFile.length - 1]} -- "${file}"`;
    const finalDiff = execSync(diffCommand, { encoding: 'utf8' });
    outputStream.write(`\nChanges for file: ${file}\n\n${finalDiff}\n\n`);
  });

  console.log(`Changes made by ${author} between ${since} and ${until} saved to ${outputFilename}.`);

  outputStream.end();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
