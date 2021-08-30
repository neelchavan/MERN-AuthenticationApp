import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'authenticationtoken')
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please Authenticate' })
  }
}

export default auth
