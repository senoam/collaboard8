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

Put your sql dumps in `db/` to prepopulate tables. You can look at `whiteboard.sql` for reference. (I'm not really sure if we would need to put them all in the same file because some db attributes are dependent on others, but we'll see later on.).

You can check `client\src\routes\Whiteboard.js` for how to call the db and use the values.

# References used

- [Create a React FrontEnd, a Node/Express BackEnd and connect them together](https://medium.com/@jrshenrique/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c)
- [react-router-dom tutorial](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)
