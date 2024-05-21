import fs from "fs-extra";
import path from "path";
import prettier from "prettier";
import { convertThemeFromFilePath } from "vscode-theme-to-monaco-theme-node";

const format = async (content, parser) => {
  const options = {
    parser: parser,
    "printWidth": 120,
    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": false,
    "quoteProps": "preserve",
    "jsxSingleQuote": false,
    "trailingComma": "all",
    "bracketSpacing": true,
    "bracketSameLine": false,
    "arrowParens": "avoid",
    "proseWrap": "preserve",
    "htmlWhitespaceSensitivity": "css",
    "vueIndentScriptAndStyle": false,
    "endOfLine": "lf",
    "embeddedLanguageFormatting": "auto",
    "singleAttributePerLine": false,
  };
  return await prettier.format(content, options).then(formatted => formatted);
};

export const convert = async (input, output, base = "vs-dark", inherit = false) => {
  // vscode-theme.json to monaco-theme.json
  convertThemeFromFilePath(input, output);
  const json = await format(JSON.stringify({ ...JSON.parse(fs.readFileSync(output)), base, inherit }), "json");
  fs.writeFileSync(output, json);

  // generate .ts file
  let typescript = `import { editor } from "monaco-editor";\n\nexport const theme: editor.IStandaloneThemeData = ${json};\n\nexport default theme;`;
  typescript = await format(typescript, "typescript");
  fs.writeFileSync(output.replace(path.extname(output), ".ts"), typescript);
};
