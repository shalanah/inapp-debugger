# Inapp Debugger

Test common in-app issues

[InAppDebugger.com](https://inappdebugger.com)

### Features

- ✅ View console
- ✅ View OS/Browser
- ✅ View user agent
- ✅ View in-app detection
- ✅ Test in-app downloads (on-the-fly and static assets)
- ✅ Test in-app escape links (Android + iOS)

## Running

- `nvm install` / `nvm use`
- `yarn install`
- `yarn run dev`

## Deploying to GitHub Pages

- `yarn run deploy`

# Results from Mobile App Tests Using inappdebugger.com

## Android

While many social media sites fail to download assets properly, on Android you can use the intent link reliably to escape except for WeChat + TikTok.

- ❌ 🔇 - Fails to download file without any indication to user (silent)
- ❌ 📝 - Fails but provides a note
- ❌ 🖼️ - Opens image in browser but doesn't download or provide feedback on how to download
- Intent link escape (opens link in default browser instead of in-app) - `intent://example.com#Intent;scheme=https;end`
- Last updated: Oct 16, 2024

| App (Android)     | Default browser / Tab View | Detect In-app  | Blob Url download | Static asset download | Intent link escape |
| ----------------- | -------------------------- | -------------- | ----------------- | --------------------- | ------------------ |
| WeChat            | ❌                         | ✅             | ❌ 📝             | ❌ 📝                 | ❌ does not work   |
| Telegram          | ❌                         | ❌ in progress | ❌ 📝             | ✅                    | ✅                 |
| Line              | ❌                         | ✅             | ❌ 📝             | ❌ Fails to load      | ✅                 |
| TikTok            | ❌                         | ✅             | ❌ 🔇             | ❌ 🔇                 | ❌ not dependable  |
| Threads           | ❌                         | ✅             | ❌ 📝             | ❌ 🖼️                 | ✅                 |
| Facebook          | ❌                         | ✅             | ❌ 📝             | ❌ 🖼️                 | ✅                 |
| Instagram         | ❌                         | ✅             | ❌ 📝             | ❌ 🖼️                 | ✅                 |
| Messenger         | ❌                         | ✅             | ❌ 📝             | ❌ 🖼️                 | ✅                 |
| SnapChat          | ✅                         | NA             | NA                | NA                    | NA                 |
| LinkedIn          | ✅                         | NA             | NA                | NA                    | NA                 |
| Twitter           | ✅                         | NA             | NA                | NA                    | NA                 |
| Gmail             | ✅                         | NA             | NA                | NA                    | NA                 |
| YouTube           | ✅                         | NA             | NA                | NA                    | NA                 |
| Google Search App | ✅                         | NA             | NA                | NA                    | NA                 |
| GroupMe           | ✅                         | NA             | NA                | NA                    | NA                 |

### iOS

🚧 Area needs updating
There are some escape methods available especially to Safari - use [inappdebugger.com](https://inappdebugger.com) to test out methods

=======

There is no reliable way to exit in-app browsers on iOS. **And even when a user is prompted to select a browser to open a given link from an app, Safari in the pared down SFSafariViewController provides a uniquely bad downloading experience.** The user is shown the file details via text but one must click on "More..." then scroll below the fold to "Save to image" to download the file. This bizarre behavior is captured on the first row of the table below.

- SFSVC - SFSafariViewController
- ❌ 🔇 - Fails to download file without any indication to user.
- ❌ 📝 - Fails but provides a note
- ❌ 🖼️ - Opens image in browser but doesn't download or provide feedback on how to download
- ❌ 🤮 - SFSVC - You can download in this view after clicking "More...", scroll, click "Save image" or file. Unnecessarily convoluted UX compared to Safari.

- Safari search link - `x-web-search://?site:example.com`
- Browser app link - In example Chrome: `googlechromes://example.com`
- Last updated: Feb 7, 2024

| App (iPhone)      | Uses default browser | Detect In-app                          | Blob Url download           | Static asset download       | Safari search link  | Browser app link    |
| ----------------- | -------------------- | -------------------------------------- | --------------------------- | --------------------------- | ------------------- | ------------------- |
| SFSVC Overview    | ❌ SFSVC             | ❌                                     | ❌ 🤮                       | ❌ 🤮                       | ❌                  | ✅                  |
| TikTok            | ❌                   | ✅                                     | ❌ 📝                       | ❌ 📝                       | ✅                  | ❌                  |
| Threads           | ❌ SFSVC             | ❌                                     | ❌ 🤮                       | ❌ 🤮                       | ❌                  | ✅                  |
| Facebook          | ❌                   | ✅                                     | ❌ 📝                       | ❌ 📝                       | ✅                  | ✅                  |
| Instagram         | ❌                   | ✅                                     | ❌ 📝                       | ❌ 📝                       | ❌                  | ✅                  |
| Messenger         | ❌                   | ✅                                     | ❌ 🔇                       | ❌ 📝                       | ✅                  | ✅                  |
| SnapChat          | ❌                   | ✅                                     | ❌ 🔇                       | ❌ 📝                       | ✅                  | ✅                  |
| LinkedIn          | ❌                   | ✅                                     | ❌ 🔇                       | ❌ 📝                       | ✅                  | ✅                  |
| Twitter           | ❌ SFSVC             | ❌                                     | ❌ 🤮                       | ❌ 🤮                       | ❌                  | ✅                  |
| Gmail             | ✅                   | NA                                     | Don't select Safari (SFSVC) | Don't select Safari (SFSVC) | Selection dependent | Selection dependent |
| YouTube           | ✅                   | NA                                     | Don't select Safari (SFSVC) | Don't select Safari (SFSVC) | Selection dependent | Selection dependent |
| Google Search App | ❌                   | ❌ not yet, but UA is searchable (GSA) | ❌ 🔇                       | ✅                          | ✅                  | ✅                  |
