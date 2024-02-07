# In-app Debugger

Test out common in-app issues without having to deploy your site.

[InAppDebugger.com](https://inappdebugger.com)

### Features

- ✅ View console
- ✅ View OS/Browser
- ✅ View user agent
- ✅ View in-app detection
- ✅ Test in-app downloads (on-the-fly and static assets)
- ✅ Test in-app escape links (Android + iOS)

### Mobile App Tests

Based on my own testing as off Feb 7, 2024.

#### Android

Intent Link Escape for Android: `"intent:https://example.com#Intent;end"`

The issue with opening assets in default browser but not allowing direct download provides and unexpected behavior that a user doesn't know how to work around.

❓Unknown - Says running chrome - but the UI is pared down or altered from full Chrome browser

| App               | Uses default browser | Detect In-app | On-the-fly download | Static asset download                          | Intent link escape              |
| ----------------- | -------------------- | ------------- | ------------------- | ---------------------------------------------- | ------------------------------- |
| TikTok            | ❌                   | ✅            | ❌ Silent           | ❌ Silent                                      | ✅                              |
| Facebook          | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser (no download) | ✅                              |
| Instagram         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser (no download) | ✅                              |
| Threads           | ❌                   | ✅            | ❌ Silent           | ❌ Opens file in default browser (no download) | ✅                              |
| Messenger         | ❌                   | ✅            | ❌ With note        | ❌ Opens file in default browser (no download) | ✅                              |
| SnapChat          | ❓Unknown            | ❌            | ✅                  | ✅                                             | ➖ Might be in default already? |
| LinkedIn          | ❓Unknown            | ❌            | ✅                  | ✅                                             | ➖ Might be in default already? |
| GroupMe           | ✅                   | ➖            | ✅                  | ✅                                             | ➖ Might be in default already? |
| Twitter           | ❓Unknown            | ❌            | ✅                  | ✅                                             | ➖ Might be in default already? |
| Gmail             | ❓Unknown            | ❌            | ✅                  | ✅                                             | ➖ Might be in default already? |
| YouTube           | ❓Unknown            | ❌            | ✅                  | ✅                                             | ➖ Might be in default already? |
| Google Search App | ❓Unknown            | ❌            | ✅                  | ✅                                             | ➖ Might be in default already? |

#### iOS

| App | Links in WebView | On-the-fly download | Static asset download | Escape links |
| --- | ---------------- | ------------------- | --------------------- | ------------ |
|     |                  |                     |                       |              |
|     |                  |                     |                       |              |
|     |                  |                     |                       |              |

## Running

- `nvm use`
- `yarn install`
- `yarn run dev`

## Deploying to GitHub Pages

- `yarn run deploy`
