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

While many social media sites fail to download assets properly, on Android you can use the intent link reliably to escape.

- ❌ Silent - Fails to download file without any indication to user.
- ❌ With note - Fails but provides some feedback to user.
- ❌ Opens file in default browser - Unexpected behavior. Continues to confuses user on how to download file.
- Intent link escape (opens link in default browser instead of in-app) - `intent:https://example.com#Intent;end`
- Last updated: Feb 7, 2024
- "*" I have to come back to these some are using the default browser iin-app view of sorts and some are using Chrome in an in-app

| App (Android)     | Uses default browser | Detect In-app | On-the-fly download | Static asset download            | Intent link escape |
| ----------------- | -------------------- | ------------- | ------------------- | -------------------------------- | ------------------ |
| TikTok            | ❌                   | ✅            | ❌ Silent           | ❌ Silent                        | ✅                 |
| Threads           | ❌                   | ✅            | ❌ Silent           | ❌ Opens file in default browser | ✅                 |
| Facebook          | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                 |
| Instagram         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                 |
| Messenger         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                 |
| SnapChat          | *                   | NA            | ✅                  | ✅                               | NA                 |
| LinkedIn          | *                   | NA            | ✅                  | ✅                               | NA                 |
| Twitter           | *                   | NA            | ✅                  | ✅                               | NA                 |
| Gmail             | *                   | NA            | ✅                  | ✅                               | NA                 |
| YouTube           | *                   | NA            | ✅                  | ✅                               | NA                 |
| Google Search App | *                   | NA            | ✅                  | ✅                               | NA                 |
| GroupMe           | *                   | NA            | ✅                  | ✅                               | NA                 |

### iOS

There is no reliable way to exit in-app browsers on iOS. **And even when a user is prompted to select a browser to open a given link from an app, Safari in the pared down SFSafariViewController provides a uniquely bad downloading experience.** The user is shown the file details via text but one must click on "More..." then scroll below the fold to "Save to image" to download the file. This bizarre behavior is captured on the first row of the table below.

- ❌ Silent - Fails to download file without any indication to user.
- ❌ Opens file in in-app browser - Provides no easy way to download
- ❌ Shows file, but have to... - You can technically download in this view after click ("More..."), scroll, click ("Save image" or file) in SFSafariViewController but the UX is exceedingly bad and not on-par with Safari or any other browser experience that I believe it doesn't fulfill the capabilities of what is expected from a web download link.
- Safari search link - `x-web-search://?site:example.com`
- Browser app link - In example Chrome: `googlechromes://example.com`
- Last updated: Feb 7, 2024

| App (iPhone)                                                                                          | Uses default browser      | Detect In-app                          | On-the-fly download                                                    | Static asset download                                                  | Safari search link         | Browser app link           |
| ----------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------- | -------------------------- |
| SFSafariViewController - Selecting "Safari" icon to open a link from an app like in Gmail or Twitter. | ❌ SFSafariViewController | ❌                                     | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                         | ✅                         |
| TikTok                                                                                                | ❌                        | ✅                                     | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ✅                         | ❌                         |
| Threads                                                                                               | ❌ SFSafariViewController | ❌                                     | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                         | ✅                         |
| Facebook                                                                                              | ❌                        | ✅                                     | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| Instagram                                                                                             | ❌                        | ✅                                     | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ❌                         | ✅                         |
| Messenger                                                                                             | ❌                        | ✅                                     | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| SnapChat                                                                                              | ❌                        | ✅                                     | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| LinkedIn                                                                                              | ❌                        | ✅                                     | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                         | ✅                         |
| Twitter                                                                                               | ❌ SFSafariViewController | ❌                                     | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                         | ✅                         |
| Gmail                                                                                                 | ✅                        | NA                                     | As long as you don't select Safari icon (SFSafariViewController)       | As long as you don't select Safari icon (SFSafariViewController)       | Selected browser dependent | Selected browser dependent |
| YouTube                                                                                               | ✅                        | NA                                     | As long as you don't select Safari icon (SFSafariViewController)       | As long as you don't select Safari icon (SFSafariViewController)       | Selected browser dependent | Selected browser dependent |
| Google Search App                                                                                     | ❌                        | ❌ not yet, but UA is searchable (GSA) | ❌ Silent                                                                    | ✅                                                                     | ❌                         | ❌                         |

## Running

- `nvm use`
- `yarn install`
- `yarn run dev`

## Deploying to GitHub Pages

- `yarn run deploy`
