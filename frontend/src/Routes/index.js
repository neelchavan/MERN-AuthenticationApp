import loginRoute from './login.routes';
import noRoute from './noRoute.routes';
import dashboardRoute from './dashboard.routes';
import registerRoute from './register.routes';

export default [...loginRoute, ...registerRoute, ...dashboardRoute, ...noRoute];
