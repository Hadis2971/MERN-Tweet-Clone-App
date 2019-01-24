module.exports = (error, req, res, next) => {
    //console.log(2);
    console.log(error.stack);
    res.status(500).json({Internal_Server_Error: `Error => ${error}`});
}