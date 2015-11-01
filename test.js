Roamer.init(function(err) {
  if (err) {
    console.log('Could not initialize roamer.');
    console.log(err);
    return;
  }

  console.log('done');

  Roamer.bind({
    '/': 'this is hope page',

    '/url1/': 'this is url 1',

    '/info/': {
      firstName: 'Ashish',
      lastName: 'Dubey'
    }
  });
});
