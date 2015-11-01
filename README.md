# roamer
This is a tiny experimental JS library which allows you to mock a simple web server within your JS code.

What that means is, whether you want to test your frontend code or create mockups, instead of creating a web server serving some dummy data, you can mock the web server within your frontend code.

## Usage
Include the `roamer.js` inside this repo into your HTML page

```html
<script src="/roamer.js"></script>
```

Somewhere inside your JS application, you can initialize roamer telling it which URLs to serve and with what.

Example -
```javascript
Roamer.init(function(err) {
  if (err) {
    console.log('Could not initialize roamer.');
    return;
  }

  Roamer.bind({
    '/url1/': 'this is hope page',
    '/url2/': {
      foo: 'bar',
      syn: "ack"
    }
  });
});
```

## API
### Roamer.bind(obj)
This is the method where you bind all the URLs you want roamer to serve and also tell it what to serve on which URL just like you'd define your dummy URL stubs on your web server.

The `obj` passed here, contains an object where the keys are for the URL and values are for the text or objects(JSON response?) you want to serve against the URL.
