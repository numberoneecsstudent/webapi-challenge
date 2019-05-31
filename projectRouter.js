const express = require('express');
const router = express.Router();

const dbProject = require('./data/helpers/projectModel');


router.get("/", (req, res) => {
  dbProject.get()
    .then( project => {
      res.status(200).json(project)
    })
    .catch( error => {
      res.status(500).json({error:{message: " that ain't it cheif"}})
    })
})

router.get("/:id", (req, res) => {
  const id = req.params.id

  dbProject.getProjectActions(id)
    .then( projectActions => {
      res.status(200).json(projectActions)
    })
    .catch( error => {
      res.status(500).json({error:{message: " that ain't it cheif"}})
    })
})

router.post("/", (req, res) => {
  const newProject = req.body

  dbProject.insert(newProject)
    .then( action => {
      res.status(200).json(action)
    })
    .catch( error => {
      res.status(500).json({error:{message: " that ain't it cheif"}})
    })
})

router.put("/:id", (req, res) => {
  const updateProject = req.body
  const id = req.params.id

  dbProject.update(id, updateProject)
    .then( project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json({error:{message: " that ain't it cheif"}})
    })
})

router.delete("/:id", (req, res) => {
  const projectid = req.params.id

  dbProject.remove(projectid)
    .then(project => {
      if (project) {
        dbProject.remove(project)
          .then(removeProject => {
            res.status(201).json(removeProject)
          })
      } else {
        res.status(404).json({error:{message: " that ain't it cheif"}})
      }
    })
    .catch(error => {
      res.status(500).json({error:{message: " that ain't it cheif"}})
    })
})

module.exports = router;