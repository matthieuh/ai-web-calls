# AI Web Calls - iOS-style Contacts App

A modern contacts management application with Twilio voice calling integration.

## Features

- iOS-style UI with clean, responsive design
- Contact management (list, add, call)
- Form validation with Zod
- Twilio voice calling integration
- Persistent storage

## Setup

### Installation

```bash
yarn
```

### Environment Variables

Copy the `.env.example` file to `.env` and fill in your Twilio credentials:

```bash
cp .env.example .env
```

You'll need to add the following Twilio credentials to your `.env` file:

- `TWILIO_ACCOUNT_SID`: Your Twilio account SID
- `TWILIO_AUTH_TOKEN`: Your Twilio auth token
- `TWILIO_API_KEY`: Your Twilio API key
- `TWILIO_API_SECRET`: Your Twilio API secret
- `TWILIO_TWIML_APP_SID`: Your Twilio TwiML app SID
- `TWILIO_NUMBER`: Your Twilio phone number

## Run

```bash
yarn dev
```

## Twilio Setup

1. Create a [Twilio account](https://www.twilio.com/try-twilio)
2. Purchase a phone number from the Twilio console
3. Create a TwiML App in the Twilio console
4. Generate API keys and secrets from the Twilio console
5. Add all credentials to your `.env` file

## Project Structure

This project follows a feature-first architecture:

- `/src/features/contacts`: Contact management feature
- `/src/features/calls`: Twilio calling integration
- `/src/components`: Shared UI components
- `/src/utils`: Utility functions
