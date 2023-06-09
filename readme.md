# Restaurant Management Application

This is a restaurant management application that allows users to perform CRUD (Create, Read, Update, Delete) operations on restaurant details. Users can view a list of restaurants, create new restaurants, view detailed information about a selected restaurant, update restaurant information, and delete restaurants. The application is built using Express.js as the backend framework, MongoDB as the database, and React for the frontend.

## Features

1. **Restaurant Listing**: The application displays a list of restaurants with their names and basic details such as cuisine type and location.

2. **Restaurant Creation**: Users can add new restaurants by providing details such as name, cuisine type, location, and an image of the restaurant.

3. **Restaurant Details**: The application shows detailed information about a selected restaurant, including its name, cuisine type, location, and the uploaded image.

4. **Restaurant Update**: Users have the option to edit the details of a restaurant, including its name, cuisine type, location, and the uploaded image.

5. **Restaurant Deletion**: Users can delete a restaurant from the system.

## Requirements

To set up and run the application, you will need the following:

- Node.js installed on your machine.
- Express.js as the backend framework.
- MongoDB as the database.
- React for the frontend.
- Image storage on the file system.


## Installation and Setup

### Server

1. Clone the repository from GitHub: [repository-url]

2. Change to the backend directory:

   ```bash
   cd server
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the MongoDB connection:
   - Create a `.env` file in the `backend` directory.
   - Add the following line to the `.env` file:
     ```
     MONGO_DB_URI=your-mongodb-uri
     ```
     Replace `your-mongodb-uri` with the connection string for your MongoDB database.

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The server will start running on `http://localhost:4000`.

### Client

1. Change to the client directory:

   ```bash
   cd client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend server will start running on `http://localhost:5173`, and the application will be accessible in your web browser.

## Additional Dependencies

There are no additional dependencies required for this project beyond what is mentioned in the requirements section.

## Adding Additional Features or Improvements

- I added more restaurant features than initially specified
- I added user authentication to enable only our platform users to add restaurants

## Conclusion

Thank you for considering this project for the Sprint Uganda take-home challenge. If you have any questions or need need more information, please don't hesitate to reach out. Good luck with the screening, and I hope you find me the right candidate for the software development role.

[Omoding Daniel]: https://github.com/Darlio88
