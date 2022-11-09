import express from "express"
const router = express()
const controller = require('../../controllers/todo.controller')

router.post('/create', controller.create)
router.post("/list", controller.list)
router.post("/mark-as-done", controller.markAsDone)
router.post("/mark-as-not-done", controller.markAsNotDone)
router.post("/move-to-directory", controller.moveToDirectory)

module.exports = router