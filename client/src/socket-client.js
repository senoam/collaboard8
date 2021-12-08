//Starter code for front end of socket.io rooms
import { io } from 'socket.io-client'

//Get the socket
const socket = io{'http://localhost:4200'}

socket.on('connection', () => {
    displayMessage(`Connected on id: ${socket.id}`)
})

socket.emit('joinServer', username)

socket.emit('joinRoom', whiteboard_id, callback)
