var mongoose=require('mongoose');
//Retriving the register model from mongoose lib
var user=mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
//POST
exports.createUser=function(req,res,next){
    console.log('in createUser');
 var postUserData=new user(req.body);
    //Sending body data to user model   
    postUserData.save(function(err,userDetils){
        if(err){
            res.status(500);
            res.json(err)
        }else{
            console.log('result'+userDetils);
            res.json(userDetils)             
        }
    })
}
//GET
exports.getUser=function(req,res,next){
	console.log('req.params.id-->'+req.params.id);
//getting data from user model
    user.find(function(err,userDetils){
        if(err){
            res.status(500);
            res.json(err)
        }else{
            res.json(userDetils)             
        }
    })
}

//Get by id
exports.getUserById=function(req,res,next){
	console.log('In getUserbyId req.params.id-->'+req.params.id);
//getting data from user model
    user.find(new ObjectId(req.params.id),function(err,userDetils){
        if(err){
            res.status(500);
            res.json(err)
        }else{
            res.json(userDetils)             
        }
    })
}

exports.deleteUser=function(req,res,next){
//deleting data from user model
	console.log('In deleteuser req.params.id-->'+req.params.id);
    user.findByIdAndRemove(new Object(req.params.id),function(err,userDetils){
        if(err){
            res.status(500);
            res.json(err)
        }else{
            res.json(userDetils)             
        }
    })
}

/*exports.updateUser=function(req,res,next){
//updating data from user model
	var postUserData=new user(req.body);
	console.log('In updateUser req.params.id-->'+req.params.id);
	console.log('In updateUser req.params.id-->'+postUserData);
    user.findByIdAndUpdate(new ObjectId(req.params.id),postUserData,function(err,userDetils){
        if(err){
            res.status(500);
            res.json(err)
        }else{
            res.json(userDetils)             
        }
    })
}*/

exports.updateUser=function(req,res,next){
user.findById(req.params.id, function (err, userDetils) {
        if(!userDetils) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        userDetils.username = req.body.username;
        userDetils.address = req.body.address;
        
        
        return userDetils.save(function (err) {
            if (!err) {
                console.log("userDetils updated");
                return res.send({ status: 'OK', userDetils:userDetils });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                console.log('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
}