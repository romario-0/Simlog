var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { checkUser } = require('../middlewares/auth.middleware');

router.post('/signup', function(req, res, next){
    const userObj = req.body;

    userModel.find({ username : userObj.username }, function(err, user){
        if(err){
            res.send('Unable to process request');
        }else{
            if(user.length === 0){
                userModelObj = new userModel({
                    firstName : userObj.firstName,
                    lastName : userObj.lastName,
                    age : userObj.age,
                    nationality : userObj.nationality,
                    username : userObj.username,
                    password :  userObj.password,
                });
            
                userModelObj.save(function(err, user){
                    if(err){
                        res.send({message:'Unable to add Object'});
                    }else{
                        const newUser = getUserData(userObj);
                        const token = createToken(newUser.id);
                        //res.cookie('jwt', token, {sameSite: 'none', secure: true, httpOnly : true,  maxAge : 3*24*60*60*1000});
                        req.session.token = token;
                        res.send({message:'User added successfully', user : newUser});
                    }
                });
            }else{
                res.send('Username already in use');
            }
        }
    })
});

router.post('/login',async function(req, res, next){
    const userCredentials = req.body;
    try{
        const user = await userModel.login(userCredentials.username, userCredentials.password);
        const userObj = getUserData(user);
        const token = createToken(userObj.id);
        //res.cookie('token', token, {httpOnly : true,  maxAge : 3*24*60*60*1000});
        res.send({message : "User fetched", user : userObj, userToken : token});
    }catch(err){
        res.send({message : err.message});
    } 
});

router.post('/logout',checkUser, function(req, res, next){
    const userCredentials = req.body;
    try{
        //res.cookie('token', "", {httpOnly : true,  maxAge : 1});
        res.send({message : "User Logged out", isSuccess : true});
    }catch(err){
        res.send({message : err.message, isSuccess : false});
    } 
});

router.put('/update', function(req, res, next){
    const userObj = req.body;
    userUpdateObj = {
        firstName : userObj.firstName,
        lastName : userObj.lastName,
        age : userObj.age,
        nationality : userObj.nationality
    };

    userModel.findOneAndUpdate({ username : userObj.username }, userUpdateObj, function(err, user){
        if(err){
            res.send({ message : "User update failed" });
            console.log(err);
        }else{
            const upadtedUser = getUserData(userObj);
            res.send({ message : "User successfully updated", user : upadtedUser});
        }
    });
});

router.get('/validate',checkUser, async function(req, res, next){
    try{
        if(!res.locals.authError){
            const user = await userModel.find({_id : res.locals.user.id });
            const userObj = getUserData(user);
            res.send({message : "User fetched", user : userObj});
        }else{
            res.send({message : "Session timed out"});
        }
    }catch(err){
        res.send({message : err.message});
    } 
});

function getUserData(user){
    const userObj = {
        id : user._id,
        firstName : user.firstName,
        lastName : user.lastName,
        age : user.age,
        nationality : user.nationality,
        username : user.username
    }
    return userObj;
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn : 3*24*60*60
    });
}

module.exports = router;