const decoded = require("jwt-decode")

 function decoder(token){
    return decoded(token)
}

module.exports=decoder;