const chokidar = require("chokidar");
const { Observable } = require("rxjs");
const { buffer, debounceTime } = require("rxjs/operators");
const { spawn } = require("child_process");
const ora = require("ora");

const SPAWN_STATUS_OK = 0;
const SPAWN_STATUS_ERRIR = 1;

const runTscSync = (path) => {
  return new Promise((resolve, reject) => {
    const cmd = spawn("tsc", [], {
      cwd: path,
    });

    cmd.stderr.on("data", (data) => {
      reject(SPAWN_STATUS_ERRIR);
    });

    cmd.on("close", () => {
      resolve(SPAWN_STATUS_OK);
    });
  });
};

const runLinkSync = (path) => {
  return new Promise((resolve) => {
    const cmd = spawn("npm", ["link"], {
      cwd: path,
    });

    cmd.on("close", () => {
      resolve(SPAWN_STATUS_OK);
    });
  });
};

const watcher = new Observable((subscriber) => {
  chokidar.watch("./src").on("all", (event, path) => {
    subscriber.next({
      event,
      path,
    });
  });
});

const debounced = watcher.pipe(debounceTime(500));

const buffered = watcher.pipe(buffer(debounced));

buffered.subscribe(async (change) => {
  const spinner = ora("building with tsc").start();

  const runTsc = await runTscSync(__dirname);
  if (runTsc !== 0) {
    process.exit(1);
  }

  spinner.text = "npm linking";

  const runLink = await runLinkSync(__dirname);
  if (runLink !== 0) {
    process.exit(1);
  }
  spinner.stop();
});
