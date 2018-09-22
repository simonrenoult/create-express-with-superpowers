#!/usr/bin/env node

const { execSync } = require("child_process");
const { existsSync, readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { parseArgs } = require("./cli");

const CUSTOM_ARGS_START_INDEX = 2;
const TEMPLATE_REPOSITORY = "simonrenoult/express-with-superpowers";

const program = parseArgs(process.argv);

if (noArgumentsProvided(process.argv)) {
  program.outputHelp();
  process.exit(0);
}

if (existsSync(program.projectLocation)) {
  console.error(`> The directory "${program.projectLocation}" already exists!`);
  process.exit(1);
}

generateNewProject(program)
  .then(() => {
    log(
      `All good, your superpowers are available in "${program.projectLocation}"`
    );
  })
  .catch(err => {
    console.error("> An error occurred: ", err);
  });

async function generateNewProject(newProjectData) {
  pullRemoteTemplate(newProjectData.projectLocation);
  customizeTemplate(
    newProjectData.projectLocation,
    newProjectData.author,
    newProjectData.description,
    newProjectData.keywords
  );
  finalize(newProjectData.projectLocation);
}

function pullRemoteTemplate(projectLocation) {
  log("Getting superpowers...");

  const cmd = `git clone git@github.com:${TEMPLATE_REPOSITORY}.git ${projectLocation}`;
  execSync(cmd);

  log("Done!");
}

function customizeTemplate(projectLocation, author, description, keywords) {
  log("Putting cape on...");

  const projectAuthor = author || getAuthor();
  customizePackageJson(projectLocation, projectAuthor, description, keywords);
  replaceReadme(projectLocation, projectAuthor, description);
  updateLicense(projectLocation, projectAuthor);

  log("Done!");
}

function getAuthor() {
  const options = { encoding: "utf8" };
  const authorName = execSync("git config user.name", options).trim();
  const authorEmail = execSync("git config user.email", options).trim();
  return `${authorName} <${authorEmail}>`;
}

function customizePackageJson(projectLocation, author, description, keywords) {
  const FILE_NAME = "package.json";
  const pathToFile = resolve(projectLocation, FILE_NAME);
  const rawPkg = readFileSync(pathToFile, "utf8");
  const pkgJsonToEdit = JSON.parse(rawPkg);

  const [projectName] = projectLocation.split("/").slice(-1);
  const newPkgJson = {
    ...pkgJsonToEdit,
    name: projectName,
    version: "0.0.1",
    description: description || "",
    author,
    keywords: keywords || []
  };

  writeFileSync(pathToFile, JSON.stringify(newPkgJson, null, "  "), "utf8");
}

function replaceReadme(projectLocation, author, description) {
  const FILE_NAME = "readme.md";
  const pathToFile = resolve(projectLocation, FILE_NAME);

  execSync(`rm ${pathToFile}`, "utf8");

  const [projectName] = projectLocation.split("/").slice(-1);
  const newReadme = [
    [`# ${projectName}`, `> ${description}`].join("\n"),
    ["## Usage", "```", "$ npm start", "```"].join("\n"),
    ["## Created by", author].join("\n"),
    ["## License", "See license.txt"].join("\n")
  ].join("\n\n");

  writeFileSync(pathToFile, newReadme, "utf8");
}

function updateLicense(projectLocation, author) {
  const FILE_NAME = "license.txt";
  const DEFAULT_AUTHOR_IN_LICENSE = "Simon Renoult";
  const pathToFile = resolve(projectLocation, FILE_NAME);

  const currentLicense = readFileSync(pathToFile, "utf8");
  const newLicense = currentLicense.replace(DEFAULT_AUTHOR_IN_LICENSE, author);

  writeFileSync(pathToFile, newLicense, "utf8");
}

function finalize(projectLocation) {
  const cmd1 = [`cd ${projectLocation}`, "npm install"].join(" && ");
  execSync(cmd1);

  const cmd2 = [
    `cd ${projectLocation}`,
    "rm -rf .git",
    "git init",
    "git add --all",
    "git commit --message='Initial commit'"
  ].join(" && ");
  execSync(cmd2);
}

function log(stuff) {
  // eslint-disable-next-line no-console
  console.log(`> ${stuff}`);
}

function noArgumentsProvided(args) {
  return args.slice(CUSTOM_ARGS_START_INDEX).length === 0;
}
