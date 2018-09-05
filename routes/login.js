var express       = require('express');
var passport      = require('passport');
var LocalStrategy =require('passport-local').Strategy;
var User          = require('../models/user');
var router        = express.Router();

router.get('/',function(req,res){
res.render('login');
});

//configuring my local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//sessions data to identify the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/',
  passport.authenticate('local',{successRedirect:'/dashboard',failureRedirect:'/login',failureFlash:true}),
  function(req, res) {
   res.redirect('/dashboard'); 
 });


module.exports = router;