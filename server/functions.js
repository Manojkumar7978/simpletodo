let fs = require('fs/promises')

let FILE = './db.json'

async function getAllTodos() {
    let content = await fs.readFile(FILE, { encoding: 'utf-8' })

    let todos = JSON.parse(content);
    return todos;

}
async function updateFile(newTodo) {
    let data = {
        todos: [...newTodo]
    }

    await fs.writeFile(FILE, JSON.stringify(data, null, 2))
}

async function deleteTodo(id) {
    let content = await getAllTodos()
    let index = -1;
    let todos = content.todos

    todos.forEach((element, ind) => {
        if (element.id == id) {
            index = ind;
        }
    });
    if (index === -1) {
        return -1;
    }
    let dltTodo = todos.splice(index, 1)
    updateFile(todos)
    return dltTodo

}


async function updateTodos(id, update) {
    let content = await getAllTodos()
    let data = content.todos
    let index = -1;
    data.map((el, ind) => {
        if (el.id == id) {
            index = ind;
        }
    })
    if (index == -1) {
        return -1;
    }
    let todo = data[index]
    data[index] = { ...data[index], ...update }
    updateFile(data)
    return todo
}

async function addtodo(newdata) {
    let todos = await getAllTodos()
    let data = todos.todos
    let max = 0;
    data.forEach((el, ind) => {
        if (el.id > max) {
            max = el.id;
        }
    })
    let obj = {
        ...newdata,
        id: max + 1
    }
    data.push(obj)
    updateFile(data)
    return obj
}

module.exports = {
    getAllTodos,
    deleteTodo,
    updateTodos,
    addtodo
}
