# CollaBoard8

Whiteboard application with commenting and collaboration.

# Running the app

    docker-compose up --build

Then go to http://localhost:3000/.

# Architecture crash course for my peeps:

## React router

In `./client/src/index.js`, you can add a new Route and put your Route code into `./client/src/routes`. The "/" route essentially acts as a navbar right now and renders components right under it. Click the `Whiteboard` link to check it out (http://localhost:3000/whiteboard). You can find more info about `react-router-dom` [here](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md).

## Backend

- The api is served at http://localhost:4200/. We could introduce nginx later??
- Put all your route stuff in `api/routes` and declare them in `app.js`.
- To interact with the db, use `req.db`. Example can be found in the route testAPI/ping. Essentially, I made the db into middleware, so every query to the backend gets access to the db lol.

# References used

- [Create a React FrontEnd, a Node/Express BackEnd and connect them together](https://medium.com/@jrshenrique/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c)
- [react-router-dom tutorial](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)
