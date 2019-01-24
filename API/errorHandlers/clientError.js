module.exports = (error, req, res, next) => {
    if(req.xhr){
        res.status(400).json({Client_Request_Error: `Error => ${error}`});
    }else {
        next(error);
    }
}