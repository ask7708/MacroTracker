var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var macroTracker = require('../models/tracker.js');

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username,
                age: req.body.age, weight: req.body.weight,
                goalProtein: req.body.goalProtein,
                goalCarb: req.body.goalCarb,
                goalFat: req.body.goalFat
                }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
       
      
      
      
      return res.status(200).json({
        status: 'Registration successful!',

      });
    });
  });
});






router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false,
      
    });
  }
  return res.status(200).json({
    status: true
  });
  
});

router.get('/profile', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
      
    });
  }
  return res.status(200).json({
    name : req.user.username,
    userAge : req.user.age,
    userWeight : req.user.weight,
    goalProtein: req.user.goalProtein,
    goalCarb: req.user.goalCarb,
    goalFat: req.user.goalFat
  });
  
});

// Get goal calories 
router.get('/calorieCalcs', function(req, res) {


       
        
});

//Create calories
router.post('/macroTrackers', function(req, res, next){
  
   var macTrac = new macroTracker({
      
      _creator : req.user._id,
      title: req.body.title,
      protein: req.body.protein, 
      fat: req.body.fat, 
      carb: req.body.carb,
      total: req.body.total,
      dateMade: req.body.dateMade
        
      });
      
      req.user.tracker.push(macTrac);
      req.user.save();

  
    macTrac.save(function(err){
      if(err) return err;
       macroTracker.find({ _creator: req.user._id })
      .exec(function (err, macTracs) {
      if (err) return (err);
          return res.json(macTracs);
        });
      });
  
});





//Macro Tracker API Routes
router.get('/macroTrackers', function(req, res, next){
  
      
      macroTracker.find({ _creator: req.user._id })
      .exec(function (err, macTracs) {
      if (err) return (err);
          res.json(macTracs);
        });
     
});

//Macro Tracker API Routes
router.get('/macrosByDate', function(req, res, next){
  
      
      macroTracker.find({ "dateMade" : { 
      $lt: new Date(), 
      $gte: new Date(new Date().setHours(0,0,0,0))
      },
      _creator: req.user._id
        
      })
      .exec(function (err, macTracs) {
      if (err) return (err);
          res.json(macTracs);
        });
     
});





router.post('/macroTrackers', function(req, res, next){
  
   var macTrac = new macroTracker({
      
      _creator : req.user._id,
      title: req.body.title,
      protein: req.body.protein, 
      fat: req.body.fat, 
      carb: req.body.carb,
      total: req.body.total,
      dateMade: req.body.dateMade
        
      });
      
      req.user.tracker.push(macTrac);
      req.user.save();

  
    macTrac.save(function(err){
      if(err) return err;
       macroTracker.find({ _creator: req.user._id })
      .exec(function (err, macTracs) {
      if (err) return (err);
          return res.json(macTracs);
        });
      });
  
});


router.post('/resetPass', function(req, res){
  
  
  User.findOne({
    _id : req.user._id
  }, function(err, user){
      if(err) return err;
      
      user.setPassword(req.body.password, function(err){
        if(err) return err;
        user.save();
        return res.send({
          success: true,
          username: user.username
        });
      });
    
    
    
});
  
  
});

router.post('/changeMacros', function(req, res){
  
  
   
  User.findOne({
    _id : req.user._id
  }, function(err, user){
      if(err) return err;
      
      user.goalProtein = req.body.goalProtein;
      user.goalCarb = req.body.goalCarb;
      user.goalFat = req.body.goalFat;
      user.save();
      return res.send({
      success: true,
     
      });
  });  
  
  
});


router.get('/users', function(req, res, next) {

  
      var macTrac = new macroTracker({
      
      _creator : req.user._id,
      title: "Test String",
      protein: 99, 
      fat: 99, 
      carb: 99
      
        
      });
      
      req.user.tracker.push(macTrac);
      req.user.save();

  
    macTrac.save(function(err){
      if(err) return err;
       macroTracker.find({})
            .populate('_creator')
            .exec(function(error,macTracs) {
               return(res.json(req.user.tracker));
            });
      });
     
/*
macTrac.save(function(error) {
    if (!error) {
        macroTracker.find({})
            .populate('_creator')
            .exec(function(error, macTracs) {
                return res.json(req.user.tracker);
            })
    }
});*/
     /* User.find({})
      .exec(function(error, users){
        return res.json(users);
      });*/


});

router.delete('/deleteMacTrack/:food_id',function(req, res){
  
  macroTracker.remove({
        _id: req.params.food_id
  }, function(err, macroTrac){
      if(err)
        res.send(err);
        
        
     macroTracker.find({ _creator: req.user._id })
      .exec(function (err, macTracs) {
      if (err) return (err);
          res.json(macTracs);
        });
  });
  
});


module.exports = router;