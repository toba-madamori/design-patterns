const fs = require('fs')

// loads the content of a module, wraps it into a private scope and evaluates it.
function loadModule (filename, module, require){
    const wrappedSrc =`(function (module, exports, require) 
    { ${fs.readFileSync(filename, 'utf8')} })(module, module.exports, require)` 
    eval(wrappedSrc)
}

//sample require function
function sampleRequire(moduleName) {
    console.log(`Require invoked for module: ${moduleName}`) 
    const id = sampleRequire.resolve(moduleName) 
    if (sampleRequire.cache[id]) {
        return sampleRequire.cache[id].exports 
    }
        // module metadata 
    const module = {
        exports: {}, 
        id
    }
        // Update the cache 
    sampleRequire.cache[id] = module
        // load the module     
    loadModule(id, module, sampleRequire)
        // return exported variables 
        return module.exports
}
sampleRequire.cache = {} 
sampleRequire.resolve = (moduleName) => {
    /* resolve a full module id from the moduleName */ 
}
