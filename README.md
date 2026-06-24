# CarPark!

# Step 0

Install a node version, LTS should be good
[https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)

# Starting

First, node modules needs to be installed, for this run **npm i** in the root folder

To run the backend and frontend together you need to type **npm start** in the root folder

The backend is a [json-server](https://github.com/typicode/json-server) instance. All data lives in **backend/db.jsonc** and images in **backend/images/**.

# start project 

One time command to install dependencies

    npm install

To start the project, run command in the root folder

    npm start


# Frontend

Frontend url is http://localhost:3000

# Backend

Backend base URL http://localhost:3001

## Endpoints

### /api/cars

 - **GET**
 Gets a list of cars
 - **POST**
 Adds a car
 - **PATCH**
 Updates a car, param cars/:vin
 - **PUT**
 Edit a car, param cars/:vin
 - **DELETE**
 Delete a car, param cars/:vin

Each car is identified by its **vin**. Changes are persisted to **backend/db.jsonc**.

### /api/images
Images can be accessed via this endpoint 
for example `http://localhost:3000/api/images/dacia-spring.png`

Upload images via this endpoint 
for example `http://localhost:3000/api/images`

### /api/basket
Basket functionality

### /api/favorites
Favorites functionality

# WORKSHOP

## Recommendations
1. Use at least one checkbox.
2. Use Accordion / dropdown for filters.
3. Use Typescript.
4. Use Flex / Grid for layout.


# TODOs
Continue the CarPark application. 
Please be creative and develop a unique layout.

1. Make the app more presentable, add css styles or add a theme

2. Add filtering and pagination from API

3. Add filter functionality for the list of cars. Examples: construction year, price etc. (Only frontend)

4. Extend the search bar to search cars by manufacturer / model / etc. (Only frontend)

5. Add the possibility of sorting / ordering / pagination of the list of cars.

6. Implement add to basket functionality and create a basket page that must contain the list of vehicles with details and images and the totals.

7. Define the navigation menu for the application.

8. Use the API for the filter / search functionality (followup from 2 & 3)

9. Define a global theme for the application. (different color schemes, dark mode, etc)

10. Save the basket items and the list of orders to local storage. 

11. Use the API endpoint for filtering, search and sorting.  

12. Use the API for the basket functionality (add, remove, etc.)

13. Use the API for the favorites functionality (add, remove, etc.)

14. Implement quick view with more details for cars (modal / dialog). (Move car information from row to modal).

15. Create an admin page to manage cars

16. Integrate the image upload functionality in the process of saving a new car.

17. Add banners, promotions in the application.

18. Use a library of UI components.

ashdiuhsdiuf