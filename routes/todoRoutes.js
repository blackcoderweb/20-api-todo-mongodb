const express = require("express");
const router = express.Router();
const todoController = require ("../controllers/todo");


router.get("/test", todoController.test);
router.post("/create", todoController.create);
router.get("/list", todoController.list);
router.put("/update/:id", todoController.update);
router.delete("/delete/:id", todoController.deleteTodo);
router.get("/count", todoController.todoCount);

module.exports = router;