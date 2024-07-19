const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        unique:true
    },
    batch: {
        type: String,
        required: true 
    },
    desc:{
        type:String
    },
    pdf: 
        {
          filename: { type: String},
          path: { type: String}
        }
      
})

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project
