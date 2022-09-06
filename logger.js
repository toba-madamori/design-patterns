export default class Logger{
    constructor(name){
        this.name = name
    }
    log(message){
        console.log(`${this.name} : ${message}`)
    }
}

export function custom(message) {
    console.log('This is a custom logger with message :' + message)
}