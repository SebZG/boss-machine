const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
   addToDatabase,
   getAllFromDatabase,
   getFromDatabaseById,
   updateInstanceInDatabase,
   deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.param("id", (req, res, next, id) => {
   const idea = getFromDatabaseById("ideas", id);
   if (idea) {
      req.idea = idea;
      next();
   } else {
      res.status(404).send();
   }
});

ideasRouter.get("/", (req, res, next) => {
   res.send(getAllFromDatabase("ideas"));
});

ideasRouter.put("/:id", checkMillionDollarIdea, (req, res, next) => {
   const updatedIdea = updateInstanceInDatabase("ideas", req.body);
   res.send(updatedIdea);
});

ideasRouter.delete('/:id', (req, res, next) => {
   const deleted = deleteFromDatabasebyId('ideas', req.params.id);
   if (deleted) {
      res.status(204);
   } else {
      res.status(500);
   }
   res.send();
});
