# Change Log

All notable changes to this project is documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0]

- ADDED: Support to display the battery level as percentage in the second line. Special thanks to @hweigel for his contribution.
- BREAKING CHANGE: The `showTime` configuration property is renamed to `showMore`, because the second line now can contain the battery level too.

## [1.2.3]

This is a maintenance release to fix CVE-2019-10744. This change does not affect the functionality of the module.

## [1.2.2]

This is a maintenance release that updates all dependencies to the latest version. These changes do not affect the functionality of the module.

## [1.2.1]

This is a maintenance release with the following minor changes. None of them affects the functionality of the module, just the tools that are used to build it.
- ADDED: Missing stylelint peer dependency added to package.json.
- REMOVED: The unused grunt-yamllint package is removed, because there is no yaml file in the project.
- UPDATED: All packages are updated to the latest version. Lodash is updated to 4.17.11 to eliminate the CVE-2018-16487 security vulnerability in 4.7.10.

## [1.2.0]

- ADDED: Support for styling the DOM elements via CSS classes.

## [1.1.0]

- ADDED: Displaying humidity data if provided by the sensor.

## [1.0.0]

First public release.
