import { EventEmitter } from 'events'
import { readFile } from 'fs'

function findRegex (files, regex) { 
    const emitter = new EventEmitter() 
    for (const file of files) { 
        readFile(file, 'utf8', (err, content) => {
            if (err) { 
                return emitter.emit('error', err)
            }
            emitter.emit('fileread', file) 
        
            const match = content.match(regex) 
            if (match) {
                match.forEach(elem => emitter.emit('found', file, elem)) 
            } 
        }) 
    } 
    return emitter 
}


findRegex(['./asynchronous/observer-event-emitter/fileA.txt', './asynchronous/observer-event-emitter/fileB.json'], /hello \w+/g)
    .on('fileread', file => console.log(`${file} was read`))
    .on('error', err => console.error(`Error emitted ${err.message}`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
