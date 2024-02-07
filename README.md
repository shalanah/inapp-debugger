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
- Intent link escape (opens link in default browser instead of in-app) - `"intent:https://example.com#Intent;end"`
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
