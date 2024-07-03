import * as vscode from "vscode";

type EnvVal = {
  name: string;
  value: string;
};

export function activate(context: vscode.ExtensionContext) {
  const prefix = vscode.workspace
    .getConfiguration()
    .get("environmentSnippet.prefix");

  if (typeof prefix !== "string") {
    // TODO error message
    return;
  }

  const envs: EnvVal[] = Object.entries(process.env)
    .filter(([k, _]) => {
      if (prefix === "") {
        return true; // accept all environment variables
      }
      return k.startsWith(prefix);
    })
    .map(([k, v]) => {
      return { name: k, value: v || "" };
    })
    .filter((e) => e.value !== "");

  const provider = vscode.languages.registerCompletionItemProvider(
    { pattern: "**" }, // all file types
    {
      provideCompletionItems: () => {
        const completions = envs.map((e) => {
          const snippetCompletion = new vscode.CompletionItem(e.name);
          snippetCompletion.insertText = new vscode.SnippetString(e.value);
          snippetCompletion.documentation = e.value;
          return snippetCompletion;
        });
        return completions;
      },
    },
  );
  context.subscriptions.push(provider);
}

export function deactivate() {}
