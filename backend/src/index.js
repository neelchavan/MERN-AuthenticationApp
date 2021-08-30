import ExpressSetup from '../ExpressSetup.js'

const expressServer = new ExpressSetup()

ExpressSetup.connectDatabase()

expressServer.setMiddlewares()

expressServer.hello()

expressServer.listenServer()
