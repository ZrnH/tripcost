# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start server**: `node server.js` (runs on port 3000)
- **Install dependencies**: `npm install`

## Architecture Overview

This is a simple Node.js/Express trip expense tracking application with MongoDB backend.

### Core Structure
- **server.js**: Single-file Express server containing all API endpoints and MongoDB connection logic
- **Database**: MongoDB with two collections:
  - `trips`: stores trip information with name field
  - `expenses`: stores expense records with trip, date, amount, category, and description fields

### API Endpoints
- `POST /trip`: Create new trip
- `GET /trips`: List all trips  
- `POST /expense`: Add expense to a trip
- `GET /expenses`: Get expenses for a trip (expects trip ID in request body)

### Database Connection
- MongoDB connection to `mongodb://localhost:27017` 
- Database name: `tripcost`
- Uses modern async/await patterns with MongoDB driver v6.10.0

### Dependencies
- Express 4.17.1 for web framework
- MongoDB 6.10.0 driver for database operations

## Notes
- No tests are currently configured
- Single monolithic server file architecture
- Modern async/await patterns implemented
- No authentication or validation implemented
- GitHub repository configured with HTTPS authentication

## Development Best Practices
- Always update claude.md file after big changes