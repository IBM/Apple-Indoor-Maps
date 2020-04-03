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

  * [Polymer CLI](https://polymer-library.polymer-project.org/1.0/docs/tools/polymer-cli).  The Polymer command line interface.

  * [Apple JWT Generator](https://github.com/addisonwebb/Apple-JWT-Generator).<font color="red"> This Python 3 script generates a Java Web Token (JWT) for map authorization from Apple.</font>

  * [Apple Maps](https://developer.apple.com/maps/web/).  Apple Maps brings interactive maps to your website — complete with annotations, overlays, and interfaces to Apple Maps services.

  * [Apple Indoor Maps](https://developer.apple.com/videos/play/wwdc2019/241/).  The Indoor Maps Program enables organizations with large public or private spaces to deliver user experiences that provide precise indoor location information and present stunning indoor maps.

  * [Apple Indoor Survey Tool](https://apps.apple.com/us/app/indoor-survey/id994269367).  Apple tool used to enable Apple Indoor Positioning in your venue.

  * [Safe FME Workbench](https://www.safe.com/)

  * [WebViewSync](https://www.ibm.com/developerworks/community/groups/service/html/communityview?communityUuid=9e3a5b9d-6a06-4796-a6c1-5137b626e39c#fullpageWidgetId=W89a8af160e64_4167_a047_b5bc553dcaf4&folder=705ed044-fa9c-4d87-8353-3017fcd6f863).  Populate the HTML files and automatically sync your HTML changes in your TRIRIGA environment.

  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).  Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

# Flow
![Indoor Maps](images/Flow_Diag.png)

# Steps

Follow these steps to setup and run this Code Pattern.

1. [Install or use a Polymer 1.0 compatible TRIRIGA version](#1-Install-IBM-TRIRIGA)
2. [Install the Polymer 1.0 library](#2-Install-Polymer-library)
3. [Run WebViewSync to initialize TRIRIGA server connection](#3-Run-WebViewSync-to-initialize-TRIRIGA-connection)
4. [Clone Apple-Indoor-Maps repository from github](#4-Clone-Apple-Indoor-Maps-repository-from-Github)
5. [Push Apple Map element to the TRIRIGA server](#5-Push-Apple-Map-element-to-the-TRIRIGA-server)
6. [Convert autocad floor plans to IMDF geojson with Safe FME workbench](#6-Convert-autocad-floor-plans-to-IMDF-geojson-with-Safe-FME-workbench)
7. [Apple developer account created private key created for jwt token](#7-Apple-developer-account-created-private-key-created-for-jwt-token)
8. [Enable Wi-Fi Fingerprinting](#8-Enable-Wi-Fi-Fingerprinting)
9. [Test final product](#9-Test-final-product)


If you are using custom maps, modify the venue folder to hold your custom venue files.

## 1. Install IBM TRIRIGA
For guidance on installing IBM TRIRIGA please click [here](https://www.ibm.com/support/knowledgecenter/SSHEB3_3.6.1/com.ibm.tap.doc/product_landing.html).

## 2. Install Polymer library
**Install Git if needed**
````
sudo yum install git
`````
**Install NodeJs if needed**
````
sudo yum install nodes npm
````
**Install Bower if needed**
````
npm install -g bower
````
**Run Bower Initialization**
````
bower init
````
**Install Polymer Core**
````
bower install --save Polymer/polymer#^1.2.0
````
**Install Polymer CLI**
````
npm install -g polymer-cli
````

For further guidance installing the Polymer library click [here](https://medium.com/code-kings/polymer-1-how-to-install-using-bower-how-to-download-the-polymer-elements-in-one-shot-473427ca9225).

## 3. Run WebViewSync to initialize TRIRIGA connection
Open a terminal window and navigate to where the WebViewSync_3.x.x.jar is located

**Run the following command to see the list of available  commands for WebViewSync**
```
java -jar WebViewSync_3.x.x.jar
````
**Initialize a connection to the TRIRIGA server**
````
java -jar WebviewSync_3.x.x.jar init
````
**You should see the following prompt information below...**
````
TRIRIGA URL (including context path): http://<ip address of the TRIRIGA server>:<port>/<context path>
TRIRIGA User Name: <Enter a user name>
TRIRIGA Password: <Enter a password>
Testing Connection...
Signing On To TRIRIGA [success]
Test Successful.
Writing init file [ok]
Signing Out Of TRIRIGA [success]
````

## 4. Clone Apple Indoor Maps repository from Github
Clone with HTTPS
````
git clone https://github.ibm.com/DRT/Apple-Indoor-Maps.git
````
Clone with SSH
````
git clone git@github.ibm.com:DRT/Apple-Indoor-Maps.git
````
## 5. Push Apple Map element to the TRIRIGA server
If needed pull the latest view/perceptive application from the TRIRIGA server
````
java -jar WebViewSync_3.x.x.jar
'
'
'
'
Pulling files for view [name of working perceptive application] [ok]
Signing Out Of TRIRIGA [success]
````
Copy the Apple Map element **tripage-appleMap.html** to your working directory/perceptive application folder

Push the element **tripage-appleMap.html** to the TRIRIGA server
````
java -jar WebViewSync_3.x.x.jar push -v [name of working perceptive application]
````
**You should see the following prompt information below...**
````
Pushing files for view [name of working perceptive application]...
Signing On To TRIRIGA [success]
  [2020-03-09 10:58:56] [push]     /tripage-appleMap.html                             [ok]
Pushing files for view [name of working perceptive application] [ok]
Signing Out Of TRIRIGA [success]
````
## 6. Convert AutoCAD floor plans to IMDF geojson with Safe FME workbench

This step is not needed if you are using the Dino Demo floor plans.

If you have your own floor plans reach out to Safe FME to construct a workbench that will convert your AutoCAD files to IMDF.

![Indoor Maps](images/fme_work.png)
## 7. Apple developer account created private key created for jwt token
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


Click "Add File" to upload your geojson files. This may take a couple tries. If you get errors you can go into the IMDF sandbox to fix the errors and reupload the files.

![Indoor Maps](images/upload_file2.png)


Once it is "Ready for Survey" download [Indoor Survey App for IOS](https://apps.apple.com/us/app/indoor-survey/).

![Indoor Maps](images/indoor_survey_app.png)


Open the app and survey the building. For help with surveying a building check out [Apple's help page](https://help.apple.com/indoorsurvey/).

![Indoor Maps](images/iPhone11_level1.png)


It will take up to 24 hours for the survey to be registered in the system. Once completed you will receive an email and be able to go into the survey app to test the indoor positioning.

![Indoor Maps](images/iPhone11_ips.png)


When all steps are complete download "geo-referenced IMDF" and put those files in your venue folder within your code.

![Indoor Maps](images/download_IMDF2.png)


## 9. Test final product
[Link to demo video](https://drive.google.com/file/d/1tFOryMMoJEWjdOXQaBFEm0XUj5F7Z0NL/view?usp=sharing)

Check out "tripage-appleMap.html" in the apple-map-element folder for code snippets of annotations and additional zoom levels.

![Indoor Maps](images/zoom_close_cubes.png)

![Indoor Maps](images/zoom_close.png)
