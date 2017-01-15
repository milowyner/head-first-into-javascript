window.onload = function() {
  var workers = [];
  for (var i = 0; i < 3; i++) {
    var worker = new Worker("worker.js");
    worker.onmessage = function(event) {
      alert(event.target + " says " + event.data);

    };
    workers.push(worker);
  }
  for (var i = 0; i < workers.length; i++) {
    workers[i].postMessage("ping");
  }
}
