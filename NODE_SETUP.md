# Install Node.js

This project needs **Node.js 22.12 or newer**. Choose a current **LTS (Long-Term Support)** release. Node.js includes **npm**, the tool used to install this app's dependencies and run it.

## macOS

1. Open [the official Node.js download page](https://nodejs.org/en/download).
2. Select the **LTS** release and download the **macOS installer (`.pkg`)**.
   - For an Apple Silicon Mac (M1, M2, M3, etc.), choose **ARM64** if asked.
   - For an Intel Mac, choose **x64**.
   - You can check your Mac's chip under **Apple menu → About This Mac**.
3. Open the downloaded `.pkg` file and follow the installation prompts.
4. Close and reopen Terminal. If you use the terminal inside an editor, restart the editor too.
5. Check the installation:

   ```sh
   node --version
   npm --version
   ```

   Both commands should print version numbers. The Node version should be at least `v22.12.0`; npm has its own, different version number.

### Alternative: Homebrew

If you **already use Homebrew**, you can install Node through it instead of using the installer:

```sh
brew install node@24
```

Follow Homebrew's printed instructions for adding Node to your `PATH`, then reopen Terminal and check the versions as above. You only need **one** installation method.

## Windows

1. Open [the official Node.js download page](https://nodejs.org/en/download).
2. Download the **LTS Windows installer (`.msi`)** for your computer.
3. Run the installer with the default options, including npm and adding Node to `PATH`.
4. Reopen PowerShell or your editor, then run `node --version` and `npm --version`.

## Linux

Use the [official Node.js download page](https://nodejs.org/en/download) and follow its Linux instructions for an LTS release. Distribution package repositories sometimes contain older Node versions, so check `node --version` afterwards. This project requires at least `v22.12.0`.

## Start this app

Open a terminal in the project folder. On this Mac, you can use:

```sh
cd /Users/arod/Desktop/mock-interview
npm ci
npm run dev
```

If you copied the project elsewhere, use that folder's path instead.

Open the local URL printed in the terminal, normally **http://127.0.0.1:5173**. Keep the terminal running while using the app. Press **Ctrl+C** to stop it.

Run `npm ci` on first setup or after the project's dependencies change. Normally, subsequent sessions only need `npm run dev`.

## Troubleshooting

- **`node` or `npm`: command not found / not recognized:** reopen your terminal or editor after installation. If it still fails, check that you completed the installer or Homebrew's `PATH` instructions.
- **Node version is too old:** install a current LTS version and reopen the terminal. On macOS/Linux, `which node` shows which installation your shell is using; on Windows, use `where.exe node`.
- **`package.json` cannot be found:** make sure your terminal is in the project folder before running npm commands.
- **PowerShell blocks `npm.ps1`:** use `npm.cmd ci` and `npm.cmd run dev`, or run the normal commands in Command Prompt. You do not need to relax your system's script-execution policy.
- **Permission errors:** don't run `sudo npm ci`. Check that you are working in a folder your user owns.
