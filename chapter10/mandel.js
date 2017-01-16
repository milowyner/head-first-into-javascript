var numberOfWorkers = 8;
var workers = [];
var nextRow = 0;
var generation = 0;

window.onload = init;

function init() {
  setupGraphics();

  for (var i = 0; i < numberOfWorkers; i++) {
    var worker = new Worker("worker.js");

    worker.onmessage = function() {
      processWork(event.target, event.data);
    }
    worker.idle = true;

    workers.push(worker);
  }
  startWorkers();
}

function startWorkers() {
  generation++;
  nextRow = 0;
  for (var i = 0; i < workers.length; i++) {
    var worker = workers[i];
    if (worker.idle) {
      var task = createTask(nextRow);
      worker.idle = false;
      worker.postMessage(task);
      nextRow++;
    }
  }
}
