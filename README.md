# MOI Keystore Setup CLI 🔐

[![npm version](https://img.shields.io/badge/dynamic/json?color=success&label=version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fyourusername%2Fmoi-keystore-setup%2Fmain%2Fpackage.json)](https://www.npmjs.com/package/moi-keystore-setup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun Compatible](https://img.shields.io/badge/Bun-%F0%9F%8D%90-ff69b4)](https://bun.sh)

> The Ultimate Keystore Automator for MOI Developers  
> One command to setup your keystore and configs! ⚡️


## 🚀 Quick Start

### Installation
```bash
## Install globally using Bun
bun install -g moi-keystore-setup

# Or directly with npm
npm install -g moi-keystore-setup



### Basic Usage

Default setup (creates ~/.moi on Linux/Mac or C:\Users\You\.moi on Windows)
moi-keystore-setup init "your mnemonic phrase"

# Custom path example
moi-keystore-setup init "your mnemonic" --path ~/projects/my-moi-app

✨ Features
- 🔄 **Auto-Magic Setup** - Creates complete MOI security environment in one command
- 🖥️ **Cross-Platform Ready** - Works seamlessly on Windows, Linux, and macOS
- 🛡️ **Enterprise-Grade Security** - Uses Ethereum's official encryption standards
- ⚙️ **Smart Path Handling** - Defaults to system root or custom locations
- 📁 **Config File Generation** - Auto-creates:
  - `keystore.json`
  - `enckey.txt`
  - `guardians_accounts.json`
  - `accounts.json`

📂 File Structure Made Simple
Here's what gets created:

.moi/
├── 📄 keystore1.json       # Encrypted private key storage
├── 📄 enckey1.txt          # Password file (gateway to your keystore)
├── 📄 guardians_accounts.json  # Guardian accounts registry
└── 📄 accounts.json        # Faucet accounts configuration

🛠️ Advanced Usage
Custom Password Setup

moi-keystore-setup init "mnemonic" --password "My$tr0ngP@ss!"

Windows Path Example

moi-keystore-setup init "mnemonic" --path "C:\MOI\projects"


Verify Installation

moi-keystore-setup --version
# Output: 0.0.1


📜 License
MIT © [0xj4web]


Happy Coding! 🎉
If you find this useful, star ⭐️ the repo and share with other MOI developers!