self.getPath = function(url) {
  if (url.slice(-1) != '/') {
    url += '/';
  }

  var regex = /(http[s]?:\/\/)([^/]+)(.*)/g;
  urlParts = regex.exec(url);
  console.log(urlParts);
  return urlParts[3];
}

self.processRequest = function(path) {
  var path = self.getPath(path);
  var binding = self._bindings[path];

  if (!binding) {
    return null;
  } else if (typeof(binding) === 'object') {
    return JSON.stringify(binding);
  } else {
    return binding;
  }
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'bind') {
    self._bindings = event.data.payload;
    console.log(self._bindings);
  }
});

self.addEventListener('fetch', function(event) {
  console.log('Got a request');
  var request = event.request;
  event.respondWith(new Response(self.processRequest(request.url)));
});
