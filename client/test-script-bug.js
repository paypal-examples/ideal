const style = {
  rules: {
    body: {
      background: "red"
    }
  }
};

const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

for (const [selector, rules] of Object.entries(style.rules)) {
  let themeStyles = document.createElement("style");
  // WebKit hack :(
  themeStyles.appendChild(document.createTextNode(""));
  document.head.appendChild(themeStyles);

  for (const [selector, rules] of Object.entries(style.rules)) {
    themeStyles.sheet.insertRule(
      `${selector} {
              ${Object.entries(rules)
                .map(([k, v]) => `${kebabCase(k)}:${v} !important;`)
                .join("")}
           }`,
           themeStyles.sheet.cssRules.length
    );
  }
}