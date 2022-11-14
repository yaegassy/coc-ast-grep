# [WIP] coc-ast-grep

> fork from a [ast-grep-vscode](https://github.com/ast-grep/ast-grep-vscode)

[coc.nvim](https://github.com/neoclide/coc.nvim) extension for [ast-grep](https://github.com/ast-grep/ast-grep) language server

## Install

You need to have [coc.nvim](https://github.com/neoclide/coc.nvim) installed for this extension to work.

**e.g. vim-plug**:

```vim
Plug 'yaegassy/coc-ast-grep', {'do': 'yarn install --frozen-lockfile'}
```

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

## Usage

The ast-grep language server requires `sgconfig.yml` in the project root to work properly.

- See: <https://ast-grep.github.io/guide/rule-config.html>

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
