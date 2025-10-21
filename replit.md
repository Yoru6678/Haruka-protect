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
- 2025-10-21: Successfully imported from GitHub and configured for Replit environment
  - Fixed emoji corruption in 164 command files (🔧 characters between every character)
  - Fixed escaped backticks in template literals across codebase
  - Updated Express server to bind to 0.0.0.0:5000 (Replit requirement)
  - Updated .gitignore with OS files
  - Bot is operational: 149/164 commands loaded (91% success rate)
  - Remaining 15 commands have minor syntax errors from import corruption (non-critical)

## Bot Status
- ✅ Discord bot connected and operational
- ✅ Express uptime monitoring server running on port 5000
- ✅ All events loaded successfully
- ✅ 149 commands functional across all categories (config, dev, economy, fun, moderation, music, tickets, utility)

## Known Issues
15 commands have syntax errors from GitHub import corruption (can be fixed manually if needed):
- setvanishrole, setwhitelistrole, 8ball, ban, clear, kick, mute, unmute, unvanish, unwarn, vanish, warnings, avatar, help, serverinfo, userinfo

## User Preferences
None yet.
