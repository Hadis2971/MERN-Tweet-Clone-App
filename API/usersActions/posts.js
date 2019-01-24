const express = require("express");
const router  = express.Router();

const User = require("../../Models/user");
const Post = require("../../Models/userPost");



router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

router.get("/posts/:id", (req, res) => {
    Post.
    find({ user: req.params.id }).
    exec((err, posts) => {
        if (err) throw err;
        else {
            return res.status(200).json(posts);
        }
    });
});

router.post("/posts", (req, res, next) => {
    User.findById(req.body.id)
    .then(user => {
        user.save(() => {
            const post = new Post({
                user: user._id,
                text: req.body.text
            })

            post.save((err, post) => {
                user.posts.push(post);
                user.save()
                .then(() => res.status(200).json({text: post.text, date: post.date, id: post._id}));               
            });
        })
    })
    .catch(next); 
});

router.delete("/posts", (req, res, next) => {
    User.findOne({'_id' : req.body.user}, function(err, user){
        for(var i=0; i<=user.posts.length; i++){
            if (String(user.posts[i])==String(req.body.id)){
                user.posts.remove(req.body.id);
                break;                   
            }
        }     
        user.save()
        .then(() => {
            Post.findById(req.body.id)
            .then(post => {
                Post.findByIdAndRemove(req.body.id)
                .then(() => res.status(200).json(post));
            })
        })    
    });             
});

router.put("/posts", (req, res, next) => {
    console.log(req.body.id);
    Post.findByIdAndUpdate(req.body.id)
    .then(post => {
        post.text = req.body.newText
        post.save()
        .then(() => {
            Post.find({user: req.body.user})
            .then(posts => res.status(200).json(posts))
            .catch(error => res.status(400).json(error));
        })
    })
    .catch(next);
});

module.exports = router;