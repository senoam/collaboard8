# How to run

docker-compose build && docker-compose up

URL: [http://localhost](http://localhost):8080

# Default Accounts

John: [johndoe@example.com](mailto:johndoe@example.com) - Password: admin1234 - whiteboard owner

Frank: [frankmap@example.com](mailto:frankmap@example.com) - Password: haha1234 - whiteboard editor

# Easily-missed Features

-   History: we save session history when any user leaves the whiteboard, so users coming back in the future can see what they missed over time. You can view this history by clicking on the click icon beside the whiteboard name on the whiteboard drawing page.
-   Collaboration: drawings are connected to SocketIO allowing for real-time collaboration between users (we recommend logging into both John and Frank’s accounts, but log into one from an incognito tab as logging out from a duplicated window will log out of all sessions)
-   Boards Sharing: you can add users as editor collaborators with the bottom left collaborator button in a whiteboard. Editor users will see the whiteboard appear as a tile in their Shared with Me section on the homepage.
-   Undo/Redo: your undo/redo history is saved in a database so even if you come back to the whiteboard days later, you can undo your last drawings, or redo anything if you left the board after undoing some content.
-   Comments: clicking on the bottom right toggle will open comment view, on which you can click any part of the screen to add a new comment, or click an existing comment marker to view their comment and add your replies.

# All Features

## Databases

-   There are a total of 8 tables in this project.
-   comments: stores comment information including the ID of the parent comment, if that comment is a reply.
-   snapshots: images of the whiteboard session history, stored as a binary.
-   session_history: holds the relationship between whiteboards and their snapshots.
-   strokes: holds information about drawings including the whiteboard it belongs to and details such as it’s position, shape, size, and user who drew it.
-   undo_redo: holds information about undo history in the case that a user wants to redo their previous stroke. This database is cleared upon the addition of a new stroke as it is no longer possible to redo from there.
-   users: contains user information including encrypted passwords.
-   whiteboard: contains the uuid of each whiteboard and the user-given title for it.
-   whiteboard_collaborator: holds the relationship between users and whiteboards such as if they are an owner (they created this board) or editor (someone shared this board with them).

## Authentication and Security

-   The application protects the board page from being accessed by unauthorized users. Users who do not have role owner/editor in a whiteboard will not be able to access the page.
-   React handles XSS attack by escaping text.
-   The web app is not vulnerable to any CSRF attack since the app does not use cookies to store the token.
-   Since the postgres functions that we are using build the queries safely, SQL injection is not possible.
-   User can make changes through the api endpoints (e.g. using postman or curl) only if they have access to the whiteboard page that they want to make changes in.

## Login/Logout

-   If you are not logged in into the website, entering any website url (e.g. /home) will redirect you to the login page.
-   The sign in token expires 2 weeks after the sign in time.
-   All the api’s endpoints require the user to be logged in.

## Boards page

-   When you first log in/sign up, you are on the Boards page where you can create new boards and see the boards that are shared with your account.
-   We’ve preloaded a board called **Memes 101 - The Origins**.
-   Board Tiles feature the latest snapshot with its last edited time.
-   The Boards page uses responsive design and adjusts to all screen sizes.
-   The top bar of the Boards page has a search bar that would hide your boards to show the search results based on the Whiteboard title.
-   Hovering over the Board Tile would show the delete button. Clicking on it would show a prompt with a button. Any other collaborator will see that the board got deleted by refreshing their page.
-   If the user has no Shared Boards, a little ghost would appear saying “You have no boards shared with you.”

## Whiteboard

-   Clicking on a Board Tile would send you to a URL of similar format: localhost:8080/whiteboard/4db898e8-556c-11ec-beb4-0242ac130002
    -   The slug is the whiteboard’s id, a UUID v1. This adds another layer of security through abstraction.
-   You can go back to the Boards page by clicking on the CollaBoard8 logo

### Title

-   The Whiteboard title can be edited for all collaborators.
-   Hovering over the Whiteboard title would show the borders of the input box.
-   When clicking on the title, the user will be sent to “edit mode” and can make any changes, given that their title is 100 or less characters long.
    -   Press the Enter key or unfocus the input box to save the whiteboard title.

### Collaboration

-   On a whiteboard page, you can edit the whiteboard in real-time with other users
-   Clicking on the Collaborators icon in the bottom-left of the screen would open the panel of collaborators on the whiteboard
    -   The owner is the creator of the whiteboard and everyone else is an editor
    -   You can add users as a collaborator to the whiteboard by entering the email they are registered with
    -   You can delete collaborators using the corresponding button on the table row
-   Owners will have their whiteboards show up under My Boards on their homepage
-   Any users add as an editor will have the whiteboard added to their Shared with Me section (this also prevents the render of “Nothing to see here” element)
-   To test the collaborative functionality open localhost:8080 on one browser logged in as John and open another logged in as Frank in incognito
-   You can also choose to sign up your own user and try adding them as a collaborator!
-   Comments are not yet connected to sockets, refreshing the comment by reclicking the marker will pull up new comments added to the database.

### Tools

-   you can switch between multiple shapes and colours for the whiteboard pen, including an eraser (we are aware of a bug that sometimes shows one shape on top of the other despite the order they are drawn in)

## Comments

-   Click the toggle on the bottom right of the screen to turn on comment view.
-   Each comment is attached to a location on the whiteboard, click on any part of the board to add a comment there.
-   Green comment markers indicate existing comments, you can click on those to view the comment in the offcanvas as well as add your reply.

## History

-   A history of whiteboard snapshots are saved in the databases declared in history.sql
-   The whiteboard page automatically saves a history snapshot with a timestamp whenever the user moves their mouse cursor out of the top of the window (ie. to close the tab)
-   There is also a history save request made when the user navigates out of the whiteboard to home by clicking on the CollaBoard8 icon
-   The most recent snapshot of a whiteboard is used as the thumbnail for whiteboard tiles on the boards page
-   Users can also access a carousel of all previous history snapshots and timestamps by clicking on the history icon beside the whiteboard title
    -   A modal will pop up containing the carousel and labeled in order by timestamp

## Error handling

-   All undefined URLs (ex. Localhost:8080/djfklajldfj), and localhost:8080/whiteboard/ URLs referring to non-existent whiteboards would render an error page with a ghost saying “Nothing to see here!”
