import express from 'express'
import Task from '../models/Task.js'

const router = new express.Router()

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
    console.log(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks/:id', async (req, res) => {
  const Id = req.params.id

  try {
    const task = await Task.findById(Id)

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
  return null
})

router.get('/tasks/:id', async (req, res) => {
  const Id = req.params.id
  try {
    const task = await Task.findById(Id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
  return null
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()

    if (!tasks) {
      return res.status(404).send({ error: 'no task found' })
    }
    res.send(tasks)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/tasks/:id', async (req, res) => {
  const Id = req.params.id
  try {
    const task = await Task.findByIdAndDelete(Id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
  return null
})

router.put('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates' })
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
  return null
})

export default router
