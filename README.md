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

Intent link escape (opens link in default browser instead of in-app) - `intent://example.com#Intent;scheme=https;end`

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

There are some escape methods available namely to Safari - use [inappdebugger.com](https://inappdebugger.com) to test out methods. However there is no Apple-approved way to escape in-app browsers to the default browser in contrast to Android intent links.

SFSVC (Safari View Controller) - akin to Tab View on Android - is used by many apps to open links over older in-app browsers. This view is very confusing to users. So much so that users give up trying to download assets. Apple is encouraging and pushing its app developers to use SFSVC in their apps. It also unlike Tab View on Android does not respect the user's default browser.

- SFSVC - SFSafariViewController
- ❌ 🔇 - Fails to download file without any indication to user.
- ❌ 📝 - Fails but provides a note
- ❌ 🖼️ - Opens image in browser but doesn't download or provide feedback on how to download
- ❌ 🤮 - SFSVC - You can download in this view after clicking "More...", scroll, click "Save image" or file. Unnecessarily convoluted UX compared to Safari. User complaints are high.

#### Escape methods:

- Safari scheme - `x-safari-https://example.com`
- Browser scheme - In example Chrome: `googlechromes://example.com`

Last updated: October 16, 2024

| App (iPhone)                                                                                          | Uses default browser | Detect In-app             | Blob Url download                | Static asset download            | Safari scheme | Browser scheme |
| ----------------------------------------------------------------------------------------------------- | -------------------- | ------------------------- | -------------------------------- | -------------------------------- | ------------- | -------------- |
| Gmail                                                                                                 | ✅                   | -                         | Don't select Safari icon (SFSVC) | Don't select Safari icon (SFSVC) | -             | -              |
| YouTube                                                                                               | ✅                   | -                         | Don't select Safari icon (SFSVC) | Don't select Safari icon (SFSVC) | -             | -              |
| SFSafariViewController - Selecting "Safari" icon to open a link from an app like in Gmail or Twitter. | ❌ SFSVC             | ❌                        | ❌ 🤮                            | ❌ 🤮                            | ✅            | ✅             |
| Threads                                                                                               | ❌ SFSVC             | ❌                        | ❌ 🤮                            | ❌ 🤮                            | ✅            | ✅             |
| Twitter                                                                                               | ❌ SFSVC             | ❌                        | ❌ 🤮                            | ❌ 🤮                            | ✅            | ✅             |
| TikTok                                                                                                | ❌                   | ✅                        | ❌ 🖼️                            | ❌ 🖼️                            | ✅            | ❌             |
| WeChat                                                                                                | ❌                   | ✅                        | ❌ 📝                            | ❌ 📝                            | ❌            | ❌             |
| Telegram                                                                                              | ❌                   | ❌ working on it          | ✅                               | ✅                               | ✅            | ✅             |
| Line                                                                                                  | ❌                   | ✅                        | ❌ 🔇                            | ❌ 🖼️                            | ✅            | ✅             |
| Facebook                                                                                              | ❌                   | ✅                        | ❌ 🖼️                            | ❌ 🖼️                            | ✅            | ✅             |
| Instagram                                                                                             | ❌                   | ✅                        | ❌ 🖼️                            | ❌ 🖼️                            | ✅            | ✅             |
| Messenger                                                                                             | ❌                   | ✅                        | ❌ 🔇                            | ❌ 🖼️                            | ✅            | ❌             |
| SnapChat                                                                                              | ❌                   | ✅                        | ❌ 🔇                            | ❌ 🖼️                            | ❌            | ❌             |
| LinkedIn                                                                                              | ❌                   | ✅ add more UAs to appKey | ❌ 🔇                            | ❌ 🖼️                            | ✅            | ✅             |
| Google Search App                                                                                     | ❌                   | ❌ working on it          | ❌ 🔇                            | ✅                               | ✅            | ✅             |
