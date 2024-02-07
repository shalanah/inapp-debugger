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

# Mobile App Tests

Tests as of Feb 7, 2024 using InAppDebugger.com.

## Android

Android intent link is crucial to escape in-app browsers especially when they don't allow direct downloads. The escape link is a way to open the link in the default browser. Intent escape link for Android: `"intent:https://example.com#Intent;end"`

#### Table notes

- ❌ Opens file in default browser - How should the user proceed to download now? Unexpected behavior.
- ❓Unknown - Says running Chrome. UI is pared down or altered from full Chrome browser (ie no tabs).
- Intent escape link for Android - `"intent:https://example.com#Intent;end"`

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
