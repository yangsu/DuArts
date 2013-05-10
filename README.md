# DuArts

Mobile Web App for Duke Arts

## Installation Instructions

Make sure you have node and npm installed. If you don't have it yet, go to [nodejs.org][Node.js]

```bash
git clone git@github.com:yangsu/DuArts.git
cd DuArts
npm install -d
```
## Running the App

In your application directory

```bash
node app.js
```

* Open up **Chrome** (for the easiest configuration).
* Go to [http://localhost:3000](http://localhost:3000)

## Running the Server

Use `screen` to start the server with the command `supervisor app.js`

To run the server on port 80, simply do `sudo PORT=80 supervisor app.js`

## Notes about DB

The data is collected on the server using `cron`. SSH into the server and using `crontab -e` to edit frequency.

The database resides on the server, which is currently [here](http://colab-sbx-03.oit.duke.edu:3000). The path is set [here](https://github.com/yangsu/DuArts/blob/master/db.js#L5).

## Tech Stack

Backend:

* [Node.js][]
  * [Mongoose][] - MongoDB driver for Node.js
  * [Underscore][] - Utility functions
  * [Async][] - Async Control Flow
  * [Express][] - Web Framework for Node.js
* [MongoDB][] - Document Store
* [Jade][] - Server side html templating
* [Stylus][] - Server side css generator

Frontend:

* [Backbone.js][] - Frontend MVC Framework
* [Ratchet][] - Prototype iPhone Apps

## Resources

### JavaScript

[Duke PL Course JavaScript Slides](http://duke-pl-course.github.com/slides/javascript.html)

[Duke PL Course Resources](http://duke-pl-course.github.com/resources/#javascript)

You can find most of what you need in the page above. Focus on Backbone, jQuery, and Node.js.

### HTML + CSS

[A Beginner's Guide to HTML & CSS](http://learn.shayhowe.com/html-css/)

[An Advanced Guide to HTML & CSS](http://learn.shayhowe.com/advanced-html-css/)

[CSS Guidelines](https://github.com/csswizardry/CSS-Guidelines/)

[Async]: https://github.com/caolan/async
[Backbone.js]: http://documentcloud.github.com/backbone/
[Express]: http://expressjs.com/
[Jade]: http://jade-lang.com
[Mongoose]: http://mongoosejs.com/
[Node.js]: http://nodejs.org/
[Stylus]: http://learnboost.github.com/stylus/
[Underscore]: http://documentcloud.github.com/underscore/
[MongoDB]: http://www.mongodb.org/
[Ratchet]: http://maker.github.com/ratchet/