#!/usr/bin/env node

const fs = require("fs");

const rootHostsFile = "/etc/hosts";

try {
  const localHostsFileData = fs.readFileSync("Hostsfile", "utf-8");

  fs.appendFileSync(rootHostsFile, localHostsFileData, "utf-8");
  console.log(
    `The following has been patched onto /etc/hosts:\n\n${localHostsFileData}\n\nUse ctrl-C to exit and remove the patch.`
  );

  process.stdin.resume();

  process.on("SIGINT", function() {
    const hostsData = fs.readFileSync(rootHostsFile, "utf-8");
    const newValue = hostsData.replace(localHostsFileData, "");
    fs.writeFileSync(rootHostsFile, newValue, "utf-8");

    console.log("Restored hosts file ✅");

    process.exit(0);
  });
} catch (e) {
  if (e.code === "ENOENT") {
    console.log(
      "To use emcee, add a file, Hostsfile, with the entries you'd like to patch to /etc/hosts."
    );
  } else if (e.code === "EACCES") {
    console.log("Insufficient access. Please run emcee as root.");
  } else {
    console.error("Error attempting to patch hosts file: ", e);
  }
}
