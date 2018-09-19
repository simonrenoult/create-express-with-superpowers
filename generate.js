#!/usr/bin/env node

const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);
const DEFAULT_PROJECT_NAME = "express-with-superpowers";

main()
  .then(projectLocation => {
    console.log(
      `> All good, your superpowers are available in "${projectLocation}"`
    );
  })
  .catch(err => {
    console.error("> An error occurred: ", err);
  });

async function main() {
  const projectLocation = getProjectLocation();

  await cloneTemplate(projectLocation);
  await cleanUp(projectLocation);

  return projectLocation;
}

function getProjectLocation() {
  const [projectLocation] = process.argv.slice(2);
  return projectLocation || DEFAULT_PROJECT_NAME;
}

async function cloneTemplate(projectLocation) {
  console.log("> Getting superpowers...");
  const cmd = `git clone git@github.com:simonrenoult/express-with-superpowers.git ${projectLocation}`;
  await execAsync(cmd);
  console.log("> Done!");
}

async function cleanUp(projectLocation) {
  const cmd = [
    `cd ${projectLocation}`,
    "rm -rf .git",
    "git init",
    "git add --all",
    "git commit --message='Initial commit'"
  ].join(" && ");
  await execAsync(cmd);
}
