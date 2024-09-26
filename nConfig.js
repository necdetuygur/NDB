#!/usr/bin/env node

// #region nConfig
const args = process.argv.slice(2);
const NCONFIG = (databaseName) => {
  const fs = require("fs");
  const path = require("path");
  const os = require("os");
  const homeDir = os.homedir();
  const configDir = path.join(homeDir, ".config");
  const filePath = path.join(configDir, databaseName + ".json");
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({ createdAt: new Date() }, null, 2),
    );
  }

  let config = {};
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    config = JSON.parse(fileContent);
  }

  const proxy = new Proxy(config, {
    set(obj, prop, value) {
      obj[prop] = value;
      fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
      return value;
    },
    get(obj, prop) {
      return obj[prop];
    },
  });

  return proxy;
};
const nConfig = NCONFIG("app1");
switch (args[0]) {
  case "set":
    nConfig[args[1]] = args[2];
    break;
}
// #endregion nConfig
