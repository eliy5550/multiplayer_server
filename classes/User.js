class User{
    id
    name 
    address
    port
    constructor(name , address , port){
        this.name = name    
        this.address = address    
        this.port = port    
        this.id = this.generateUserId()
        
    }
    
    generateUserId = ()=>{
        return Math.floor(Math.random() * 1000)
    }
}

module.exports = User