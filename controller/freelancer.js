const Freelancer = require('../models/freelancers')

exports.createProfile = async(req,res,next)=>{
    try{
        const {education,experience,skills} = req.body;
        const userId = req.userId;
        
        const data = new Freelancer({
            userId: userId,
            education: education,
            experience: experience,
            skills: skills,
        })

    }catch(err){
        if(!err.status){
            err.status = 500;
        }
    next();
    }
}