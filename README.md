To roll back your repo, go to history, right click and select the revert option

Webpack

install npm init -y - this will give you your package.json file
install webpack webpack-cli - this will add node modules folder

remember to add dist and node_modlues folder to git ignore or it can't be undone later

in package.json you have to add:
    "start": "webpack serve",
    "build": "webpack"

You need to install some dependencies for webpack to work in an html/css context:

    "clean-webpack-plugin"
    "css-loader"
    "html-loader"
    "html-webpack-plugin"
    "style-loader"
    "terser-webpack-plugin"
    "webpack"
    "webpack-cli"
    "copy-webpack-plugin"


You need to find a simple wepback.config.js file out there. If you don't have one npm run build will throw an error.
The config file needs to work with the html-webpack-plugin

Keep in mind, when you create the index.html, you don't need to use the script tag to embed the index.js into the index.html. it is automatic because of the webpack.

To get the css to work, you also don't put it into the html. You put import './main.css'; into the index.js

In some BG examples there is a bunch of crap written after build and start in the package.json. You don't need any of this unless you are specifying a config file.

In order to not have to type npm run build every time, install: npm install --save-dev webpack-dev-server
then type npm start (sometimes you have to do an npm run build first not sure why)
from now on just saving a file will send it to the dist

at the top of webpack is a thing that figures out whether you are using build or start
this turns the obfuscation on and off

sometimes building and running the server will cause annoying conflicts
also there is an annoying condition that changes the path in the web config from ./ to / sometimes. no idea why but important.

when you run the server from start, the terminal window will not be wrtitable. you must make a new terminal window to do other stuff (though you probably wont need to)
in order to cancel the server, press control+c then press y for yes

for now the terser is off because it mangles the varibles into weird things



REASONS FOR USING WEBPACK

It converts modern JS code - which can only be understood by modern browsers - into older versions of JavaScript so that older browsers can understand your code. This process is known as transpiling. For example, you can transpile ES7 code to ES5 code using webpack.  

It optimizes your code to load as quickly as possible when a user visits your web pages. 

It can process your SCSS code into the regular CSS, which browsers can understand. 

It can build source maps of the bundle's building blocks  

It can produce various kinds of files based on rules and templates. This includes HTML files, among others. 
