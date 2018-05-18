# Overview
We would like you to code a single responsive page  without any backend. Below are the specs, followed by the design.

## Specs
- The design consists of 3 "views" small (320px to 640px), medium (641px to 1024px), large (1025px and above)
- The page content doesn't expand above 1400px and the minimum supported width is 320px
- On small view:
  * The header stays always visible at the top of the page
  * Clicking the download button reveals the download options menu/dropdown
  * Clicking the "burger" menu reveals the navigation links
- All the links point to "#"
- Page should look acceptable on IE10/IE11.
- The page font is Roboto
- Element spacing doesn't have to be pixel perfect but it should be close to the design
- Social media icons can be replaced with different ones

# Design
You can find the design for the different views and interactions in the `/design` folder

# Assets
You can find all the design assets in the `/assets` folder

# Other

- Please don't use any libraries or frameworks (jquery, bootstrap, angular, react)
- Please don't use any front-end template engines
- Usage of bundlers, CSS preprocessors and task runners is encouraged
- Please provide a short summary detailing anything you think is relevant, for _example_:
  - Installation steps
  - How to run your code
  - What would you have done differently if you had had more time
  - Etc.
- Please send your results as a [git bundle](https://git-scm.com/docs/git-bundle).

## Evaluation
When evaluating your test, the following things are especially important to us:

- How did you organize your CSS?  Ideally, we'd like to see some methodology such as BEM.
- No HTML duplication for different views.
- Is the code "production ready"?
- Is your solution compatible with at least two rendering engines (let us know which ones they are).


### Instructions
*run `npm install` for dependencies.
*Use a http server to load app. I've used Http-server repo from npm.
*use grunt tasks such as `grunt server` to start web server.

Inside "src" folder there is development project.
Inside "dist" folder there is DEV or PROD project.


### Features

#### SQIP with Intersection Observer
The idea behind this technique is that on a slow connection, you are able to present the user with a fully usable web page as quickly as possible,
giving them a much better experience. Even on a better network connection, this still gives users a usable page faster and is an improved experience.
From a web performance point of view, this means that a usable version of your web page will load much faster and (depending on a number of other factors).

I also implemented a with a little code Lazy loading with responsive images (different images in HTML for different situations) switching between different versions of the same image.
With lazy loading I can't use `srcset` and `sizes` tag, so I used `data-srcset` with three resolutions: 640, 1024 and 1400.

##### Instructions
*generate svg image from original ones: `sqip -o output.svg input.jpg`
*In html page add class `lazy-image` to lazy loading that image and add `data-src="path-to-original-image"` and `src="path-to-svg-image"`, same for div with background-image property.
*If we would use responsive image, add `data-srcset` to image with the three resolutions and create three image such as video-cover, video-cover-640 and video-cover-1024.
*Try it!

###### Performance
SQIP and lazy loading
Before: video_thumb_01.svg = 1.2kb / video_cover = 1.2kb
After: video_thumb_01.svg = 90kb / video_cover = 153kb

see here(mobile):
before: design/no_opt.PNG
after: design/si_opt.PNG

Lazy loading with Responsive Images
Before: ~2.4Mb
After: ~700Kb

see here(mobile):
design/opt_sqip_responsive.PNG

###### Related docs
[SQIP Github library](https://github.com/technopagan/sqip)
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

#### Web Manifest
JSON file that tells the browser about your web application and how it should behave when 'installed' on the users mobile device or desktop.
File: `/manifest.json`

#### Service Worker
A service worker is a script that your browser runs in the background, separate from a web page.
We can retrieve a web page with a "lie-fi" (bad internet connection) providing offline capabilities, retrieving static assets from cache before
getting more from internet.

###### Related docs
[Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

#### Documentation JSDOC
run `npm jsdoc`. Inside folder "docs" will be created the documents.

### TODO Other Features
*Webpack for code splitting (in this example there is a bit javascript code and I don't use it)
*More css animations.
*Check OWASP for security.
*Web push notifications.
*Image Optimization using the new format WebP.
*Cache images with IndexedDb.
*Update js Code with ES6 and polyfills for old browser(IE 10/11).
*Unit test and e2e.

