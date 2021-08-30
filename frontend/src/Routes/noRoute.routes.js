import NoRoute from '../Components/NoRoute';

const noRoute = [
  {
    path: '/*',
    exact: false,
    isProtected: false,
    component: NoRoute,
  },
];

export default noRoute;
