const { execSync } = require('child_process');

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

// 获取命令行参数
const userKey = process.argv[2];

if (!userKey || !users[userKey]) {
  console.error("Usage: node switchGitUser.js {user1|user2}");
  process.exit(1);
}

const user = users[userKey];

try {
  // 切换 Git 用户信息
  execSync(`git config user.name "${user.name}"`);
  execSync(`git config user.email "${user.email}"`);
  console.log(`Switched to ${user.name} (${user.email})`);
} catch (error) {
  console.error(`Failed to switch user: ${error.message}`);
}
