# 📧 Imap Mail Checker

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](package.json)

> A powerful tool for checking email account credentials in bulk against IMAP servers

## ✨ Features

- 🌐 Connect to custom IMAP servers
- 🔌 Configure custom port settings
- 📊 Bulk credential checking
- 📝 Automatic saving of valid credentials
- 🚀 Fast and efficient processing

## 📋 Description

Mail Checker is a lightweight utility built with TypeScript that allows you to validate email credentials against any IMAP server. Perfect for system administrators who need to verify large lists of credentials quickly and effectively.

## 🛠️ Installation

```bash
# Navigate to the project directory
cd mail-checker

# Install dependencies
bun install
```

## 🚀 Usage

```bash
bun src/main.ts <imap-server> <port> <credentials-file>
```

### Example:

```bash
bun src/main.ts imap.gmail.com 993 credentials.txt
```

### Credentials File Format:

Your credentials file should contain one email:password pair per line:

```
user1@example.com:password123
user2@example.com:anotherpassword
```

## 📄 Output

Valid credentials are saved to `checked.txt` in the format:

```
user@example.com:password 
```

## 🔒 Security Note

This tool is designed for legitimate system administration purposes. Always ensure you have proper authorization before checking credentials against any mail server.