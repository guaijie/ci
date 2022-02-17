self.addEventListener('install', () => {
  // if (process.env.NODE_ENV === 'development') {
  //   self.skipWaiting();
  // }
  // self.skipWaiting();
  console.log('install');
});
self.addEventListener('active', () => {
  console.log('active');
});
