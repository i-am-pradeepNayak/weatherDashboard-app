# Weather Dashboard Application

## Overview

The Weather Dashboard Application is a React-based web application that allows users to:

- Log in to the application.
- Search for weather information of a particular city.
- Add cities to their favorite list.
- Remove cities from their favorite list.
- Log out of the application.


## Installation

To run the Weather Dashboard Application locally, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/i-am-pradeepNayak/weatherDashboard-app
    cd weatherDashboard-app
    ```

2. Install dependencies:

    ```sh
    npm install
    npm i json-server
    ```

3. Start the JSON Server:

    ```sh
    npm run server
    ```

4. Start the Vite development server:

    ```sh
    npm run dev
    ```

5. Open your browser and navigate to:

    ```sh
    http://localhost:5173/
    ```

## Usage

1. **Login**
   - Open the application in your browser.
   - Enter your username and password to log in.
   - You can find the login credentials in the `db.json` file.

2. **Search for a City**
   - Use the search bar to enter the name of the city you want to check the weather for.
   - The current weather information for the city will be displayed.

3. **Add to Favorites**
   - Click on the "Add to Favorites" button to add the city to your favorite list.

4. **View Detailed Information**
   - Click on a city in your favorite list to see weather information for that city.

5. **Remove from Favorites**
   - In your favorite list, click on the "Remove from wishlist" button next to the city you want to remove.

6. **Logout**
   - Click on the "Logout" button to log out of the application.

## Running Tests

To run the test cases, use the following command:

```sh
npm run test
