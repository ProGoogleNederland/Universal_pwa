# Universal_pwa
Makes any CMS or Website PWA supported. Simply add installer option to your site, converting your site to a fullscreen app! All android and iOS browsers are supported

Add next 2 lines before closing <\/head> tag


```
<link rel="manifest" href="pwa/manifest.json" />
<script src="pwa/app.js" defer></script>
```

Upload pwa folder to root of your public_html
open manifest.json in the pwa folder and change to your liking the next 3 lines

```
"name": "Long website name",
"short_name": "Short name",
"description": "Add your description here",
```
Make new icons with <a href="https://maskable.app/editor">this online tool</a>
and replace any-icon.png and markable-icon.png in pwa folder
best resolution: </br> ```192px x 192px 300dpi``` 

CLEAR CACHE </br>
go to any page ony your site</br>
you should now see an Install option in your mobile browser menu


