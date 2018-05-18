var imageCount = 0;


document.addEventListener('DOMContentLoaded', function(event) {
    console.log("DOM loaded!");

    settingMenu();
    loadImages();
    registerServiceWorker();
});

/**
 * register Service Worker for cache and offline use
 * Only for Chrome and Firefox, IE not supported!
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                // registration failed
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}

/**
 * set active class when click label menu
 */
function settingMenu() {
    var btns = document.getElementsByClassName("header__menu__btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("header__menu__btn--active");
            current[0].className = current[0].className.replace(" header__menu__btn--active", "");
            this.className += " header__menu__btn--active";
        });
    }
}

/**
 * open/close download options
 */
function showOptions() {
    var x = document.getElementById("select");
    if (x.style.display === "none" || x.style.display === '') {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function loadImages() {
    // If we don't have support for intersection observer, loads the images immediately
    var images = document.querySelectorAll('.lazy-image');

    if (!('IntersectionObserver' in window)) {
        loadImagesImmediately(images);
    } else {
        // Get all of the images that are marked up to lazy load
        var imageCount = images.length;

        var config = {
            // If the image gets within 50px in the Y axis, start the download.
            rootMargin: '50px 0px',
            threshold: 0.3
        };

        // The observer for the images on the page
        var observer = new IntersectionObserver(onIntersection, config);
        // foreach() is not supported in IE
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            if (image.classList.contains('js-lazy-image--handled')) {
                continue;
            }
            observer.observe(image);
        }

        function onIntersection(entries) {
            // Disconnect if we've already loaded all of the images
            if (imageCount === 0) {
                observer.disconnect();
            }
            // Loop through the entries
            entries.forEach(function(entry) {
                // Are we in viewport?
                if (entry.intersectionRatio > 0) {
                    imageCount--;
                    console.log('Intersection Observer trigger!');
                    // Stop watching and load the image
                    observer.unobserve(entry.target);
                    preloadImage(entry.target);
                }
            });
        }
    }
}

/**
 * Load all of the images immediately
 * @param {NodeListOf<Element>} images 
 */
function loadImagesImmediately(images) {
    // foreach() is not supported in IE
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      preloadImage(image);
    }
  }

/**
 * Preloads the image
 * @param {object} image
 */
function preloadImage(image) {
    var src = image.dataset.src;
    // console.log('SRC:', src);
    // console.log('Image:', image.dataset.srcset);
    // lazy loading with responsive image
    if (image.dataset.srcset) {
        var splitSrcSet = image.dataset.srcset;
        var srcSets = splitSrcSet.split(",");
        var sets = [];
        for (var i = 0; i < srcSets.length; i++) {
            sets.push(srcSets[i].split(" "));
        }
        // get image based on width's window
        if (window.innerWidth <= sets[1][1] && window.innerWidth >= sets[0][1]) {
            src = sets[1][0];   // 1024
        }else if( window.innerWidth < sets[0][1]) {    // 640
            src = sets[0][0];
        }else { // > 1400
            src = sets[2][0];
        }
    }
    // console.log('SRC final: ', src);
    if (!src) {
        return;
    }
    if (window.Promise) {   // Promises supported!
        return fetchImage(src).then(function() { applyImage(image, src); });
    }else {                 // Promises not supported!
        applyImage(image, src);
    }
}

/**
 * Apply the image
 * @param {object} img
 * @param {string} src
 */
function applyImage(img, src) {
    // Prevent this from being lazy loaded a second time.
    img.classList.add('lazy-image--handled');
    
    if (img.src) {  // for tag 'img'
        img.src = 'assets/' + src;
    }else {         // for 'div' with background-image
        img.style.backgroundImage = "url('assets/" + src + "')";
        img.alt = 'other thumb';
    }
    img.classList.add('fade-in');
}

/**
 * Fetchs the image for the given URL
 * @param {string} url
 */
function fetchImage(url) {
    return new Promise(function(resolve, reject) {
        var image = new Image();
        image.src = 'assets/' + url;
        image.onload = resolve;
        image.onerror = reject;
});
}


/**
 * Toggle class to open/close menu mobile
 */
function openCloseMenu() {
    document.getElementsByClassName('header__menu-mobile')[0].classList.toggle('header__menu-mobile--open');
}