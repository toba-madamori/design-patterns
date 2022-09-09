// synchronous 
console.log('before')

function nonSynchronous() {
    console.log('inside sycnchronous function')
}
nonSynchronous()

console.log('after');


//aynchronous 
console.log('before')

function asynchronous() {
    setTimeout(()=>{console.log('inside asynchronous function')}, 100)
}
asynchronous()

console.log('after');


