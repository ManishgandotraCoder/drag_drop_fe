# Tasks and updates :

## Part 1: Front End

1. Load in the frontend a static JSON file containing the following:
   [
   { "type": "bankdraft", "title": "Bank Draft", "position": 0},
   { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1 },
   {"type": "invoice", "title": "Invoice", "position": 2},
   {"type": "bank-draft-2", "title": "Bank Draft 2", "position": 3},
   {"type": "bill-of-lading-2", "title":"Bill of Lading 2", "position": 4}
   ]

2. Display the content as 5 cards, 3 in the first row and 2 in the second row. Assign a different thumbnail of your choice to each document type.
3. Display a placeholder spinner for each image that is loading.
4. Make the application so the cards can be reordered via drag and drop.
5. Make so clicking on a card displays the image as an overlay in the middle of the webpage. Make so pressing ESC closes the image. Add a README file to explain how to run it.
   --- Completed

## Part 2: Making the call (If you are more Front-end focused, you can skip the backend part and mention the same in your readme file, so our reviewers will only review the Front-end code)

1. Create a PostgreSQL / SQLite table that can hold the data that was in the static json file from part 1 in a sensible way.
   - Used SQLite
   - Created table `records` for handling CRUD operations
2. Build a REST API that can fetch the data from this table and add data to this table. Preferably, use Python >= 3.6 along with starlette. You may find this helpful.
   --- Created APIs

3. http://localhost:8000/record
   method : GET

4. http://localhost:8000/record
   method : POST
   body : {
   "title": "Item-update-4",
   "image": "four.png",
   "position": 3
   }

## Part 3: Tying it up!

1. Call the API from your front end application to display the same grid.
   ----- Implemented API Call on Front end using Axios
   ----- Used redux for State management
   ----- Redux saga as a middleware
2. Also feel free to allow any domains and ports for CORS. (Do not waste your time on this)
   ----- Implemented CORs Middlewhere to allow access to multiple domains.
3. Have the frontend call the REST API for saving every five seconds (not every action).
   ??????????
4. Display a loading spinner whenever it is saving, and how long has passed since the last save. Avoid saving if no changes have been made.
   -Implemented

## Part 4: Deployment

1. Create a docker-compose file to start all the components as micro-services
2. Write some simple documentation that makes it easy for us to understand and use it. Also write a little about how you approached the architectural / API design for the problem.

## Part 5: General questions

1. Design the hypothetical API for this project if you had to allow for adding, removing and updating the elements. Consider long-term maintenance as well.

--- Created APIs

1. http://localhost:8000/record
   method : GET

2. http://localhost:8000/record
   method : POST
   body : {
   "title": "Item-update-4",
   "image": "four.png",
   "position": 3
   }

3. http://localhost:8000/record/{id}
   method : PUT
   body : {
   "title": "Item-update-4",
   "image": "four.png",
   "position": 3
   }

4. http://localhost:8000/record/{id}
   method : DELETE

## Set up

### For front end

1. cd front-end
2. npm install
3. npm start

### For back end

1. cd back-end
2. python3 -m venv venv
3. source venv/bin/activate
4. python3 install uvicorn fastapi
5. python main.py
