const express = require('express')
const testRouter = express.Router()
const {getData, addData} = require('../Controller/testController')
const { addStudent, studentLogin, selectProject, logoutStudent } = require('../Controller/studentController')
const { addProject, getProject } = require('../Controller/projectController')
const {postQuery, getPosts, postReply, deletePost, updatePost, updateReply, deleteReply} = require('../Controller/postController')
const { submit } = require('../Controller/submissionController')



testRouter.get('/',getData)
testRouter.post('/',addData)

testRouter.post('/addstudent',addStudent)
testRouter.post('/login',studentLogin)
testRouter.post('/logout',logoutStudent)

testRouter.post('/addproject',addProject)
testRouter.get('/getproject/:projectid',getProject)
testRouter.post('/selectproject/:student_id',selectProject)

testRouter.post('/submit/:student_id',submit)


testRouter.post('/postquery/:student_id',postQuery)
testRouter.get('/getpost/:id',getPosts)
testRouter.post('/postreply/:post_id',postReply)
testRouter.delete('/deletepost/:post_id',deletePost)
testRouter.patch('/updatepost/:post_id',updatePost)
testRouter.patch('/updatereply/:post_id/:reply_id',updateReply)
testRouter.delete('/deletereply/:post_id/:reply_id',deleteReply)

module.exports = testRouter