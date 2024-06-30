import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('activated!');

	const disposable = vscode.commands.registerCommand('local-user-snippets.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
