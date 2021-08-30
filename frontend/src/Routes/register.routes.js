import RegisterForm from '../Components/RegisterForm';

const registerRoute = [
  {
    path: '/register',
    exact: false,
    isProtected: false,
    component: RegisterForm,
  },
];

export default registerRoute;
