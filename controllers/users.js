const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const UsersController = {

  Show: (req, res) => {
    User.findOne({_id: req.params.id })
      .then((user) => { 
        if (!user) { return res.status(404).send("Not Found") } 

        Post.find().where('_id').in(user.posts).exec((err, posts) => {
          res.render("users/show", { user: user, posts: posts });
        });
        
      })
      .catch((err) => {
        res.status(404).send(`Error - ${err}`)
      })
  },

  New: (req, res) => {
    res.render("users/new", {title: "Acebook - Sign up"});
  },

  Create: (req, res) => {

    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash

    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user;
     
      res.status(201).redirect("/posts");
    });
  },
  
  Search: (req, res) => {

    console.log("trying to search users" );
    //const searchuser = req.body.searchuser;
    //console.log("with the search string of " searchuser);
    const searchuser = req.params.search;
    //req.params.id
    console.log('with search string of ' +searchuser);
    
    // User.find(
    //   { "authors": /Alex/i }, 
    //   function(err,docs) { 
  
    //   }
  

    User.find(
      { "name": { "$regex": "Luc", "$options": "i" } },
      function(err,users) { 
        console.log(users);
      }

      //THIS IS LOOPING, BUT RETURNING BACK what I would EXPECT
      
    ); 

    //   res.render("posts/index", { posts: posts, userid: req.session.user._id, user: req.session.user});
    // });


    // User.find({_name: req.params.id })
    // .populate({
    //     path : 'teachers' , 
    //     match : { username : "bob" }
    //  })
    //  .exec(callback);

  },
};

module.exports = UsersController;
