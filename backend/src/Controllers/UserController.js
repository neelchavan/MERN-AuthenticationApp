import User from '../models/User.js'

class UserController {
  // Crate Users
  static async createUser(req, res) {
    const user = new User(req.body)
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  // Login User
  static async loginUser(req, res) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      )
      const token = await user.generateAuthToken()
      res.send({ user, token })
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  // Logout User
  static async logoutUser(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })

      await req.user.save()
      res.send('Logged out')
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  // Read Profile
  static readProfile(req, res) {
    const { user } = req
    res.send(user)
  }

  // Update a user
  static async updateUser(req, res) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!isValidUpdates) {
      return res.status(400).send({ error: 'Ivalid Update' })
    }

    try {
      // eslint-disable-next-line no-return-assign
      updates.forEach((update) => (req.user[update] = req.body[update]))
      await req.user.save()

      res.send(req.user)
    } catch (e) {
      res.status(400).send(e)
    }
    return null
  }

  // Delete a user
  static async deleteUser(req, res) {
    try {
      await req.user.remove()
      res.send(req.user)
    } catch (e) {
      res.status(500).send()
    }
  }

  // Get profile pic
  static async getProfilePic(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user || !user.avatar) {
        throw new Error()
      }

      res.set('Content-Type', 'image/png')
      res.send(user.avatar)
    } catch (e) {
      res.status(404).send()
    }
  }

  // Delete ProfilePic
  static async deleteProfilePic(req, res) {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  }
}

export default UserController
