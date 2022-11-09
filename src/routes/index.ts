import express from 'express'
const directory = require('./modules/directory.route')
const todo = require('./modules/todo.route')

const routes = express()

routes.use('/directory', directory)
routes.use('/todo-item', todo)


module.exports = routes