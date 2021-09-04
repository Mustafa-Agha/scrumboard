import { lazy } from 'react';

const routes: any[] = [
  { path: '/home', name: 'Home', component: lazy(() => import('pages/Home')) },
];

export default routes;
