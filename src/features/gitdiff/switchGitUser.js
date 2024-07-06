// node ./src/features/gitdiff/switchGitUser.js --user local
const { execSync } = require('child_process');
const argv = require('yargs')
  .usage('Usage: node switchGitUser.js --user <userKey>')
  .demandOption(['user'])
  .choices('user', ['local', 'user1', 'user2'])
  .argv;

const users = {
  local: {
    name: 'd_c',
    email: 'adam.dc2022@outlook.com'
  },
  user1: {
    name: "User One",
    email: "userone@example.com"
  },
  user2: {
    name: "User Two",
    email: "usertwo@example.com"
  }
};

const userKey = argv.user;

if (!users[userKey]) {
  console.error("Invalid user key. Use one of: local, user1, user2");
  process.exit(1);
}

const user = users[userKey];

function switchGitUser(user) {
  try {
    // 切换 Git 用户信息
    execSync(`git config user.name "${user.name}"`);
    execSync(`git config user.email "${user.email}"`);
    console.log(`Switched to ${user.name} (${user.email})`);
  } catch (error) {
    console.error(`Failed to switch user: ${error.message}`);
    process.exit(1);
  }
}

// 调用切换 Git 用户信息函数
switchGitUser(user);
