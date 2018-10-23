importScripts('node_modules/sw-toolbox/sw-toolbox.js');


toolbox.precache([
  '/',
  '/index.html',
  '/images/profile@x1.jpg',
  '/images/profile@x2.jpg',
  '/images/webshareapi.png',
  '/images/paymentrequestapi.png',
  '/images/lanaro.jpg',
]);


toolbox.router.get('/', toolbox.fastest);
toolbox.router.get('/index.html', toolbox.fastest);
toolbox.router.get('/images/profile@x1.jpg', toolbox.fastest);
toolbox.router.get('/images/profile@x2.jpg', toolbox.fastest);
toolbox.router.get('/images/webshareapi.png', toolbox.fastest);
toolbox.router.get('/images/paymentrequestapi.png', toolbox.fastest);
toolbox.router.get('/images/lanaro.jpg', toolbox.fastest);
