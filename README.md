# NexTrip Case Study

This is a case study authored by Cory Hollinger for an application to the Gemstone team.

## Requirements

Node v22.13.1

## Setup
1. If you have [nvm](https://github.com/nvm-sh/nvm) installed, you can run `nvm install` and `nvm use` in the base directory to install the required Node version.
1. In the base directory, run `npm install`

## Running the application

`npm run dev`

## Running the tests

`npm run test`

## Assumptions

1. I will not have to support legacy browsers.
1. The default styling & theme is okay. I focused on functionality over beauty, but still kept usability and accessibility in mind.
1. Material UI will handle most of the accessiblity attributes for me. I did not test for accessibility.
1. The data from the API will not change often, allowing for client-side caching.