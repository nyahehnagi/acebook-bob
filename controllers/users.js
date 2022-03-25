const User = require("../models/user");
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UsersController = {

  Update:(req, res) => {

    if (req.session.user._id == req.params.id) { 
      return res.status(201).redirect(`/users/${req.params.id}`)
    };

    User.findOne({_id: req.session.user._id })
    .then((user) => { 
      if (!user) { return res.status(404).send("Not Found") } 

      if (user.friends.includes(req.params.id)){
        return res.status(201).redirect(`/users/${req.params.id}`) // Already friends
      }

      user.friends.push(req.params.id)
      user.save()

      User.findOne({_id: req.params.id })
      .then((other_user) => { 
      if (!other_user) { return res.status(404).send("Not Found") } 

      other_user.friends.push(req.session.user._id)
      other_user.save()
      })

      res.status(201).redirect(`/users/${req.params.id}`);
    })
    .catch((err) => {
      res.status(404).send(`Error - ${err}`)
    })

  },

  Index: (req, res) => {
    
    if (!req.query.q){ 
      res.status(200).send("Nothing to see here") 
      return
    }
    
    User.find({ "name": { "$regex": req.query.q, "$options": "i" } },
      function(err, users) { 
        if (err) {
          throw err
        }
      
      user = req.session.user  

        res.render("users/index", { users: users, user: user})
      })
  },

  Show: (req, res) => {
    var showAddFriend = true
    var showUploadPhoto = false
    // this allows viewing of a profile when not logged in
    const sessionUserId = typeof(req.session.user) == "undefined"  ? 0 : req.session.user._id

    if (sessionUserId == req.params.id || sessionUserId == 0) {
      showAddFriend = false
    }
    if (sessionUserId == req.params.id || sessionUserId == 0) {
      showUploadPhoto = true
    }

    User.
      findOne({_id: req.params.id }).
      populate('friends').
      exec (function (err, user){
        if (err) throw err;
        if (!user) { return res.status(404).send("Not Found") } 

        user.friends.forEach((friend) => {
          if (friend.id == sessionUserId){showAddFriend = false}
        })

        Post.
          find().
          where('_id').in(user.posts).
          populate('userObjectId').
          populate('comments.commenterId').
          exec((err, posts) => {
          if (err) throw err;
          posts.forEach((post) => {
            post.createdOnPretty = post.formatDate(post.createdAt)
          })
          res.render("users/show", { user: user, posts: posts, users: user.friends, showAddFriend: showAddFriend, showUploadPhoto: showUploadPhoto});
        });
        
      })

  },

  Upload: (req, res) => {
    User.findOne({ _id: req.session.user._id }).then((user) => {
      
      user.profilePicLocation = req.body.profile_pic

      user.save((err) => {
        if (err) {
          throw err
        }
      })
      res.status(201).redirect(`/users/${req.session.user._id}`);
    })
  },

  New: (req, res) => {
    res.render("users/new", {title: "Acebook - Sign up"});
  },

  Create: (req, res) => {

    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash

    const user = new User(req.body);

    user.profilePicLocation = "https://cdn-y0enty0e.files-simplefileupload.com/static/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc21EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0c88e49f496491f7afc336cf8ad2ad64a3a8ac3a/blank_profile.jpg"

    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user;
     
      res.status(201).redirect("/posts");
    });
  },

};

module.exports = UsersController;
