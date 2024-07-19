const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    query: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    replies: [
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: 'Student'
            },
            reply: {
                type: String,
                required: true
            },
            repliedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
