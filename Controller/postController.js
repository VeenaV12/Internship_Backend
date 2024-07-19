const Post = require('../Model/postModel')
const Student = require('../Model/studentModel') 
const Project = require('../Model/projectModel')
const mongoose = require('mongoose')

const postQuery = async (req, res) => {
    try {
        const studentId = req.params.student_id
        const { query } = req.body
        
        const student = await Student.findById(studentId)

        const projectId = student.project
      
        const newPost = new Post({
            student: studentId,
            project: projectId,
            query: query
        })

        await newPost.save()

        res.status(201).json({ message: 'Query posted successfully', post: newPost })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


const getPosts = async (req, res) => {
    try {
        const projectId = req.params.id; 
        
        const posts = await Post.find({ project: projectId })
                                .populate('student', 'name') 
                                .sort({ postedAt: -1 }) 
                                .populate({
                                    path: 'replies',
                                    populate: { path: 'student', select: 'name' }
                                })

        console.log('Fetched posts:', posts)
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


const deletePost = async (req,res)=>{
    try{
            await Post.findByIdAndDelete(req.params.post_id)
            res.status(200).json({message:'Post deleted successfully'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'Internal Error'})
    }
}

const updatePost = async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.post_id,req.body,{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        
        console.log(err)
        res.status(500).json({error:"There is a internal server error"})
    }
  }
  


  const postReply = async (req, res) => {
    try {
        const postId = req.params.post_id
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
}      


const updateReply = async(req,res)=>{
    try {
        const postId = req.params.post_id;
        const replyId = req.params.reply_id;
        const studentId = req.session.loggedStudent._id;
        const updatedReplyContent = req.body.reply;
        
        const updatedPost = await Post.findOneAndUpdate(
          { 
            _id: postId, 
            'replies._id': replyId, 
            'replies.student': studentId 
          },
          { 
            $set: { 'replies.$.reply': updatedReplyContent } 
          },
          { new: true }
        ).populate('replies.student', 'name');
    
        if (!updatedPost) {
          return res.status(404).json({ message: 'Post or reply not found' });
        }
    
        res.status(200).json(updatedPost);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  }
  



const deleteReply = async (req,res)=>{
    try {
        const postId = req.params.post_id;
        const replyId = req.params.reply_id;
    
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { replies: { _id: replyId } } },
          { new: true }
        ).populate('replies.student', 'name');
    
        if (!updatedPost) {
          return res.status(404).json({ message: 'Post or reply not found' });
        }
    
        res.status(200).json(updatedPost);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }



module.exports = {postQuery, getPosts, postReply, deletePost, updatePost, updateReply, deleteReply}
