# QRcierge

QRcierge is a system for automated processing of requests and feedback from hotel and apartment guests through QR code scanning.

## Features

### First Stage (Current)
- Web interface accessible via QR code
- Request form with preset options
- Server-side request processing
- Telegram notifications for owners
- Request logging in database
- API for retrieving request list

### Future Stages
- Multiple QR codes with dynamic location determination
- Airbnb calendar integration (iCal)
- Administrative interface for request management
- Analytics and reporting system

## Technical Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Database: MongoDB
- Telegram Bot API integration

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- Telegram Bot (for notifications)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/QRcierge.git
   cd QRcierge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy the example environment file
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file with your own settings:
     - Set `MONGODB_URI` to your MongoDB connection string
     - Set `TELEGRAM_BOT_TOKEN` to your Telegram bot token
     - Set `TELEGRAM_CHAT_ID` to your Telegram chat ID
     - Update `SERVER_URL` if deploying to a custom domain

4. **Generate QR code**
   ```bash
   node generate-qr.js
   ```
   This will create a QR code in the `public/qr` directory that points to your application.

5. **Start the server**
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open `http://localhost:3000` in your browser
   - Or scan the generated QR code

## Telegram Bot Setup

1. Create a new bot using [BotFather](https://t.me/botfather) on Telegram
2. Get your bot token and add it to the `.env` file
3. Create a group or channel where notifications should be sent
4. Add your bot to the group/channel
5. Get the chat ID and add it to the `.env` file

## MongoDB Setup

- For local development, install MongoDB and start the service
- For production, you can use MongoDB Atlas or any other MongoDB hosting service
- Update the `MONGODB_URI` in your `.env` file accordingly

## Deployment

The application can be deployed to any Node.js hosting platform:

- Heroku
- Vercel
- DigitalOcean
- AWS
- Any other Node.js hosting service

Make sure to set the environment variables in your hosting platform's dashboard or configuration.