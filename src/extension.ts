import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider(
    { pattern: "**" }, // all file types
    { provideCompletionItems },
  );
  context.subscriptions.push(provider);
}

function provideCompletionItems(
  _doc: vscode.TextDocument,
  _pos: vscode.Position,
  _tkn: vscode.CancellationToken,
  _ctx: vscode.CompletionContext,
) {
  const snippetCompletion = new vscode.CompletionItem("myemail");
  snippetCompletion.insertText = new vscode.SnippetString(
    "myemail@example.com${0}",
  );
  snippetCompletion.documentation = "insert my email address";

  return [snippetCompletion];
}

export function deactivate() {}
