import Login from '../Components/Login';

const loginRoute = [
  {
    path: '/',
    exact: true,
    isProtected: false,
    component: Login,
  },
];

export default loginRoute;
