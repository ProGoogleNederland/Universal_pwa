"use strict";

//register a service worker

if ('serviceWorker' in navigator) {

  // sw.js can literally be empty, but must exist

  navigator.serviceWorker.register('pwa/sw.js');

}

