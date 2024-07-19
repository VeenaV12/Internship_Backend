const Project = require('../Model/projectModel')


/*const addProject = async(req,res)=>{
    try{
        var projectData = {
            projectName:req.body.name,
            batch:req.body.batch,
            desc:req.body.desc
        }
    
        var newProject = new Project(projectData) 
        await newProject.save()
        res.status(200).json(projectData)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'Internal Error'})
    }
    }*/


    const addProject = async(req,res)=>{
        try{
            const { name, batch, desc ,pdf} = req.body
        
            var newProject = new Project({projectName:name,batch,desc,pdf}) 
            await newProject.save()
            res.status(200).json('Uploaded')
        }
        catch(error){
            console.log(error)
            res.status(500).json({message:'Internal Error'})
        }
        }
    

        const getProject = async (req, res) => {
          try {
              const projectId = req.params.projectid
              const project = await Project.findById(projectId)
      
              if (!project) {
                  return res.status(404).json({ message: 'Project not found' })
              }
      
              // Check if project has a PDF file associated
              if (!project.pdf || !project.pdf.filename) {
                  console.log('PDF file not found for project with ID:', projectId);
                  return res.status(404).json({ message: 'PDF file not found for this project' })
              }
      
              // Respond with the PDF object (or specific properties as needed)
              res.json({ pdf: project.pdf })
          } catch (error) {
              console.error('Error retrieving project:', error)
              res.status(500).json({ message: 'Internal Server Error' })
          }
      }
      



    module.exports = {addProject, getProject}