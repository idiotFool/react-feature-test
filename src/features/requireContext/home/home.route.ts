export default {
  component: () => import('./Home'),
  path: '/home',
  exact: true,
  // children: [{
  //   component: () => import('./Home.bajie'),
  //   path: '/bajie',
  // }, {
  //   component: () => import('./Home.wukong'),
  //   path: '/wukong',
  // }]
  childComponent: () => import('./Home.monster'),
  defaultChildPath: '/home/wukong'
};