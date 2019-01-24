if(process.env.NODE_ENV === "production"){
    module.exports = {}
}else {
    module.exports = {
        mongoURI: "mongodb://localhost:27017/mern_twitter_clone",
        secretOrKey: "xxxYYYzzz"
    }
}