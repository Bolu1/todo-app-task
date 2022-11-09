import express from "express"
const router = express()
const controller = require('../../controllers/directory.controller')

router.post('/create', controller.create)
router.post("/list", controller.list)
router.post("/remove", controller.remove)

module.exports = router