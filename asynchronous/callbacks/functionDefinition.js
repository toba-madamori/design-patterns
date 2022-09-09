// synchronous with a callback (CPS style)

function addition(a, b, cb){
    cb(a + b)
}

console.log('before');
addition(2, 3, (result)=> console.log(result));
console.log('after');


// asynchronous with a callback(CPS style)

function as_addition(a, b, cb){
    setTimeout(()=>cb(a + b), 100)
}

console.log('before');
as_addition(2, 3, (result)=> console.log(result));
console.log('after')