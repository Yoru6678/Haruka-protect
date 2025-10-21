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
  - **ALL SYNTAX ERRORS FIXED**: Corrected Unicode character issues (apostrophes and backticks) in 16 command files
  - Bot is now 100% operational: All 164 commands loaded successfully
  - **NEW PROFESSIONAL HELP SYSTEM**: Created modern help system with interactive buttons and category navigation

## Bot Status
- ✅ Discord bot connected and operational
- ✅ Express uptime monitoring server running on port 5000
- ✅ All events loaded successfully
- ✅ **164/164 commands loaded** (not all implemented yet)
- ✅ No syntax errors - 100% command load success rate
- ✅ Modern help system with button navigation

## Help System Features
- Interactive button-based navigation
- 8 categories organized with colors and emojis
- Only shows implemented/functional commands
- Per-command detailed help
- Professional design matching big Discord bots
- 5-minute timeout with proper cleanup

## Fixed Commands (2025-10-21)
Successfully corrected syntax errors in:
- **Config**: getvanishconfig, setvanishrole, setwhitelistrole
- **Moderation**: ban, clear, kick, mute, unmute, unvanish, unwarn, vanish, warn, warnings
- **Fun**: 8ball
- **Utility**: avatar, help (completely redesigned)

## Commands in Development
Many commands show "en développement" message - this is intentional. These commands are loaded but not yet fully implemented:
- Music commands (autoplay, play, queue, etc.)
- Some moderation commands (automod, antiraid, etc.)
- Some fun commands (gif, meme, games, etc.)
- Some utility commands (weather, translate, etc.)

## User Preferences
None yet.
