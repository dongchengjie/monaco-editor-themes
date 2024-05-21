import chalk from "chalk";
import fs from "fs-extra";
import path, { format } from "path";
import { convert } from "./convert.mjs";
import { exec } from "child_process";

(async () => {
  const vscodeThemes = "vscode";
  const monacoThemes = "themes";

  // retrieve all vscode themes
  const themes = fs
    .readdirSync(vscodeThemes, { recursive: true })
    .filter(file => fs.statSync(path.join(vscodeThemes, file)).isFile());

  // convert to monaco themes
  themes.forEach(theme => {
    const base = theme.startsWith("dark") ? "vs-dark" : "vs";
    console.log(`🔄 Converting theme: ${chalk.yellow(path.join(vscodeThemes, theme))}`);
    convert(path.join(vscodeThemes, theme), path.join(monacoThemes, theme), base, false);
    console.log(`✅ Theme converted: ${chalk.green(path.join(monacoThemes, theme))}`);
  });

  // generate .js files and d.ts files
  let result = await new Promise(resolve => {
    exec("tsc --showConfig", (_, stdout) => {
      console.log(`🛠️  Compiling via typescript with config: \n${chalk.green(stdout.trim())}`);
      exec("tsc --version", (_, stdout) => {
        console.log(`🔧 Typescript ${chalk.green(stdout.trim())}`);
        exec("tsc", (error, stdout) =>
          resolve({
            flag: !error,
            message: !error ? `✅ Compilation completed` : `${chalk.red(error.message + " " + stdout)}`,
          }),
        );
      });
    });
  });
  if (result.flag) {
    console.log(result.message);
  } else {
    throw new Error(result.message);
  }

  // prettier
  await new Promise(resolve => {
    exec("npx prettier --config .prettierrc --write --log-level debug --ignore-patt none themes", () => {
      console.log(`🎨 Beautification completed`);
      resolve();
    });
  });
})();
