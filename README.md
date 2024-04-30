# three.js.components #

Working through three.js tutorials to become fluent in programming in &Ropf;³. :)

Good tutorial: https://www.youtube.com/playlist?list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho


## How to run ##

- Check if three.js and parcel are installed:

```
npm list
```

We use _parcel_ as a almost zero config build tool. Install parcel in your working directory:

```
npm install --save-dev parcel
```

Install _three_ with 

```
npm install three
```

- Ensure to add "source": "index.html" in the package.json file of your project.

- Now run the server through with a simple parcel command in your project directory:

```
npx parcel index.html 
```

Parcel will announce "Server running at http://localhost:1234" and will hotload all your changes immediately.

## What we need furthermore ##

[dat.gui](https://github.com/dataarts/dat.gui) - A lightweight graphical user interface for changing variables in JavaScript.

```
npm install dat.gui
```

## Further documentation ##

See: https://parceljs.org/getting-started/webapp/ for details concerning installation and https://parceljs.org/features/cli for CLI commands.

## Known problems / workarounds in three.js

**- Objects do not appear to be correctly illuminated?** Try both materials: MeshBasicMaterial and MeshStandardMaterial. 
