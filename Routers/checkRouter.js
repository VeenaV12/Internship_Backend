const express = require('express')
const checkRouter = express.Router()
const Student = require('../Model/studentModel')
const Project = require('../Model/projectModel')
const jwt = require('jsonwebtoken')
const Post = require('../Model/postModel')


checkRouter.post ('/login',async(req,res)=>{
    const loggedStudent = await Student.findOne({email:req.body.email})

    try{
        if(loggedStudent.password === req.body.password){
            const payload = {email:req.body.email,password:req.body.password}
            const token = jwt.sign(payload,'checkApp')

            const projects = await Project.find({ batch: loggedStudent.batch })
            
            req.session.loggedStudent = {
                _id: loggedStudent._id,
                name: loggedStudent.name 
              }
          

            res.status(200).json({message:'Login successful', token:token, projects: projects})
        }
        else{
            res.json({message:'Wrong password'})
        }
    }
    catch(error){
        console.log(error)
    }     
})
     

// Logout endpoint
checkRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to logout' });
    } else {
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ success: true });
    }
  });
});



checkRouter.post('/postreply/:id',async (req, res) => {
    try {
        const postId = req.params.id
        const studentId = req.session.loggedStudent._id

        
        const reply = {
            reply: req.body.reply,
            student: studentId 
        }

        
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { replies: reply } }, 
            { new: true }
        ).populate('replies.student', 'name')

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' })
        }

        
        res.status(200).json(updatedPost)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})





module.exports = checkRouter;
