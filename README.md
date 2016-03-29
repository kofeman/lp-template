# Landing page template

###1. Start project:

1. `git clone https://github.com/kofeman/lp-template.git`
2. `mv lp-template/{.,}* .; rmdir lp-template`
3. `npm i; bower i`
4. `gulp`

###2. Add your lp images

1. Save images to the 'images' folder 
2. Save icons to the 'images/i' for generate sprite

###3. Add some html

####Use bootstrap jade mixins 

1. jade-bootstrap webpage - http://rajasegar.github.io/JADE-Bootstrap/components.html
2. github repo - https://github.com/rajasegar/JADE-Bootstrap

####Use bemto naming

https://www.npmjs.com/package/bemto.jade 

###4. Add styles

1. In bower_components/bootstrap-less/less/variables customize bootstrap styles
2. In app/less/style.less write less-styles for sections and elements using bem-naming

###5. Add js

1. Customize 'bootstrap-js' task in gulpfile.js
2. add js files to 'js' folder and edit 'js' task in gulpfile.js



