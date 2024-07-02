const User = require('./User')

class Game {
    connections = {}
    id
    dataReceived = []
    udpData = []
    users = {}
    
    idToAddressAndPort = {}
    addressAndPortToId = {}
    

    constructor() {
        this.id = this.generateID()
    }

    getAllUsers() {
        return this.users
    }

    addData(data) {

        this.dataReceived.push(data)
    }

    addUDPData(address , port , data) {
        this.udpData.push({"userkey" : this.getUserKey({address , port}) , data : data.data})
    }

    checkUser(user) {
        return 0;
    }



    generateID() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    getUserIDFromIPAndPort(ip , port){
        
        this.idToAddressAndPort[this.getUserIDFromIPAndPort(ip , port)]
    }

    getUserIdFromUserKey(key){
        return this.addressAndPortToId[key]
    }

    getIPAndAddressFromUserID(id){
        return this.addressAndPortToId[id]
    }

    getUserKey(user) {

        return  user.address + ":" + user.port
    }

    removeInActiveUsers() {
        //later.....
    }

    registerUser(address , port){
        //check if user exists
        let user = this.users[this.getUserKey({address , port})]
        if(user === undefined){
            //if not create a user and register it on all the maps
            user = new User("name" , address , port)
            this.users[this.getUserKey({address , port})] = user
            //register the new created id on 2 maps
            console.log("cant find player adding new one ... " , this.getUserKey({address , port} ) , user.id)
            this.idToAddressAndPort[user.id] = this.getUserKey({address , port})
            this.addressAndPortToId[this.getUserKey({address , port})] = user.id 
        }
    }    
}

module.exports = Game

