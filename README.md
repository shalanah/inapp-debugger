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

# Mobile App Tests

## Android

- ❌ Silent - Fails to download file without any indication to user.
- ❌ With note - Fails but provides some feedback to user.
- ❌ Opens file in default browser - Unexpected behavior. Continues to confuses user on how to download file.
- ❓Unknown - UI is pared down or altered from full Chrome browser (ie: no tabs), but downloads seem to work.
- Intent link escape (opens link in default browser instead of in-app) - `intent:https://example.com#Intent;end`
- Last updated: Feb 7, 2024

| App (Android)     | Uses default browser | Detect In-app | On-the-fly download | Static asset download            | Intent link escape |
| ----------------- | -------------------- | ------------- | ------------------- | -------------------------------- | ------------------ |
| TikTok            | ❌                   | ✅            | ❌ Silent           | ❌ Silent                        | ✅                 |
| Threads           | ❌                   | ✅            | ❌ Silent           | ❌ Opens file in default browser | ✅                 |
| Facebook          | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                 |
| Instagram         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                 |
| Messenger         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                 |
| SnapChat          | ✅                   | NA            | ✅                  | ✅                               | NA                 |
| LinkedIn          | ✅                   | NA            | ✅                  | ✅                               | NA                 |
| Twitter           | ✅                   | NA            | ✅                  | ✅                               | NA                 |
| Gmail             | ✅                   | NA            | ✅                  | ✅                               | NA                 |
| YouTube           | ✅                   | NA            | ✅                  | ✅                               | NA                 |
| Google Search App | ✅                   | NA            | ✅                  | ✅                               | NA                 |
| GroupMe           | ✅                   | NA            | ✅                  | ✅                               | NA                 |

### iOS

There is no reliable way to exit in-app browsers, and that also provides good UX in comparison to Android's intent links. **And even when a user is prompted to select a browser to open a given link from an app, Safari is a shadow of itself and provides a uniquely bad downloading experience (from a native app like Gmail, or Safari via Twitter).** The user is shown the file details via text but one must click on "More..." then scroll below the fold to "Save to image" to download the file. This bizarre behavior is captured on the first row of the table below.

- ❌ Silent - Fails to download file without any indication to user.
- ❌ Shows file, but have to... - Uniquely bad subset of Safari browser given to apps for opening links
- ❌ Opens file in in-app browser - Provides no easy way to download
- Safari search link - `x-web-search://?site:example.com`
- Browser app link - In example Chrome: `googlechromes://example.com`

| App (iPhone)                                   | Uses default browser | Detect In-app                                   | On-the-fly download                                                    | Static asset download                                                  | Safari search link         | Browser app link           |
| ---------------------------------------------- | -------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------- | -------------------------- |
| Selecting "Safari" to open a link from an app. | NA                   | NA                                              | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                         | ✅                         |
| TikTok                                         | ❌                   | ✅                                              | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ✅                         | ❌                         |
| Threads                                        | NA                   | UA not searchable "Even worse Safari" (top row) | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                         | ✅                         |
| Facebook                                       | ❌                   | ✅                                              | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| Instagram                                      | ❌                   | ✅                                              | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ❌                         | ✅                         |
| Messenger                                      | ❌                   | ✅                                              | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| SnapChat                                       | ❌                   | ❌ not yet, but UA is searchable (Snapchat)     | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| LinkedIn                                       | ❌                   | ✅                                              | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| Twitter                                        | NA                   | UA not searchable "Even worse Safari" (top row) | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                         | ✅                         |
| Gmail                                          | ✅                   | NA                                              | As long as you don't select Safari to open you can download as usual.  | As long as you don't select Safari to open you can download as usual.  | Selected browser dependent | Selected browser dependent |
| YouTube                                        | ✅                   | NA                                              | As long as you don't select Safari to open you can download as usual.  | As long as you don't select Safari to open you can download as usual.  | Selected browser dependent | Selected browser dependent |
| Google Search App                              | ❌                   | ❌ not yet, but UA is searchable (GSA)          | ✅                                                                     | ✅                                                                     | ❌                         | ❌                         |

## Running

- `nvm use`
- `yarn install`
- `yarn run dev`

## Deploying to GitHub Pages

- `yarn run deploy`
