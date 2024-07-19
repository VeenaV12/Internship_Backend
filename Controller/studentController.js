const Project = require('../Model/projectModel')
const Student = require('../Model/studentModel')
const Passlists = require('../Model/testModel')
const jwt = require('jsonwebtoken')



const addStudent = async(req,res)=>{
    try{

        const isPassed = await Passlists.exists({name:req.body.name})

        if (!isPassed) {
            //throw new Error('Student has not passed the exit exam.');
            console.log('Student has not passed the exit exam')
        }

        var studentData = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            batch:req.body.batch
        }
    
        var newStudent = new Student(studentData) 
        await newStudent.save()
        res.status(200).json(studentData)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'Internal Error'})
    }
    }



    const studentLogin = async (req, res) => {
        try {
            const loggedStudent = await Student.findOne({ email: req.body.email })
    
            if (!loggedStudent) {
                return res.status(404).json({ message: 'Student not found' })
            }
    
            if (loggedStudent.password !== req.body.password) {
                return res.status(401).json({ message: 'Wrong password' })
            }
    
            const payload = { email: req.body.email, password: req.body.password }
            const token = jwt.sign(payload, 'checkApp')
    
            req.session.loggedStudent = {
                _id: loggedStudent._id,
                name: loggedStudent.name
            }
    
            if (!loggedStudent.project) {
                const projects = await Project.find({ batch: loggedStudent.batch })
                return res.status(200).json({ message: 'Login successful', token: token, projects: projects })
            }
    
            return res.status(200).json({ message: 'Login successful', token: token })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
    


    const selectProject = async (req, res) => {
        try {
            const studentId = req.params.student_id 
    
            // Update student's selected project
            const updatedStudent = await Student.findByIdAndUpdate(
                studentId,
                { $set: { project: req.body._id,
                          projectSelectionDate: Date.now()
                 } },
                { new: true }
            )
    
            if (!updatedStudent) {
                return res.status(404).json({ message: 'Student not found' })
            }
    
            // Return updated student data with selected project
            res.status(200).json(updatedStudent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }




    // Logout endpoint
//checkRouter.post('/logout',
const logoutStudent = async (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to logout' })
      } else {
        res.clearCookie('connect.sid') // Clear session cookie
        res.json({ success: true })
      }
    })
  }

    module.exports = {addStudent, studentLogin, selectProject, logoutStudent}