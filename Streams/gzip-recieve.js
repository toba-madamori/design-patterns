import { createServer } from 'http'
import { createWriteStream } from 'fs'
import { createGunzip } from 'zlib'
import { basename, dirname } from 'path'

const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename'])
    console.log(`File request received: ${filename}`)

    req
        .pipe(createGunzip())
        .pipe(createWriteStream(dirname('') + filename))
        .on('finish', () => {
            res.writeHead(201, { 'Content-Type': 'text/plain' })
            res.end('OK\n')
            console.log(`File saved: ${filename}`)
        })
})

server.listen(3000, () => console.log('Listening on http:// localhost:3000'))
