const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const io = require('socket.io')(server)
var port = 8080
const mongoose = require('mongoose')
// db connection
mongoose.connect('mongodb://localhost/chat',{useNewUrlParser: true,useUnifiedTopology: true},()=>{
	console.log('db connected')
})
// model
var messageSchema = new mongoose.Schema({
	user : String,
	data : String,
},{timestamps:true})
var Messages = new mongoose.model('Messages',messageSchema)

app.use(express.static('public'))

// socket message
io.on('connection',(socket)=>{
	// console.log(socket.id)
	socket.on('message',(data)=>{
		// console.log(data)
		Messages.create(data,()=>{
			// console.log('data stored')
			Messages.find().sort({createdAt:-1}).limit(10).exec((err,data)=>{
				if (err) throw err
				io.emit('chat',data)
			})
		})
	})
})

server.listen(port,()=>{
		console.log(`Server started at port ${port}`)	
	})
