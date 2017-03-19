self.getPath = function(url) {
  if (url.slice(-1) != '/') {
    url += '/';
  }

  var regex = /(http[s]?:\/\/)([^/]+)(.*)/g;
  urlParts = regex.exec(url);
  console.log(urlParts);
  return urlParts[3];
}

self.processRequest = function(path, method) {
  var path = self.getPath(path);

  if (method !== 'GET') {
    path = method + ' ' + path;
  }

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
  var request = event.request;
  console.log('Got a request', request);

  var localResponse = self.processRequest(request.url, request.method);
  if (localResponse) {
    event.respondWith(new Response(localResponse));
  } else {
    event.respondWith(fetch(event.request.clone()));
  }
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});
