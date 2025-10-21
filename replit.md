# Haruka Protect ⚡ - Discord Bot

## Overview
Haruka Protect is a multifunctional Discord bot with moderation, economy, tickets, music, and fun features. The bot includes an Express web server for uptime monitoring (UptimeRobot compatibility).

## Project Structure
- **Discord Bot**: Main application (discord.js v14)
- **Express Server**: HTTP endpoint for monitoring (port 5000)
- **Database**: JSON-based file storage in `/database/`
- **Commands**: Organized by category in `/commands/`
- **Events**: Discord event handlers in `/events/`

## Technology Stack
- Node.js 18+
- discord.js v14.15.3
- Express v4.19.2
- dotenv for environment variables
- File-based JSON database

## Environment Variables
Required secrets:
- `TOKEN`: Discord bot token (required)
- `DEVELOPER_IDS`: Comma-separated list of developer Discord IDs (optional, defaults to 784847248433479710)
- `PORT`: Express server port (defaults to 5000)

## Setup Instructions
1. Add Discord bot token to secrets
2. Run `npm install` (already done)
3. Run `npm start` to start the bot

## Recent Changes
- 2025-10-21: Imported from GitHub and configured for Replit environment
  - Updated Express server to bind to 0.0.0.0:5000 (Replit requirement)
  - Updated .gitignore with OS files

## User Preferences
None yet.
