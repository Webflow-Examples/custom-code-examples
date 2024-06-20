# Webflow Custom Code Walkthrough

## Project Description

This project serves as a companion to Webflow's custom-code guide example site, providing a detailed walkthrough for registering custom javascript to a Webflow site and applying it to a specific page.

In this walkthrough, you'll choose from a set of code examples that will require you to upload custom scripts to a Example Site. This site is configured to . Once you've uploaded and applied those

## Technologies Used

- Node.js
- Express
- Webflow JavaScript SDK
- React
- Vite
- Ngrok

## Project Structure

The project consists of two main components: the backend and the frontend. The backend functions as the server, offering API endpoints for interacting with the Webflow API, managing authorization and token storage, and handling custom code operations. The frontend is a React application that guides users through the steps of registering and applying custom code to a page.

```
backend/
├── auth/
├── controllers/
├── public/
├── routes/
├── utils/
frontend/
├── public/
└── src/
    └── components/
        └── Examples/
```

### Backend

The backend serves as the server with API endpoints that connect to the Webflow API. It handles authorization, token storage, and custom code management functionalities.

- **Auth**: Manages the logic for obtaining and storing Webflow authorization tokens, facilitating secure communication with the Webflow API.
- **Routes**: Defines the API endpoints that provide access to various Webflow API functionalities and custom code management features.
- **Controllers**: Implements the core logic for handling requests made to the API endpoints, including custom code management for Webflow sites and pages using the Webflow JavaScript SDK.

### Frontend

The frontend is a React application that outlines the steps needed to register and apply custom code to a page.

## Setup Instructions

### Prerequisites

1. Clone the project repository:

   ```sh
   git clone <repository_url>
   cd <repository_name>
   ```

2. Fill out the `.env` file with the necessary environment variables.
3. Create an Ngrok account and get your Ngrok authentication token.

### Setup Guide

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the local development server:

   ```sh
   npm run dev
   ```

## API Details

### Authentication

The authentication flow uses Webflow OAuth.

### Webflow APIs

We use the Webflow JavaScript SDK to call various Webflow Data v2 APIs:

- List Sites
- List Pages
- Get Page Content

## Usage Instructions

1. Register a Webflow Data Client app in your Webflow workspace.
2. Fill in your own details but use the Ngrok URL provided for the fields below:
   - **App homepage URL**: `https://xyz123-free.app`
   - **Redirect URI**: `https://xyz123-free.app/api/auth`
3. Set the following scopes:
   - CMS: Read and write
   - Pages: Read and write
   - Sites: Read and write
4. Set the Client ID and Secret ID in the `.env` file:
   - `WEBFLOW_CLIENT_ID`
   - `WEBFLOW_CLIENT_SECRET`
5. Click the "Install" button on your app in the Webflow Dashboard and install it on a test Webflow site.

## Troubleshooting

- Ensure you have the correct Ngrok URL set in the Webflow dashboard after restarting the local dev server.
- Verify that the `.env` file contains the correct values for all required environment variables.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push the branch to your forked repository.
5. Create a pull request with a description of your changes.
