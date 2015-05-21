# Generator Vision

Yeoman generator that scaffolds out a front-end web app, based on the official and Yawa generator [webapp generator](https://github.com/yeoman/generator-webapp).

## Dependencies

This project depends on a few others that needs to be installed seperatly :
- To run
  - `yo` (install : `npm install -g yo`)
- To be usefull (ie: to run the project scaffolded with it)
  - `grunt` (install : `npm install -g grunt-cli`)
  - `compass` (install : `gem install compass`)

## Getting Started

- Install: `npm install -g generator-vision`
- Run:  `yo yawa`
- Run:  `npm install` (TODO: Auto install not working)
- Run:  `bower install` (TODO: Auto install not working)
- Run:  `grunt build` for building and `grunt server` for preview

## Scaffolding

- app
    - bower_components  (dependencies)
    - fonts
    - images
    - scripts
    - styles
        - components           (*"-c" Reusable bem modules*)
        - lib                  (*Mixins, Placeholders, Animations...*)
        - objects              (*"-o" may be used in any number of unrelated contexts to the one*)
        - _helpers.scss        (*Inuitcss helper to controll padding and margin with !important*)
        - _styleguide.scss     (*Bootstrap styleguide*)
        - _textures.scss       (*Theme and design stuff*)
        - _vars.scss           (*Variables*)
        - _main.scss           (*Import the whole project*)
    - templates
        - layouts
        - pages
        - partials

# Workflow

- [Namespaces] (http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [Bem] (https://gist.github.com/ingdir/0b211b9253c376f9cfa5)

## Features
* Built-in preview server with Browser Sync
* [Assemble](https://github.com/assemble/assemble)
* CSS Autoprefixing (new)
* Automagically compile CoffeeScript & Compass
* Automagically lint your scripts
* Automagically wire up your Bower components. Supported both [with](https://github.com/yeoman/grunt-bower-requirejs) and [without](https://github.com/stephenplusplus/grunt-bower-install) (new) RequireJS.
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Mocha Unit Testing with PhantomJS
* Optional - RequireJS
* Optional - Official Bootstrap for SASS


## Contribute

If you find a bug or woud like to see a new feature added, please fill an issue here on github or even better, send a pull request.

## Author

YAWA Generator is brought to you by [Jeremie Parker](http://jeremie-parker.com) and made possible by the awsome work of all the opensource community around 
Yeoman, Grunt, Bootstrap, Groundwork etc...

Forked by [Vision Click] (https://github.com/visionclick)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
