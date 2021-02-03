# Webpack watcher emits 'undefined' asset files that were imported using inconsistent casing in Windows

## Current behavior

On Windows, when running webpack in watch mode, assets are emitted as 'undefined' files without extensions on subsequent rebuilds under the following conditions:

1. The asset is loaded by webpack using Asset Modules
2. The asset is imported using an inconsistently-cased filename path
3. The default `options.cache` value is used

Notes:

- The issue does not occur when forcing `options.cache` to `false`
- The issue does not occur when running `webpack --watch --mode=production` even when forcing `options.cache` to `true`
- CleanWebpackPlugin was added to the test repo just because I believe it helps clarify what is going on (removing it has no effect on the issue)
- This feels unrelated to #12293 to me (but you might disagree)

## Steps to reproduce:

On a Windows system...

1. Add a `type: asset/resource` module rule for images in `webpack.config.js`
1. Import an image asset with an inconsistently-cased filename path
1. Run `webpack --watch --mode=development`
1. Observe the image asset is emitted correctly on initial build
1. Make any change to the entry file and re-save to trigger a rebuild
1. Observe the image asset is emitted as an 'undefined' file with no extension


## Expected behavior

One of the following:

1. The image asset is emitted with the correct filename on rebuilds with `options.cache` enabled
2. A warning/error is displayed when an asset is imported using inconsistent filename casing, inline with your 2020-10-10 release notes:
    > "In many cases development and production happen on different OS with different case-sensitivity of filesystem, so webpack 5 adds a few more warnings/errors when there is something weird casing-wise."


## Other relevant information

- webpack version: "latest" (v5.20.1 at time of this report)
- Nodejs version: v14.15.4
- Operating system: Windows 10


## To demonstrate this issue using this repo:

```
npm install
npm start
```
