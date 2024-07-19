const mongoose = require('mongoose')
const Schema = mongoose.Schema




// Define a schema for weekly submissions
const submissionSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    projectId:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    submissions:[{
    week: {
        type: String
    },
    link:{
        type:String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String
    },
    feedback:{
        Mark:Number,
        Comment:String
    }}]
})

/*Define a schema for final project report submission
const FinalProjectSubmissionSchema = new Schema({
    submissionDate: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String
    },
    files: [FileSchema]
})

// Define a schema for viva voce format
const VivaVoceFormatSchema = new Schema({
    submissionDate: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String
    }
})

// Define the main submission schema
const SubmissionSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    projectId:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    weeklySubmissions: [WeeklySubmissionSchema],
    finalProjectSubmission: {
        type: FinalProjectSubmissionSchema,
        default: null
    },
    vivaVoceFormat: {
        type: VivaVoceFormatSchema,
        default: null
    }
})*/

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission

