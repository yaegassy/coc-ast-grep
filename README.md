# [WIP] coc-ast-grep

> fork from a [ast-grep-vscode](https://github.com/ast-grep/ast-grep-vscode)

[coc.nvim](https://github.com/neoclide/coc.nvim) extension for [ast-grep](https://github.com/ast-grep/ast-grep) language server

<img width="780" alt="coc-ast-grep-screenshot" src="https://user-images.githubusercontent.com/188642/201776507-fc061532-6ef7-4368-9e03-1d50fe5107aa.png">

## Install

You need to have [coc.nvim](https://github.com/neoclide/coc.nvim) installed for this extension to work.

**e.g. vim-plug**:

```vim
Plug 'yaegassy/coc-ast-grep', {'do': 'yarn install --frozen-lockfile'}
```

## Usage

The ast-grep language server requires `sgconfig.yml` in the project root to work properly.

- See: <https://ast-grep.github.io/guide/rule-config.html>

### !!Known Issues!!

The language client will crash if `sgconfig.yml` is not in the project root or if the rules are not properly configured.

I think it needs to be adjusted either on the ast-grep language server (`sg lsp`) side or on the `coc.nvim` side.

## !!Note!!

Currently the extension is only enabled in `typescript` files.

```
{
  // ...snip
  "activationEvents": [
    "onLanguage:typescript"
  ],
  // ...snip
}
```

## Configuration options

- `astGrep.enable`: Enable coc-ast-grep extension, default: `true`
- `astGrep.serverPath`: Specify the language server binary path. If the binary is not found, use the binary included in the extension, default: `sg`
- `astGrep.configPath`: Customize ast-grep config file path relative.

## To register a ast-grep language server without coc-extension

Add the following settings to `coc-settings.json`.

```json
{
  "languageserver": {
    "ast-grep": {
      "command": "sg",
      "args": ["lsp"],
      "filetypes": ["typescript"],
      "rootPatterns": [
        "sgconfig.yml"
      ]
    }
  }
}
```

## Thanks

- [ast-grep](https://github.com/ast-grep/ast-grep)
- [ast-grep-vscode](https://github.com/ast-grep/ast-grep-vscode)

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
