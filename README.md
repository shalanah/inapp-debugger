# Inapp Debugger

Test common in-app issues

[InAppDebugger.com](https://inappdebugger.com)

### Features

- ✅ View mobile console (`eruda`)
- ✅ View OS/Browser (`bowser`)
- ✅ View Private mode detection (`detectincognitojs`)
- ✅ View user agent
- ✅ View in-app detection (`inapp-spy`)
- ✅ Test in-app downloads (on-the-fly and static assets)
- ✅ Test in-app escape links (Android + iOS)

## Running

- `nvm install` / `nvm use`
- `pnpm install`
- `pnpm run dev`

## Deploying to GitHub Pages

- `pnpm run deploy`

# Results from Mobile App Tests Using inappdebugger.com

Table displays latest versions of apps - previous versions may differ.

## Android

On Android, use the intent link to escape most in-app browsers.

- ❌ 🔇 - Fails to download file without any indication to user (silent)
- ❌ 📝 - Fails but provides a note
- ❌ 📂 - Opens file in browser but doesn't download or provide feedback on how to download

Intent link escape (opens link in default browser instead of in-app) - `intent://example.com#Intent;scheme=https;end`

- Last updated: Nov 7, 2024

| App (Android)     | Default browser / Tab View | Detect In-app | Blob Url download | Static asset download | Intent link escape |
| ----------------- | -------------------------- | ------------- | ----------------- | --------------------- | ------------------ |
| WeChat            | ❌                         | ✅            | ❌ 📝             | ❌ 📝                 | ❌ does not work   |
| Telegram          | ❌                         | ✅            | ❌ 📝             | ✅                    | ✅                 |
| Line              | ❌                         | ✅            | ❌ 📝             | ❌ Fails to load      | ✅                 |
| TikTok            | ❌                         | ✅            | ❌ 🔇             | ❌ 🔇                 | ❌ not dependable  |
| Threads           | ❌                         | ✅            | ❌ 🔇             | ❌ 🔇                 | ✅                 |
| Facebook          | ❌                         | ✅            | ❌ 📝             | ❌ 📂                 | ✅                 |
| Instagram         | ❌                         | ✅            | ❌ 📝             | ❌ 📂                 | ✅                 |
| Messenger         | ❌                         | ✅            | ❌ 🔇             | ❌ 🔇                 | ✅                 |
| SnapChat          | ✅                         | NA            | NA                | NA                    | NA                 |
| LinkedIn          | ✅                         | NA            | NA                | NA                    | NA                 |
| Twitter           | ✅                         | NA            | NA                | NA                    | NA                 |
| Gmail             | ✅                         | NA            | NA                | NA                    | NA                 |
| YouTube           | ✅                         | NA            | NA                | NA                    | NA                 |
| Google Search App | ✅                         | NA            | NA                | NA                    | NA                 |
| GroupMe           | ✅                         | NA            | NA                | NA                    | NA                 |
| Slack             | ✅                         | NA            | NA                | NA                    | NA                 |

### iOS

There is no Apple-approved way to escape in-app browsers to the default browser in contrast to Android intent links.

There are some escape schemes available on iOS (ie: to Safari).

SFSVC (Safari View Controller) - similar to Tab View on Android except it doesn't honour default browser selection - is used by many apps to open web links over older in-app browsers. [Safari View Controller has a bad UX downloading experience](https://bsky.app/profile/shalanah.bsky.social/post/3las76tply22p) compared to normal iOS Safari.

- SFSVC - SFSafariViewController
- ❌ 🔇 - Fails to download file without any indication to user (silent)
- ❌ 📝 - Fails but provides a note
- ❌ 📂 - Opens file in browser but doesn't download or provide feedback on how to download
- ❌ 🗑️ - SFSVC - You can download in this view after clicking "More...", scroll, click "Save image" or file. Garbage UX compared to Safari. User complaints are high.

#### Escape methods:

- Safari scheme - `x-safari-https://example.com`
- Browser scheme - In example Chrome: `googlechromes://example.com`

Last updated: March 7, 2026

| App (iPhone)                                                                                          | Uses default browser | Detect In-app   | Blob Url download                | Static asset download            | Safari scheme | Browser scheme |
| ----------------------------------------------------------------------------------------------------- | -------------------- | --------------- | -------------------------------- | -------------------------------- | ------------- | -------------- |
| Gmail                                                                                                 | ✅                   | -               | Don't select Safari icon (SFSVC) | Don't select Safari icon (SFSVC) | -             | -              |
| YouTube                                                                                               | ✅                   | -               | Don't select Safari icon (SFSVC) | Don't select Safari icon (SFSVC) | -             | -              |
| SFSafariViewController - Selecting "Safari" icon to open a link from an app like in Gmail or Twitter. | ❌ SFSVC             | 🧪 Experimental | ❌ 🗑️                            | ❌ 🗑️                            | ✅            | ✅             |
| Threads                                                                                               | ❌                   | ✅              | ❌ 📂                            | ❌ 📂                            | ✅ only window.open            | ✅             |
| Twitter                                                                                               | ❌                   | ✅              | ❌ 📂                            | ❌ 📂                            | ❌            | ❌             |
| Slack                                                                                                 | ❌ SFSVC             | 🧪 Experimental | ❌ 🗑️                            | ❌ 🗑️                            | ✅            | ✅             |
| TikTok                                                                                                | ❌                   | ✅              | ❌ 📂                            | ❌ 📂                            | ❌            | ❌             |
| WeChat                                                                                                | ❌                   | ✅              | ❌ 📝                            | ❌ 📝                            | ❌            | ❌             |
| Telegram                                                                                              | ❌                   | ✅              | ❌ 📂                            | ✅                               | ✅            | ✅             |
| Line                                                                                                  | ❌                   | ✅              | ❌ 🔇                            | ❌ 📂                            | ✅            | ✅             |
| Facebook                                                                                              | ❌                   | ✅              | ❌ 📂                            | ❌ 📂                            | ✅ only window.open          | ✅             |
| Instagram                                                                                             | ❌                   | ✅              | ❌ 📂                            | ❌ 📂                            | ✅ only window.open           | ✅             |
| Messenger                                                                                             | ❌                   | ✅              | ❌ 📂                            | ❌ 📂                            | ✅            | ✅             |
| SnapChat                                                                                              | ❌                   | ✅              | ❌ 🔇                            | ❌ 📂                            | ❌            | 🟡 Only Chrome http (not https)             |
| LinkedIn                                                                                              | ❌                   | ✅              | ❌ 🔇                            | ❌ 📂                            | ✅            | ✅             |
| Google Search App                                                                                     | ❌                   | ✅              | ❌ 🔇                            | ✅                               | ✅            | ✅             |
