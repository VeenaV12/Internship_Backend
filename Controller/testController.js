const Data = require('../Model/testModel')


const addData = async(req,res)=>{
    
    try{
        //console.log(req.body)
        var postItem = {
            name:req.body.name,
            email:req.body.email
        }

        var post = new Data(postItem)
        await post.save()
        res.status(201).json(postItem)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"There is a internal server error"})
    }
}



const getData = async(req,res)=>{
    try{
        const posts = await Data.find({})
        res.status(200).json(posts)
    }
    catch(err){
        
        console.log(err)
        res.status(500).json({error:"There is a internal server error"})
    }
}

module.exports = {getData, addData}