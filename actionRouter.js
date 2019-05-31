const express = require('express')
const router = express.Router();
const dbaction = require('./data/helpers/actionModel')
router.use(express.json())


router.get('/', (req, res) =>{
    dbaction.get()
    .then( project => {
        res.status(200).json(project)
    })
    .catch( error => {
        res.status(500).json({error:{message: " that ain't it chief"}})
    })
})


router.post('/', (req, res) => {
    const newAction = req.body 
    dbaction.insert(newAction)
    .then( action =>{
        res.status(200).json(action)
    }).catch( error => {
        res.status(500).json({error:{message: " that ain't it chief"}})
    })
    
    
})

router.put('/:id', (req, res) => {
    const updateAct = req.body
    const id = req.params.id

    dbaction.update(id, updateAct)
    .then( action => {
        res.status(200).json(action)
    })
    .catch( err => {
        res.status(500).json({ error: err, message:"could not update.... oops"})
    })
      
})

router.delete('/:id', (req, res)=>{
    const actionid = req.params.id
    dbaction.remove(actionid)
    .then( action =>{
        if(action){
            dbaction.remove(actionid).then(
                removeaction => {
                    res.status(201).json(removeaction)
                }
            )
        }else{
            res.status(404).json({ error: err, mesage : "The user with specified ID does no exist"})
        }
    })
    .catch(error =>{
        res.status(500).json({  message: "The user could not be removed"})
     })
})

module.exports  = router