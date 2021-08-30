/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import auth from '../middleware/auth.js'
import UserController from '../Controllers/UserController.js'
import User from '../models/User.js'

const router = new express.Router()

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a image'))
    }

    cb(undefined, true)
    return null
  },
})

// Create users
router.post('/users', UserController.createUser)

// Login user
router.post('/users/login', UserController.loginUser)

// Logout user
router.post('/users/logout', auth, UserController.logoutUser)

// Read Profile
router.get('/users/me', auth, UserController.readProfile)

// Update a user
router.patch('/users/me', auth, UserController.updateUser)

// upload profile picture
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 130, height: 130 })
      .png()
      .toBuffer()
    req.user.avatar = buffer
    await req.user.save()

    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

// Get Profile Picture
router.get('/users/:id/avatar', UserController.getProfilePic)

// Delete profile picture
router.delete('/users/me/avatar', auth, UserController.deleteProfilePic)

// Delete a user
router.delete('/users/me', auth, UserController.deleteUser)

// router.get('/users/me/avatar', auth, async (req, res) => {
//   try {
//     // const { user } = req
//     if (!req.user || !req.user.avatar) {
//       throw new Error()
//     }

//     res.set('Content-Type', 'image/png')
//     res.send(req.user.avatar)
//   } catch (e) {
//     res.status(401).send(e.message)
//   }
// })

export default router
