const express = require('express')
const app = express();

app.use(express.json())

const { router, server } = require('./routes/routes.js')
app.use("/server", router)


//tcp on 3000
app.get('/', (req, res) => { //test server is running
    return res.json({ result: 'ok' })
})


app.listen(3000, () => {
    console.log('server running...')
})



//UDP on 3001

const udp = require('dgram')
const udpServer = udp.createSocket('udp4')
const udpPort = 3001

//listen for udp messages
udpServer.on('listening', () => {
    const address = udpServer.address()
    server.udpServer = udpServer
    console.log('Listining to ', 'Address: ', "127.0.0.1", 'Port: ', address.port)
    
})

//when you accept a message update the server object and the relevant game
udpServer.on('message', (message, info ) => {
    try {
        //get data about the user
        console.log(JSON.stringify(info))
        const address = info.address
        const port = info.port
        //parse the json
        const json = JSON.parse(message)
        console.log('message accepted on the server - address ', address, ' port ', port , 'message \n' , json)
        //console.log("json ", json)
        //update relevant game and more
        server.receiveDataOfGameUDP(json, address, port)
        //server.sendMessageUDP("Server got your UDP message ", port, address)
    } catch (error) {
        //console.log("type , " , typeof message)
        //console.log("message , ", JSON.stringify(message))
        console.log("Accepted a UDP message - " + message + " - but there was an error - ", error.message)
    }

})



udpServer.bind(udpPort)

