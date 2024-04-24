# Actit

Actit is a comprehensive task management application that allows you to manage your tasks efficiently. It provides both a command-line interface (CLI) and a web interface for managing tasks.

## Features

- Task Management: Add, list, complete, and delete tasks.
- Synchronization: Sync your tasks between the CLI and web app.
- User Authentication: Secure login functionality.
- Interactive Prompts: User-friendly interactive prompts in the CLI.
- Modern Web Interface: A clean and modern web interface for managing tasks.

> Fun Feature: You can get a random motivational quote every time you complete a task in the CLI!

## Tech Stack
- **CLI**: The CLI is built with Node.js and uses libraries such as axios, picocolors, and @clack/prompts.
- **Web App**: The web app is built with Next.js and uses Tailwind CSS for styling. It also uses TypeScript for static type checking.
- **Database / Authentication**: supabase

## Getting Started

To get started with Actit, follow these steps:

1. Visit the website at [actit.vercel.app](https://actit.vercel.app) and sign up using your GitHub account.

2. Generate your API key from the dashboard.

3. Install the Actit CLI globally using npm:
```bash
npm install -g actit-cli
```
4. Login to the CLI using the command `actit login`. You will be prompted to enter your API key. Paste your API key and press enter.

Now, you're all set to start using Actit!


## CLI commands
The CLI provides several commands for managing tasks:

- `actit add`: Add a new task.
- `actit list`: List all tasks.
- `actit done`: Mark a task as completed.
- `actit delete`: Delete a task.
- `actit login`: Login to your account.
- `actit sync`: Sync tasks with the server.


## License

This project is licensed under the MIT License