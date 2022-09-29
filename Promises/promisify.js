import { randomBytes } from 'crypto'

export function promisify (callbackBasedApi) {
    return function promisified (...args) {
        return new Promise((resolve, reject) => {
            const newArgs = [
                ...args,
                function (err, result) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(result)
                }
            ]
            callbackBasedApi(...newArgs)
        })
    }
}

// export function promisify (callbackBasedApi) {
//     return function promisified (...args) {
//         return new Promise((resolve, reject) => {
//             callbackBasedApi(...args, (err, result) => {
//                 if (err) {
//                     return reject(err)
//                 }
//                 resolve(result)
//             })
//         })
//     }
// }

const randomBytesP = promisify(randomBytes)

randomBytesP(20)
    .then(buffer => { console.log(`Random bytes: ${buffer.toString()}`) })
    .catch(err => { console.error(err.message) })
