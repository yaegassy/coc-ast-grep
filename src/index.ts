import {
  Executable,
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  window,
  workspace,
} from 'coc.nvim';

import fs from 'fs';
import path from 'path';
import which from 'which';

let client: LanguageClient;
const diagnosticCollectionName = 'ast-grep-diagnostics';
const outputChannelName = 'ast-grep';
const languageClientId = 'ast-grep-client';
const languageClientName = 'ast-grep language client';

function getExecutable(isDebug: boolean, context: ExtensionContext): Executable {
  let command: string;
  const astGrepServerPath = workspace.getConfiguration('astGrep').get('serverPath', 'sg');

  if (which.sync(astGrepServerPath, { nothrow: true }) || fs.existsSync(astGrepServerPath)) {
    command = astGrepServerPath;
  } else {
    command = path.join(context.extensionPath, 'node_modules', '@ast-grep', 'cli', 'sg');
  }

  return {
    command,
    args: ['lsp'],
    options: {
      env: {
        ...process.env,
        ...(isDebug ? { RUST_LOG: 'debug' } : {}),
      },
      // shell is required for Windows cmd to pick up global npm binary
      shell: true,
    },
  };
}

function activateLsp(context: ExtensionContext) {
  const serverOptions: ServerOptions = {
    run: getExecutable(false, context),
    debug: getExecutable(true, context),
  };

  const clientOptions: LanguageClientOptions = {
    diagnosticCollectionName,
    documentSelector: [{ scheme: 'file', language: '*' }],
    outputChannel: window.createOutputChannel(outputChannelName),
  };

  client = new LanguageClient(languageClientId, languageClientName, serverOptions, clientOptions);

  client.start();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function activate(context: ExtensionContext): Promise<void> {
  if (!workspace.getConfiguration('astGrep').get('enable', true)) return;

  workspace.onDidChangeConfiguration((changeEvent) => {
    if (changeEvent.affectsConfiguration('astGrep')) {
      deactivate();
      activateLsp(context);
    }
  });

  activateLsp(context);
}

export function deactivate(): Promise<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
