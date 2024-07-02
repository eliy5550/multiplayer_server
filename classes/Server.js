const Game = require("./Game");

class Server {
    games = { 0: new Game(0) }
    udpServer
    constructor() {
        setInterval(() => { this.sendDataOfAllGames() }, 5000)
        const defaultGame = new Game()
        defaultGame.id = 0;
        this.games[0] = defaultGame
        setInterval(() => {
            this.sendDataOfAllGames()
        }, 1000 / 20)
    }


    addNewGame() {

        let game = new Game()
        while (this.games[game.id] !== undefined) {
            game = new Game()
        }
        this.games[game.id] = game
        return game
    }

    removeAllGames() {
        games = {}
    }

    deleteGame(id) {

    }

    sendDataOfAllGames() {
        for (let x in this.games) {
            const game = this.games[x]
            for (let y in game.users) {
                const user = game.users[y]
                this.sendUDPMessagesToUser(user, game, y)
            }
            game.udpData = [] //delete data after its sent to all clients
        }
    }

    getDataString(dataOfPlayer , dataOfOtherPlayers ){
        let result = " "
        for(let i in dataOfPlayer){
            result += JSON.stringify(dataOfPlayer[i]) + "%%%%%"
        }
        result = result.slice(0, -5)

        result+= "*****"

        for(let j in dataOfOtherPlayers){
            result += JSON.stringify(dataOfOtherPlayers[j]) + "%%%%%" 
        }

        result = result.slice(0, -5)

        return result
    }

    sendUDPMessagesToUser(user, game, userkey) {

        const dataOfOtherPlayers = []
        const dataOfPlayer = []

        for (let x in game.udpData) {
            const packet = game.udpData[x]
            //packet.data = packet.data.data
            if(packet?.data?.data !== undefined){
                packet.data = packet.data.data
            }
            packet.userID = game.addressAndPortToId[packet.userkey]
            
            if (packet.userkey == user.address + ":" + user.port) {
                dataOfPlayer.push(packet)
            }else{
                console.log('datapacket -----------' , packet)
                dataOfOtherPlayers.push(packet)
            }

        }


        this.sendMessageUDP(this.getDataString(dataOfPlayer , dataOfOtherPlayers), user.port, user.address)
    }

    gameStatus(req) {
        const game = this.games[req.body.id]
        return game
    }

    receiveDataOfGame(req) {
        // const game = this.games[req.body.id]
        // if (game === undefined) { throw new Error('found no game with that game id: ' + req.body.id) }
        // game.addUDPData(req.body.data)
        return true
    }
    receiveDataOfGameUDP(json, address, port) {
        //get the game of which we are talking about
        if (json.id === undefined) { throw new Error('missng game id') }
        const game = this.games[json.id]
        if (game === undefined) { throw new Error('found no game with that game id: ' + json.id) }

        game.registerUser(address, port)

        game.addUDPData(address, port, json)

        return true
    }

    sendMessageUDP(message, port, address) {
        try {
            const messageToSend = Buffer.from(message)

            this.udpServer.send(messageToSend, port, address, (err) => {
                if (err) {
                    console.error('Failed to send response !!')
                } else {
                    console.log(address, port, " GETS ", message)
                }
            })

        } catch (error) {
            //console.log('failed to send UDP message - ' + error.message)
        }
    }
}
module.exports = Server