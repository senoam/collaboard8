# CollaBoard8

Whiteboard application with commenting and collaboration.

# Running the app

    docker-compose up --build

Then go to http://localhost:3000/.

# Architecture crash course for my peeps:

## React router

In `./client/src/index.js`, you can add a new Route and add the implementation in `./client/src/routes`. You can find more info about `react-router-dom` [here](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md).

## Backend

- The api is served at http://localhost:4200/. (We could introduce nginx later??)
- Put all your route stuff in `api/routes` and declare them in `app.js`.
- To interact with the db, use `req.db`. Example can be found in the route testAPI/ping. Essentially, the db became a part of the Express middleware, so every query to the backend will grab access to the db before getting passed to your route logic.

## Database

Quick tutorial on how to add tables:

1. Put your sql dumps in `db/tables/` to prepopulate tables. You can look at `whiteboard.sql` for reference.
2. In `db/ordering.sh`, add your database name to the bash array `tables_ordered`. This will guarantee the order of when tables get created. Each element in `tables_ordered` is a `.sql` file in the `db` directory. Please order the table dependencies accordingly OR ELSE SANDY'S DOCKER-COMPOSE BUILD WILL BREAK!

You can check `client/src/routes/wb/Whiteboard.js` for how to call the db and use the values.

## Sockets

The socket server is served at http://localhost:4000/. Details of the server-side implementation are located in `api/app.js`.
Currently the socket client-side code is handled by the `WhiteboardCanvas.js` component and broadcasts stroke image data to render for other users in the same room.

Rooms are currently handled explicitly through text input on the home page. To test the whiteboard collaboration, open two tabs of the app and input the same room name for both instances. Strokes drawn in one whiteboard canvas will show up on the secondary page.

# References used

- [Create a React FrontEnd, a Node/Express BackEnd and connect them together](https://medium.com/@jrshenrique/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c)
- [react-router-dom tutorial](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)
