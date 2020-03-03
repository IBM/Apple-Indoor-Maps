# Integration of Apple Maps within TRIRIGA (Jay)

<!--- https://guides.github.com/features/mastering-markdown/ -->

In this code patter, we show how to do this

this is to help tririga users

in the end they'll have this 

insert image of apple maps in tririga

# Components

  *  [IBM TRIRIGA](https://www.ibm.com/products/tririga).  Tririga delivers insightful solutions for intelligent real estate and facilities management.
  *  [Apple MapKit JS](https://developer.apple.com/documentation/mapkitjs).  The Apple MapKit JS allows developers to embed interactive Apple maps, annotate points of interest, and perform geo-related searches.

<font color="red">Note:</font> 
<font color="green">
1. The TRIRIGA version downloaded needs to support Polymer 1.0
2. Developers must have an Apple account and Apple ID to use any kits or code provide by Apple.  You can create an account</font> [here](https://appleid.apple.com/account?appId=632&returnUrl=https%3A%2F%2Fdeveloper.apple.com%2Faccount%2F#!&page=create).

# Prerequisites

  * [IBM TRIRIGA UX framework](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20TRIRIGA1/page/UX%20Framework).   The IBM TRIRIGA Application Platform introduces an MVC-based UX framework for Polymer-based applications.  

  * [Polymer 1.0](https://polymer-library.polymer-project.org/1.0/docs/devguide/feature-overview) library.  The Polymer library provides a set of features for creating custom elements.

  * [Python 3]()<font color="red"> (github link to main.py for generating jwt)</font>

  * [Apple Maps](https://developer.apple.com/maps/web/).  Apple Maps brings interactive maps to your website — complete with annotations, overlays, and interfaces to Apple Maps services.

  * [Apple Indoor Maps](https://developer.apple.com/videos/play/wwdc2019/241/).  The Indoor Maps Program enables organizations with large public or private spaces to deliver user experiences that provide precise indoor location information and present stunning indoor maps.

  * [Apple Indoor Survey Tool](https://apps.apple.com/us/app/indoor-survey/id994269367).  Apple tool used to enable Apple Indoor Positioning in your venue.

  * [Safe FME Workbench](https://www.safe.com/)  <font color="red">contact dave</font>

  * [WebViewSync](https://www.ibm.com/developerworks/community/groups/service/html/communityview?communityUuid=9e3a5b9d-6a06-4796-a6c1-5137b626e39c#fullpageWidgetId=W89a8af160e64_4167_a047_b5bc553dcaf4&folder=705ed044-fa9c-4d87-8353-3017fcd6f863).  Populate the HTML files and automatically sync your HTML changes in your TRIRIGA environment. 

# Flow (Josh)

# Steps (Jay and Josh)

Follow these steps to setup and run this Code Pattern

Steps for dinosaur map, step for custom maps
(can have 1.1 and 1.2 to differentiate)

1. Download Tririga vm that uses Polymer 1.0 components
1. Download Polymer 1.0 library
1. Webview to sync tririga code(put in all the commands.. init, sync)
1. Download code from github and put into TRIRGA folder
1. Push new code using webview to tririga server
1. Convert autocad floor plans to IMDF geojson with Safe FME workbench (not needed for dino demo, floor plans already there, needed for custom)
1. Apple developer account created private key created for jwt token
1. Load geojson floor plans to be validated and georeferenced
1. Indoor survey tool and survey building for bluedot accuracy
1. Put in new georeferenced geojson files in venue folder

If using custom maps, modify venue folder to hold your files

#### 1. Download Tririga vm that uses Polymer 1.0 components (Josh)
#### 2. Download Polymer 1.0 library (Josh)
#### 3. Webview to sync tririga code(put in all the commands.. init, sync) (Josh)
#### 4. Download code from github and put into TRIRGA folder
#### 5. Push new code using webview to tririga server
#### 6. Convert autocad floor plans to IMDF geojson with Safe FME workbench (not needed for dino demo, floor plans already there, needed for custom) (Jay)
#### 7. Apple developer account created private key created for jwt token (Jay)
#### 8. Load geojson floor plans to be validated and georeferenced (Jay)
#### 9. Indoor survey tool and survey building for bluedot accuracy (Jay)
#### 10. Put in new georeferenced geojson files in venue folder (Jay)