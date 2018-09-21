const { Command } = require("commander");
const packageJson = require("./package");

const DEFAULT_PROJECT_NAME = "express-with-superpowers";

module.exports = { parseArgs };

function parseArgs(args) {
  let projectLocation = "";

  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments("<project-location>")
    .action(projectLocationArg => {
      projectLocation = projectLocationArg || DEFAULT_PROJECT_NAME;
    })
    .option("-D, --description [description]", "Add a description")
    .option("-A, --author [author]", "Add an author")
    .option(
      "-K, --keywords <keywords>",
      "A list of keywords (ex: foo,bar,baz)",
      parseKeyworkds
    )
    .parse(args);

  program.projectLocation = projectLocation;

  return program;

  function parseKeyworkds(keywords) {
    return keywords.split(",");
  }
}
