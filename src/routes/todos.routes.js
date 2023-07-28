const express = require('express');
const todosController = require('../controllers/todos.controller');
const passport = require('passport')
const router = express.Router();

router.post('/create', passport.authenticate('jwt', {session:false}), todosController.create);
router.get('/view/:id', passport.authenticate('jwt', {session:false}), todosController.viewOneTodos);
router.get('/view', passport.authenticate('jwt', {session:false}), todosController.viewTodos);
router.put('/edit/:id', passport.authenticate('jwt', {session:false}), todosController.update);
router.delete('/delete/:id', passport.authenticate('jwt', {session:false}), todosController.deleteTodos);

module.exports = router;