import Dashboard from '../Components/Dashboard';

const dashboardRoute = [
  {
    path: '/dashboard',
    exact: true,
    isProtected: true,
    component: Dashboard,
  },
];

export default dashboardRoute;
