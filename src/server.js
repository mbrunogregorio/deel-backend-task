const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const app = require('./app');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs is ${totalCPUs}`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  init();
}

async function init() {
  try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
