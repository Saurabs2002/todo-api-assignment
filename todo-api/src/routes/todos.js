const express = require("express");
const prisma = require("../prisma");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Todo created
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, completed } = req.body;

    const todo = await prisma.todo.create({
      data: {
        title,
        completed,
        userId: req.user.userId
      }
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos for logged-in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get("/", auth, async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.userId
      }
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await prisma.todo.updateMany({
      where: {
        id: parseInt(id),
        userId: req.user.userId
      },
      data: req.body
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.todo.deleteMany({
      where: {
        id: parseInt(id),
        userId: req.user.userId
      }
    });

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
