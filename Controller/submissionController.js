const Submission = require('../Model/submissionModel')
const Student = require('../Model/studentModel')

const submit = async (req, res) => {
    try {
        const studentId = req.params.student_id
        const { week,link,comment } = req.body
        
        const student = await Student.findById(studentId)

        const projectId = student.project
      
        const firstSubmission = new Submission({
            student: studentId,
            project: projectId,
            week,link,comment
        })

        await firstSubmission.save()

        res.status(201).json({ message: 'Query posted successfully', post: firstSubmission })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}



module.exports = {submit}