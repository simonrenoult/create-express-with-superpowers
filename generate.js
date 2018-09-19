#!/usr/bin/env node

const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

main()
  .then(projectLocation => {
    console.log(
      `> All good, your superpowers are available in directory "${projectLocation}"`
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
  const args = process.argv.slice(2);
  return args[0] || "express-with-superpowers";
}

async function cloneTemplate(projectLocation) {
  console.log("> Getting superpowers...");
  const cmd = `git clone git@github.com:simonrenoult/express-with-superpowers.git ${projectLocation}`;
  await execAsync(cmd);
  console.log("> Done!");
}

async function cleanUp(projectLocation) {
  const commands = [
    `cd ${projectLocation}`,
    "rm -rf .git",
    "git init",
    "git add --all",
    "git commit --message='Initial commit'"
  ];
  await execAsync(commands.join(" && "));
}
