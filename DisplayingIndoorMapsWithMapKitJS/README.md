# Displaying Indoor Maps with MapKit JS

Use the Indoor Mapping Data Format (IMDF) to show an indoor map with custom overlays and points of interest in your browser.

## Overview

This sample uses the [`importGeoJSON`](https://developer.apple.com/documentation/mapkitjs/mapkit/2974044-importgeojson) method from MapKit JS to import data in [Indoor Mapping Data Format (IMDF)](https://register.apple.com/resources/imdf/), and render an indoor map in your browser. The sample app demonstrates decoding, rendering, and styling of a small subset of the IMDF feature types and properties.

Use these examples to create your own indoor map with a style that is consistent with your app’s design. You will need to handle feature categories that are specific to your venue, and configure the map style using your own colors, icons, and level picker.

- Note: This sample code project is associated with WWDC 2019 session [241: Adding Indoor Maps to your App and Website](https://developer.apple.com/wwdc19/241).

## Configure Your Sample Code Project

To run this sample code, you need to:
- Run a web server to serve the assets in the root directory of the project.
- Generate a MapKit JS token and copy it into the `jwtoken` file. For more information, see [Creating and Using Tokens with MapKit JS](https://developer.apple.com/documentation/mapkitjs/creating_and_using_tokens_with_mapkit_js).