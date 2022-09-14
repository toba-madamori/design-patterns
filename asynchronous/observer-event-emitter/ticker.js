import { EventEmitter } from 'events'

const ticker = (number, cb)=>{
    const emitter = new EventEmitter()
    let counter = 0
    setTimeout(function tick(){
        if(number === 0){
            cb( null, counter)
        }else{
            number -= 50
            counter++
            emitter.emit('tick', number)
            setTimeout(tick, 50)
        }
    }, 50)
    return emitter
}

ticker(500, (err, count)=>console.log(`Total no of 50-milliseconds batches that occured is: ${count}`))
.on('tick', (number)=>console.log(`a tick has happened, initial timer is at: ${number} milliseconds`))