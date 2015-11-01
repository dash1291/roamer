var Roamer = (function() {
  var _bindings;
  var serviceWorker;

  return {
    bind: bind,
    init: init
  };

  function sendMessage(message) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(event) {
      console.log(event);
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    serviceWorker.postMessage(message, [messageChannel.port2]);
  }

  // this would be passed to ServiceWorker using an API call
  function init(callback) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/roamersw.js', {scope: '/'})
      .then(function(reg) {
        serviceWorker = reg.active;
        callback();
      })
      .catch(function(err) {
        // registration failed :(
        callback(err);
      });
    }
  }


  function bind(bindings, finishCallback) {
    console.log('putting bindings');
    if (typeof(bindings) != 'object') {
      throw TypeError("Bindings passed to init need to be of object type.");
    }

    sendMessage({
      command: 'bind',
      payload: bindings
    });
  }
})();
