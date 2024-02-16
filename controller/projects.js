const Project = require('../models/projects')

exports.createProject = async(req,res,next)=>{
    try{
        const { title, desc, requirement, budget, duration, languages } = req.body;
        const { userId } = req;
        const data = await new Project({
            userId: userId,
            title: title,
            desc: desc,
            requirement: requirement,
            budget: budget,
            duration: duration,
            languages: languages
        })
        const createdProject = await data.save();
        if(!createdProject){
            const error = new Error('Project Not Created');
            error.status = 422;
            throw error;
        }
        res.status(200).json({message: "Project Created", data: createdProject});
    }
    catch(err){
        console.log(err);
        if (!err.status) {
            err.status = 500;
          }
          next();
    }
}