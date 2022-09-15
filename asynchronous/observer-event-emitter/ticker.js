import { EventEmitter } from 'events'

const ticker = (number, cb)=>{
    const emitter = new EventEmitter()
    let counter = 0

    //adding a little twist to our ticker function
    setTimeout(()=>{
        if(Number(Date.now()%5 === 0)){
            emitter.emit('error', 'error: time is divisible by 5')
            cb(new Error('error: time is divisible by 5'), null) 
        }else{
            emitter.emit('tick', number) 
        }
    })

    // // emitting a tick event immediately the function is fired
    // process.nextTick(()=> emitter.emit('tick', number))
    // // same as above only this time we use setTimeout to add the process to the next event loop cycle
    // setTimeout(()=> emitter.emit('tick', number))

    setTimeout(function tick(){
        if(number === 0){
            cb( null, counter)
        }else{
            number -= 50
            counter++

            if(Number(Date.now()%5 === 0)){
                emitter.emit('error', 'error: time is divisible by 5')
                cb(new Error('error: time is divisible by 5'), null)
            }else{
                emitter.emit('tick', number)
                setTimeout(tick, 50)
            }
        }
    }, 50)
    return emitter
}

ticker(500, (err, count)=>{
    if(err){
        console.error(err.message)
        return
    }
    console.log(`Total no of 50-milliseconds batches that occured is: ${count}`)})
.on('tick', (number)=>console.log(`a tick has happened, initial timer is at: ${number} milliseconds`))
.on('error', (err)=> console.error(err))