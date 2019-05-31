const express = require('express')
const router = express.Router();
const dbproject = require('./data/helpers/projectModel')
router.use(express.json())

router.get('/', (req, res) =>{
    dbproject.get()
    .then( project => {
        res.status(200).json(project)
    })
    .catch( error => {
        res.status(500).json({error: {message: "internal server error"}})
    })
})

router.get("/id", (req,res) =>{
    const id = req.params.id
    dbproject.getProjectActions(id)
    .then( projectactions => {
    res.status(200).json(projectactions)
    })
    .catch( error =>{
        res.status(500).json({error: {message: " internal server error "}})
    })
})

router.put('/:id', (req, res) => {
    const updateProject = req.body
    const id = req.params.id

    dbproject.update(id, updateProject)
    .then( project => {
        res.status(200).json(project)
    })
    .catch( err => {
        res.status(500).json({ error: err, message: "internal server error "})
    })
})

router.delete('/:id', (req, res)=>{
    const projectid = req.params.id
    dbproject.remove(projectid)
    .then( project =>{
        if(project){
            dbproject.remove(project).then(
                removeproject => {
                    res.status(201).json(removeproject)
                }
            )
        }else{
            res.status(404).json({ error: err, mesage : "The user with specified ID does not exist"})
        }
    })
    .catch(error =>{
        res.status(500).json({ message: "The user could not be removed "})
    })
})

module.exports = router