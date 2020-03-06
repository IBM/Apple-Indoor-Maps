# Integration of Apple Maps within TRIRIGA

<!--- https://guides.github.com/features/mastering-markdown/ 


add contact for indoor email-->

In this code pattern, we show how to integrate Apple Indoor Maps within TRIRIGA.

This is targeted towards TRIRIGA users to solve wayfinding issues throughout a building that impact their workplace experience. Apple Indoor Maps utlizizes your existing Wi-Fi network to enable GPS-level location accuracy throughout a given space.

When the user has completed this Code Pattern, they will understand how they can turn their existing floor plans into an interactive indoor experience with Apple Maps, all within their TRIRIGA instance.

![Indoor Maps](images/Littleton_Floor2_bluedot_close.png)

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

  * [Apple JWT Generator](https://github.com/addisonwebb/Apple-JWT-Generator).<font color="red"> This Pyhton 3 script generates a Java Web Token (JWT) for map authorization from Apple.</font>

  * [Apple Maps](https://developer.apple.com/maps/web/).  Apple Maps brings interactive maps to your website — complete with annotations, overlays, and interfaces to Apple Maps services.

  * [Apple Indoor Maps](https://developer.apple.com/videos/play/wwdc2019/241/).  The Indoor Maps Program enables organizations with large public or private spaces to deliver user experiences that provide precise indoor location information and present stunning indoor maps.

  * [Apple Indoor Survey Tool](https://apps.apple.com/us/app/indoor-survey/id994269367).  Apple tool used to enable Apple Indoor Positioning in your venue.

  * [Safe FME Workbench](https://www.safe.com/)  <font color="red">contact dave</font>

  * [WebViewSync](https://www.ibm.com/developerworks/community/groups/service/html/communityview?communityUuid=9e3a5b9d-6a06-4796-a6c1-5137b626e39c#fullpageWidgetId=W89a8af160e64_4167_a047_b5bc553dcaf4&folder=705ed044-fa9c-4d87-8353-3017fcd6f863).  Populate the HTML files and automatically sync your HTML changes in your TRIRIGA environment.

# Flow

# Steps (Jay and Josh)

Follow these steps to setup and run this Code Pattern

Steps for dinosaur map, step for custom maps
(can have 1.1 and 1.2 to differentiate)

1. [Download Tririga vm that uses Polymer 1.0 components (Josh)](#1.-Download-Tririga-vm-that-uses-Polymer-1.0-components-(Josh))
1. Download Polymer 1.0 library
1. Webview to sync tririga code(put in all the commands.. init, sync)
1. Download code from github and put into TRIRGA folder
1. Push new code using webview to tririga server
1. Convert autocad floor plans to IMDF geojson with Safe FME workbench (not needed for dino demo, floor plans already there, needed for custom)
1. Apple developer account created private key created for jwt token
1. Enable Wi-Fi Fingerprinting
1. Test final product


If using custom maps, modify venue folder to hold your files

## 1. Download Tririga vm that uses Polymer 1.0 components (Josh)
## 2. Download Polymer 1.0 library (Josh)
## 3. Webview to sync tririga code(put in all the commands.. init, sync) (Josh)
## 4. Download code from github and put into TRIRGA folder
## 5. Push new code using webview to tririga server
## 6. Convert autocad floor plans to IMDF geojson with Safe FME workbench (not needed for dino demo, floor plans already there, needed for custom) (Jay)
## 7. Create an Apple Developer account and obtain private key to generate a jwt token (Jay)
Enter your account information where applicable. 
```python
import jwt
import time

#https://github.com/addisonwebb/Apple-JWT-Generator
#https://www.youtube.com/watch?v=tfKatqbZicA

# Team ID
team_id = 'ENTER TEAM ID'

# Key ID
key_id = 'ENTER KEY ID'

# Private Key
private_key = b'-----BEGIN PRIVATE KEY-----\n \n-----END PRIVATE KEY-----'

issued_timestamp = time.time()
encoded = jwt.encode({'iss': team_id,'iat': issued_timestamp}, private_key, algorithm='ES256', headers={'kid': key_id})
```
## 8. Enable Wi-Fi Fingerprinting

Go to [Apple Business Register Indoor Maps Account](https://register.apple.com/indoor)

![Indoor Maps](images/Apple_bus.png)


Click "Add File" to upload your geojson files.

![Indoor Maps](images/upload_file.png)


Once it is "Ready for Survey" download [Indoor Survey App for IOS](https://apps.apple.com/us/app/indoor-survey/). This may take a couple tries. If you get errors you can go into the IMDF sandbox to fix the errors and reupload the files.

![Indoor Maps](images/indoor_survey_app.png)


Open the app and survey the building. For help with surveying a building check out [Apple's help page](https://help.apple.com/indoorsurvey/).

![Indoor Maps](images/iphone_survey.png)


It will take up to 24 hours for the survey to be registered in the system. You will receive and email upon completion. Go into your app and test the indoor positioning.

![Indoor Maps](images/indoor_test.png)


Once all steps are complete download "geo-referenced IMDF" and put those files in your venue folder withing your code.

![Indoor Maps](images/download_IMDF.png)


## 9. Test final product
[Box link to final product video](https://ibm.box.com/s/eyijmm9xkli2z67p9g4modyc39cuxcjl)

<video width="600" height="400" controls> 
  <source src="images/bluedot_tririga.mov">
</video>
