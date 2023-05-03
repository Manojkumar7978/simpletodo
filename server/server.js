let express = require('express')
const { getAllTodos, deleteTodo, updateTodos, addtodo } = require('./functions')
let cors = require('cors')
let app = express()

app.use(cors())
app.use(express.json());
//morgan middleware

app.get('/todos', async (req, res) => {
    try {
        const employees = await getAllTodos()
        return res.send(
            employees
        )
    } catch (err) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (isNaN(id)) {
            return res.status(400).send({
                message: 'Not a valid id'
            })
        }
        const removedTodo = await deleteTodo(id)
        if (removedTodo == -1) {
            return res.status(404).send({
                data: 'Employee does not exist'
            })
        } else {
            return res.send({
                data: removedTodo
            })
        }
    } catch (error) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (isNaN(id)) {
            return res.status(400).send({
                message: 'Not a valid id'
            })
        }
        let data = req.body
        let updateTodo = updateTodos(id, data)

        if (updateTodo == -1) {
            return res.status(404).send({
                data: 'Employee does not exist'
            })
        } else {
            return res.send({
                data: updateTodo
            })
        }
    } catch (error) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})

app.post('/todos', async (req, res) => {
    try {
        let data = req.body
        let update = await addtodo(data)
        return res.status(201).send({
            data: update
        })

    } catch (error) {
        console.error(err.message)
        return res.status(500).send({
            message: 'Something went wrong, please try again later'
        })
    }
})


app.listen(3000, () => {
    console.log('server listen to localhost://3000')
})