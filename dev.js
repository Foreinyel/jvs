// const ts = require("gulp-typescript");
const chokidar = require("chokidar");
const { Observable } = require("rxjs");
const { buffer, debounceTime } = require("rxjs/operators");

// const project = ts.createProject("tsconfig.json");

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

buffered.subscribe((change) => {
  console.log(
    `🚀 ~ file: dev.js ~ line 26 ~ buffered.subscribe ~ change`,
    change
  );

  // console.log(project.options.outDir);

  // project.src().pipe(project()).js.pipe(project.options.outDir);
});
