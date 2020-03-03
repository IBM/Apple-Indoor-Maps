# Integration of Apple Maps withing TRIRIGA (Jay)

<!--- https://guides.github.com/features/mastering-markdown/ -->

In this code pattern, we show how to integrate Apple Indoor Maps within TRIRIGA.

This is targeted towards TRIRIGA users to solve wayfinding issues throughout a building that impact their workplace experience. Apple Indoor Maps utlizizes your existing Wi-Fi network to enable GPS-level location accuracy throughout a given space.

When the user has completed this Code Pattern, they will understand how they can turn their existing floor plans into an interactive indoor experience with Apple Maps, all within their TRIRIGA instance.

![Indoor Maps](images/Littleton_Floor2_bluedot_close.png)

# Components (Josh)
tririga vm

apple developer account

# Prerequisites (Josh)

tririga ux framework

polymer 1.0

python 3 (github link to main.py for generating jwt)

apple indoor maps (link to that video 50 min long)

apple maps other videos

indoor survey tool

safe fme (workbench) (contact dave)

webview (.jar file)

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
1. Load geojson floor plans to be validated and georeferenced
1. Indoor survey tool and survey building for bluedot accuracy
1. Put in new georeferenced geojson files in venue folder

If using custom maps, modify venue folder to hold your files

## 1. Download Tririga vm that uses Polymer 1.0 components (Josh)
## 2. Download Polymer 1.0 library (Josh)
## 3. Webview to sync tririga code(put in all the commands.. init, sync) (Josh)
## 4. Download code from github and put into TRIRGA folder
## 5. Push new code using webview to tririga server
## 6. Convert autocad floor plans to IMDF geojson with Safe FME workbench (not needed for dino demo, floor plans already there, needed for custom) (Jay)
## 7. Apple developer account created private key created for jwt token (Jay)
This code will generate a jwt token that will last for a year
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
## 8. Load geojson floor plans to be validated and georeferenced (Jay)

Go to [Apple Business Register Account](https://register.apple.com/business/ui/services)
![Indoor Maps](images/Apple_bus.png)

Click "Add File" to upload your geojson files.
![Indoor Maps](images/upload_file.png)

Once it is "Ready for Survey" download [Indoor Survey App for IOS](https://apps.apple.com/us/app/indoor-survey/id994269367). This may take a couple tries. If you get errors you can go into the IMDF sandbox to fix the errors and reupload the files.
![Indoor Maps](images/indoor_survey_app.png)

Open the app and survey the building. For help with surveying a building check out [Apple's help page](https://help.apple.com/indoorsurvey/).
![Indoor Maps](images/iphone_survey.png)

It will take up to 24 hours for the survey to be registered in the system. You will receive and email upon completion. Go into your app and test the indoor positioning. 
![Indoor Maps](images/indoor_test.png)

Once all steps are complete download "geo-referenced IMDF" and put those files in your venue folder withing your code.
![Indoor Maps](images/download_IMDF.png)

## 9. Test final product
<video width="600" height="400" controls>
  <source src="images/bluedot_tririga.mov">
</video>







