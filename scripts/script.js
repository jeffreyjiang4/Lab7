// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

//when setting is clicked
const setting = document.getElementById('settingImage');
setting.addEventListener('click', () => {
  if (window.location.hash != "#settings") {
    console.log(window.location.hash);
    history.pushState({'name': 'settings_page'}, '', '#settings');
    document.querySelector("body").classList.add("settings");
    document.getElementById('mainName').innerText = 'Settings';
  }
});

//when an entry is clicked
const entryList0 = document.querySelector('main').getElementsByTagName('journal-entry');
const entryList = Array.from(entryList0);
//const entryList = mainElem.querySelectorAll('journal-entry');
/*entryList.forEach((element, index) => {
  element.addEventListener('click', () => {
    console.log('works');
  });
});*/

//back / forward buttons
window.onpopstate = function() {
  if (window.location.hash == '') {
    document.querySelector('body').className = '';
    document.getElementById('mainName').innerText = 'Journal Entries';
  }
  if (window.location.hash == '#settings') {
    document.querySelector('body').className = '';
    document.querySelector('body').classList.add("settings");
    document.getElementById('mainName').innerText = 'Settings';
  }
}

//click the main heading
const mainHeading = document.getElementById('mainName');
mainHeading.addEventListener('click', () => {
  history.back();
});

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
  console.log(entryList0.length);
  //handle reload
  if (window.location.hash == "#settings") {
  //history.pushState({'name': 'settings_page'}, '', '#settings');
    document.querySelector("body").classList.add("settings");
    document.getElementById('mainName').innerText = 'Settings';
  }
});

