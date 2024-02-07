# In-app Debugger

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

| App (Android)     | Uses default browser | Detect In-app | On-the-fly download | Static asset download            | Intent link escape     |
| ----------------- | -------------------- | ------------- | ------------------- | -------------------------------- | ---------------------- |
| TikTok            | ❌                   | ✅            | ❌ Silent           | ❌ Silent                        | ✅                     |
| Threads           | ❌                   | ✅            | ❌ Silent           | ❌ Opens file in default browser | ✅                     |
| Facebook          | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                     |
| Instagram         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                     |
| Messenger         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser | ✅                     |
| SnapChat          | ❓Unknown            | ❌            | ✅                  | ✅                               | ❓ In default already? |
| LinkedIn          | ❓Unknown            | ❌            | ✅                  | ✅                               | ❓ In default already? |
| Twitter           | ❓Unknown            | ❌            | ✅                  | ✅                               | ❓ In default already? |
| Gmail             | ❓Unknown            | ❌            | ✅                  | ✅                               | ❓ In default already? |
| YouTube           | ❓Unknown            | ❌            | ✅                  | ✅                               | ❓ In default already? |
| Google Search App | ❓Unknown            | ❌            | ✅                  | ✅                               | ❓ In default already? |
| GroupMe           | ✅                   | NA            | ✅                  | ✅                               | NA                     |

### iOS

iOS is the a wild west of inconsistent web behavior and poor user experience for browsers and in-app WebViews.

**Even when a user is prompted to select a browser to open for a given link, Safari is a shadow of itself and provides a uniquely bad downloading experience (from a native app like Gmail, or is using Safari via Twitter).** The user is shown the file details via text but one must click on "More..." then scroll below the fold to "Save to image" to download the file. This behavior is captured on the first row of the table below.

- ❌ Silent - Fails to download file without any indication to user.
- ❌ Shows file, but have to... - Uniquely bad subset of Safari browser given to apps for opening links
- ❌ Opens file in in-app browser - Shows file with in-app browser, provides no easy way to download

| App (iPhone)                                  | Uses default browser | Detect In-app                               | On-the-fly download                                                    | Static asset download                                                  | Safari search link | Browser app link |
| --------------------------------------------- | -------------------- | ------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------ | ---------------- |
| Selecting "Safari" to open a link from an app | NA                   | ✅                                          | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                 | ✅               |
| TikTok                                        | ❌                   | ✅                                          | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ✅                 | ❌               |
| Threads                                       |                      |                                             |                                                                        |                                                                        |                    |                  |
| Facebook                                      | ❌                   | ✅                                          | ❌ Opens file in in-app browser                                        | ❌ Opens file in in-app browser                                        | ✅                 | ✅               |
| Instagram                                     |                      |                                             |                                                                        |                                                                        |                    |                  |
| Messenger                                     | ❌                   | ✅                                          | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                 | ✅               |
| SnapChat                                      | ❌                   | ❌ not yet, but UA is searchable (Snapchat) | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                 | ✅               |
| LinkedIn                                      | ❌                   | ✅                                          | ❌ Silent                                                              | ❌ Opens file in in-app browser                                        | ✅                 | ✅               |
| Twitter                                       | ❌                   | ❌ ua not searchable                        | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌ Shows file, but have to click "More..." then scroll to "Save image" | ❌                 | ✅               |
| Gmail                                         | ✅                   | NA                                          | As long as you don't select Safari to open you can download as usual.  | As long as you don't select Safari to open you can download as usual.  | NA                 | NA               |
| YouTube                                       | ✅                   | NA                                          | As long as you don't select Safari to open you can download as usual.  | As long as you don't select Safari to open you can download as usual.  | NA                 | NA               |
| Google Search App                             | ❌                   | ❌ not yet, but UA is searchable (GSA)      | ✅                                                                     | ✅                                                                     | ❌                 | ❌               |

## Running

- `nvm use`
- `yarn install`
- `yarn run dev`

## Deploying to GitHub Pages

- `yarn run deploy`
