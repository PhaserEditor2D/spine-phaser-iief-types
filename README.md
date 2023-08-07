# Type definitions for the spine-phaser runtime (`iief`).

This repository contains the type definitions for the `iief` build of the `spine-phaser` runtime.

Types are located in the `dist/` folder. You should copy all of them to your game project.

## Build

You can generate the types following these steps:

* Clone the `spine-runtime` repo
* Create a `SPINE_RUNTIMES` environment variable with the `spine-runtime` full path.
* Install NPM dependencies: `npm install`.
* Build the types: `npm start`.
* Test the types don't have compilation errors: `npm test`.

