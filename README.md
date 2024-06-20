# Webflow Custom Code Walkthrough

## Project Description

This project is a companion to Webflow's [custom-code guide example site](https://webflow.com/made-in-webflow/website/webflow-developers---script-ex-097863). It provides a detailed walkthrough for registering custom JavaScript to a Webflow site and applying it to a specific page.

With this app, you can register and apply custom scripts contributed by the Webflow Developer community, including scripts from [Memberstack](https://www.memberstack.com/) and [Riveflow](https://riveflow.webflow.io/). Once applied and the site is published, you will see the enhanced functionality provided by the custom JavaScript on your page.

## Technologies Used

- Node.js
- Express
- Webflow JavaScript SDK
- React
- Vite
- Ngrok

## Project Structure

The project consists of two main components: the backend and the frontend. The backend functions as the server, providing API endpoints to interact with the Webflow API, manage authorization and token storage, and handle custom code operations. The frontend is a React application that guides users through the steps of registering and applying custom code to a page.

```
custom-code-examples/
├── backend/
│   ├── auth/
│   ├── controllers/
│   ├── public/
│   ├── routes/
│   └── utils/
└── frontend/
    ├── components/
    └── utils/
```

### Backend

The backend serves as the server with API endpoints that connect to the Webflow API. It handles authorization, token storage, and custom code management functionalities.

- **Auth**: Manages the logic for obtaining and storing Webflow authorization tokens, facilitating secure communication with the Webflow API.
- **Routes**: Defines the API endpoints that provide access to various Webflow API functionalities and custom code management features.
- **Controllers**: Implements the core logic for handling requests made to the API endpoints, including custom code management for Webflow sites and pages using the Webflow JavaScript SDK.

### Frontend

The frontend is a React application that outlines the steps needed to register and apply custom code to a page.

- **Components**: Contains reusable React components used across the application, ensuring modularity and maintainability.
- **Utils**: Includes utility functions and modules for axios configurations and theming, providing a consistent and streamlined development experience.

## Setup Instructions

### Prerequisites

1. Ensure you have a Webflow Data Client App in your Webflow Workspace, or a [Site Token](https://university.webflow.com/lesson/intro-to-webflow-apis?topics=cms-dynamic-content#how-to-create-an-API-token) for a specific site. [Read our guide for more information on creating a Data Client App.](https://developers.webflow.com/data/docs/register-an-app)
2. Create an Ngrok account and obtain your [Ngrok authentication token](https://dashboard.ngrok.com/tunnels/authtokens).

### Setup Guide

1. **Clone the Example Webflow Project**: Clone the [example Webflow site](https://webflow.com/made-in-webflow/website/webflow-developers---script-ex-097863) where scripts will be applied

2. **Clone the Project Repository**:

   ```sh
   git clone https://github.com/Webflow-Examples/custom-code-examples/tree/main
   cd custom-code-examples
   ```

3. **Configure Environment Variables**: Fill out the `.env` file with the necessary environment variables.

   ```env
   WEBFLOW_CLIENT_ID=YOUR_CLIENT_ID
   WEBFLOW_CLIENT_SECRET=YOUR_CLIENT_SECRET
   NGROK_AUTH_TOKEN=YOUR_NGROK_AUTH_TOKEN
   PORT=YOUR_PORT
   ```

4. **Install Dependencies and Start the Server**:

   ```sh
   npm install
   npm install-project // This will install the dependencies in the subdirectories
   npm run dev
   ```

5. **Update App's Redirect URI**: Once the server is running, copy the Redirect URI provided. Navigate to your Webflow Workspace dashboard, go to "Apps & Integrations," and update the Redirect URI in your App settings. Save the changes.

## Usage Guide

1. **Authorize Your App:** Navigate to `http://localhost:8080` and authorize your app to access your Development Workspace. The app will store your token in a `.db` file and redirect you to the frontend.
2. **Select a Webflow Site:** Choose your cloned example site from the list of authorized sites.
3. **Select an Example Script:** Pick a script from the list of examples. The app will register the appropriate scripts for that example to your Webflow site.
4. **Choose a Page to Apply the Script:** Select the appropriate page from your site where the script will be applied. The page title should match the script example.
5. **Apply Scripts:** Decide whether to apply the script in the `<head>` tag or in the footer right above the closing `</body>` tag. Apply all necessary scripts and click "Next."
6. **Publish Site:** Publish the site to see the functionality of your applied scripts. Click the "Visit Page" button to view the example page on your Webflow site with the custom functionality.

## Troubleshooting

- Ensure the correct Ngrok URL is set in the Webflow dashboard after restarting the local dev server.
- Verify that the `.env` file contains the correct values for all required environment variables.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push the branch to your forked repository.
5. Create a pull request with a description of your changes.
