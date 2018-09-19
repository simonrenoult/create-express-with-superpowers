#!/usr/bin/env node

const { execSync } = require("child_process");

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

  cloneTemplate(projectLocation);
  cleanUp(projectLocation);

  return projectLocation;
}

function getProjectLocation() {
  const CUSTOM_ARGS_START_INDEX = 2;
  const [projectLocation] = process.argv.slice(CUSTOM_ARGS_START_INDEX);
  return projectLocation || DEFAULT_PROJECT_NAME;
}

function cloneTemplate(projectLocation) {
  log("Getting superpowers...");
  const cmd = `git clone git@github.com:simonrenoult/express-with-superpowers.git ${projectLocation}`;
  execSync(cmd);
  log("Done!");
}

function cleanUp(projectLocation) {
  const cmd = [
    `cd ${projectLocation}`,
    "rm -rf .git",
    "git init",
    "git add --all",
    "git commit --message='Initial commit'"
  ].join(" && ");
  execSync(cmd);
}

function log(stuff) {
  // eslint-disable-next-line no-console
  console.log(`> ${stuff}`);
}
