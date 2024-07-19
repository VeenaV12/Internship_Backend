const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
        // This field will initially be null or undefined
        // and will be assigned a value after the student selects a project
    },
    projectSelectionDate: {
        type: Date
    }
})


const Student = mongoose.model('Student', StudentSchema)

module.exports = Student
