const todosService = require('../services/todos.service')

const create = async(req, res)  => {
    const userId = req.user[0][0].id;
    const {body} = req;

    if(!body.title || !body.description || !body.deadline){
        return res.status(400).json({
            status: 'fail',
            message: 'invalid data'
        })
    }

    try {
        await todosService.create(userId, body);

        return res.status(200).json ({
            status: 'SUCCESS',
            message: 'Berhasil diSimpan'
        })
    } catch (error) {  
        console.log(error)      
        return res.status(500).json({
            status: 'FAILED',
            message: 'system failed to save your data'
        })
    }
}

const viewOneTodos = async (req,res) => {
    const userId = req.user[0][0].id;
    const id = req.params.id;
    try {
        const todos = await todosService.viewOneTodos(id, userId)

        return res.status(200).json({
            status: 'SUCCESS',
            message: 'viewing data',
            data: todos[0][0]
        })
        
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'failed to view data'
        })
    }
}
const viewTodos = async (req,res) => {
    const userId = req.user[0][0].id;
    try {
        const todos = await todosService.viewTodos(userId)

        return res.status(200).json({
            status: 'SUCCESS',
            message: 'viewing data',
            data: todos[0]
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'failed to view data'
        })        
    }
}

const update = async (req, res) => {
    const userId = req.user[0][0].id;
    const id = req.params.id;
    const {body} = req;

    if(!body.title || !body.description || !body.deadline){
        return res.status(400).json({
            status: 'failed',
            message: 'failed to update your data'
        })
    }
    try {
        await todosService.update(id, userId, body)

        return res.status(200).json({
            status: 'SUCCESS',
            message: 'success updated your data'
        })
    } catch (error) {
        return res.status(200).json({
            status: 'FAILED',
            message: 'unable to update your data'
        })
    }
}

const deleteTodos = async (req,res) => {
    const id = req.params.id
    const userId = req.user[0][0].id;
    try {
        await todosService.deleteTodos(id, userId)

        return res.status(200).json({
            status: 'success',
            message: 'data has been deleted'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'data cannot be deleted'
        })
    }
}

module.exports = {
    create,
    viewOneTodos,
    viewTodos,
    update,
    deleteTodos
}