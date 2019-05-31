const express = require('express');
const router = express.Router();

const dbAction = require('./data/helpers/actionModel');

router.get("/", (req, res) => {
  dbAction.get()
    .then( get => {
      res.status(200).json(get);
    })
    .catch(error => {
      res.status(500).json({error:{message: "Whoops, that didn't work."}})
    })
});

router.post("/", (req, res) => {
  const newAction = req.body
  
  dbAction.insert(newAction)
    .then( action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({error:{message: " Your post did not go through"}})
    })
})

router.put("/:id", (req, res) => {
  const updateAction = req.body
  const id = req.params.id

  dbAction.update(id, updateAction)
    .then( action => {
      res.status(200).json(action)
    })
    .catch( error => {
      res.status(500).json({error:{message: " that ain't it chief"}})
    })
})

router.delete("/:id", (req, res) => {
  const actionid = req.params.id

  dbAction.remove(actionid)
    .then( action => {
      if (action) {
        dbAction.remove(actionid)
          .then(removeAction => {
            res.status(201).json(releaseEvents)
          })
      } else {
        res.status(404).json({error:{message: "The item could not be deleted at this time"}})
      }
    })
    .catch(error => {
      res.status(500).json({error:{message: "There was a problem deleting the item"}})
    })
})

module.exports = router;