import { editor } from "monaco-editor";

// light themes
import atomLight from "./themes/light/atom";
import githubLight from "./themes/light/github";
import materialLight from "./themes/light/material";

// dark themes
import atomDark from "./themes/dark/atom";
import darcula from "./themes/dark/darcula";
import githubDark from "./themes/dark/github";
import material from "./themes/dark/material";
import monokaiPro from "./themes/dark/monokai-pro";
import oneDarkPro from "./themes/dark/one-dark-pro";

namespace Themes {
  export const register = (name: string, theme: editor.IStandaloneThemeData) => editor.defineTheme(name, theme);

  export const themes = {
    light: {
      "atom": atomLight,
      "github": githubLight,
      "material": materialLight,
    },
    dark: {
      "github": githubDark,
      "one-dark-pro": oneDarkPro,
    },
  };
}

export default Themes;
