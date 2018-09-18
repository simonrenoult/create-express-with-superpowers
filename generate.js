#!/usr/bin/env node
const { exec } = require("child_process");

const [projectLocation] = process.argv.slice(2);

exec(
  `git clone git@github.com:simonrenoult/express-with-superpowers.git ${projectLocation}`,
  (err, stdout, stderr) => {
    if (err) stop(err);
    if (stderr) stop(err);
    if (stdout) console.log(stdout);
  }
);

function stop(err) {
  console.error(err);
  process.exit(1);
}
console.log(projectLocation);
/*
const pkg = require("./package");

let projectName;
program
  .version(pkg.version)
  .arguments("<name>")
  .action(name => {
    projectName = name;
  })
  .parse(process.argv);

console.log(projectName);
git clone git@github.com:simonrenoult/express-with-superpowers.git
cd ./foobar
rm -rf .git
git init && git add --all && git commit --message="Initial commit"
*/
