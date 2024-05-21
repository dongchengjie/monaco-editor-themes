import { editor } from "monaco-editor";

// light themes
import github from "./themes/light/github";

// dark themes
import githubDark from "./themes/dark/github";
import oneDarkPro from "./themes/dark/one-dark-pro";

namespace Themes {
  export const register = (name: string, theme: editor.IStandaloneThemeData) => editor.defineTheme(name, theme);

  export const themes = {
    light: {
      "github": github,
    },
    dark: {
      "github": githubDark,
      "one-dark-pro": oneDarkPro,
    },
  };
}

export default Themes;
