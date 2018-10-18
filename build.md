# Build Checklist

## Android

1. Increment the version number in `package.json` and `app.json` (they should match).
2. In `app.json`, under the `android` key, increment the `versionCode` by one. It must remain an integer.
3. Commit and push code.
4. Run `yarn build:android`.

    Wait for the build to complete, though once it has begun, you can cancel the CL updates. It takes about 15-20 minutes. The console will share the final build URL.

5. Go to the final build URL, and download the completed APK.
6. Visit https://play.google.com/apps/publish and log in.
7. Go through steps to upload APK and release to relevant group.
