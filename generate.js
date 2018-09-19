#!/usr/bin/env node

const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);
const DEFAULT_PROJECT_NAME = "express-with-superpowers";

main()
  .then(projectLocation => {
    log(`All good, your superpowers are available in "${projectLocation}"`);
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
  const CUSTOM_ARGS_START_INDEX = 2;
  const [projectLocation] = process.argv.slice(CUSTOM_ARGS_START_INDEX);
  return projectLocation || DEFAULT_PROJECT_NAME;
}

async function cloneTemplate(projectLocation) {
  log("Getting superpowers...");
  const cmd = `git clone git@github.com:simonrenoult/express-with-superpowers.git ${projectLocation}`;
  await execAsync(cmd);
  log("Done!");
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

function log(stuff) {
  // eslint-disable-next-line no-console
  console.log(`> ${stuff}`);
}
