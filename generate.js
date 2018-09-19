#!/usr/bin/env node

const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

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
  customize(projectLocation);
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

function customize(projectLocation) {
  log("Putting cape on...");

  const author = getAuthor();
  customizePackageJson(projectLocation, author);
  replaceReadme(projectLocation, author);
  updateLicense(projectLocation, author);

  log("Done!");
}

function getAuthor() {
  const options = { encoding: "utf8" };
  const authorName = execSync("git config user.name", options).trim();
  const authorEmail = execSync("git config user.email", options).trim();
  return `${authorName} <${authorEmail}>`;
}

function customizePackageJson(projectLocation, author) {
  const rawPkg = readFileSync(`${projectLocation}/package.json`, "utf8");
  const pkg = JSON.parse(rawPkg);

  const [projectName] = projectLocation.split("/").slice(-1);
  const newPkg = {
    ...pkg,
    name: projectName,
    version: "0.0.1",
    description: "",
    author,
    keywords: []
  };

  writeFileSync(
    `${projectLocation}/package.json`,
    JSON.stringify(newPkg, null, "  "),
    "utf8"
  );
}

function replaceReadme(projectLocation, author) {
  execSync(`rm ${projectLocation}/readme.md`, "utf8");

  const [projectName] = projectLocation.split("/").slice(-1);
  const newReadme = [
    [`# ${projectName}`, "> ..."].join("\n"),
    ["## Usage", "```", "$ npm start", "```"].join("\n"),
    ["## Created by", author].join("\n"),
    ["## License", "See license.txt"].join("\n")
  ].join("\n\n");

  writeFileSync(`${projectLocation}/readme.md`, newReadme, "utf8");
}

function updateLicense(projectLocation, author) {
  const license = readFileSync(`${projectLocation}/license.txt`, "utf8");
  const newLicense = license.replace("Simon Renoult", author);
  writeFileSync(`${projectLocation}/license.txt`, newLicense, "utf8");
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
