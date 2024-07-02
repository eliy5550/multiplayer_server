
const express = require('express')
const router = express.Router()
const Server = require('../classes/Server')

const server = new Server();

//startNewGame
router.post("/new_game", (req, res) => {
    try {
        const game = server.addNewGame()
        return res.json(game)
    } catch (error) {
        return res.json({error : error.message})
    }
})

router.post("/broadcast", (req, res) => {
    try {
        server.sendDataOfAllGames()
        return res.json({'result' : "check clients"})
    } catch (error) {
        return res.json({error : error.message})
    }
})

//to send tcp to the server have a id object and a data object
//getTCPData
router.post("/tcp", (req, res) => {
    try {
        if(req.body.id === undefined || req.body.data === undefined){throw new Error('missing params')}
        server.receiveDataOfGame(req)
        return res.json({result : 'ok'})
    } catch (error) {
        return res.json({error : error.message})
    }
})

//getUDPData


//sendUDPData


//sendTCPData


//reset

//check game status
router.post("/status", (req, res) => {
    try {
        const status = server
        return res.json({result : 'ok' , status  })
    } catch (error) {
        return res.json({error : error.message})
    }
})





module.exports = {router , server}