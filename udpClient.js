const UDP = require('node:dgram')

const client = UDP.createSocket('udp4')


client.on('message', (message, info) => {
    // get the information about server address, port, and size of packet received.

    console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size)

    //read message from server

    console.log('Message from server', message.toString())
})


const packet = Buffer.from(JSON.stringify(
    {
        id: 113,
        data: {
            message: "hi there, i am a client",
            name: 'eliel',
            position : {x : 1 , y : 2 , z :3}
        }
    }
))

client.send(packet, 3001, 'localhost', (err) => {
    if (err) {
        console.error('Failed to send packet !!' + err)
    } else {
        console.log('Packet send !!')
    }
})
client.send(packet, 3001, 'localhost', (err) => {
    if (err) {
        console.error('Failed to send packet !!' + err)
    } else {
        console.log('Packet send !!')
    }
})
client.send(packet, 3001, 'localhost', (err) => {
    if (err) {
        console.error('Failed to send packet !!' + err)
    } else {
        console.log('Packet send !!')
    }
})
client.send(packet, 3001, 'localhost', (err) => {
    if (err) {
        console.error('Failed to send packet !!' + err)
    } else {
        console.log('Packet send !!')
    }
})



// const f = async ()=>{
//     const data = fetch('http://127.0.0.1:3000/server/new_game' , {
//         method:"post",
//         headers: {'Content-Type:' : 'application/json'},
//         body : JSON.stringify({

//         })
//     })

//     const json = await data.json();
//     console.log(json)
// }

// f()