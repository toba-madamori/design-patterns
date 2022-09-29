import { promises as fsPromises } from 'fs'
import { dirname } from 'path'
import superagent from 'superagent'
import { urlToFilename, getPageLinks } from './utils.js'

function download (url, filename) {
    console.log(`Downloading ${url}`)
    let content
    return superagent.get(url)
        .then((res) => {
            content = res.text
            return fsPromises.mkdir(dirname(filename), { recursive: true })
        })
        .then(() => fsPromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`)
            return content
        })
}

function spiderLinks (currentUrl, content, nesting) {
    let promise = Promise.resolve()
    if (nesting === 0) {
        return promise
    }
    const links = getPageLinks(currentUrl, content)
    for (const link of links) {
        promise = promise.then(() => spider(link, nesting - 1))
    }

    return promise
}

export function spider (url, nesting) {
    const filename = urlToFilename(url)
    return fsPromises.readFile(filename, 'utf8')
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err
            }

            // The file doesn't exist, so let’s download it
            return download(url, filename)
        })
        .then(content => spiderLinks(url, content, nesting))
}
