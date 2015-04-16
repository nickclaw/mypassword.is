express-seed
------------

## Features
1. Useful global variables
  1. `C` - current configuration
  2. `Log` - [Winston](https://github.com/winstonjs/winston) logger instance
2. [Bluebird](https://github.com/petkaantonov/bluebird) promises
3. [Babel](http://babeljs.io/)
  1. Use es6 features now
  2. [Experimental](http://babeljs.io/docs/usage/experimental/) features enabled.
4. Environment support
  1. Have different settings for development, testing, and production.

## Setup
```shell
npm install
bower install
# modify config/{development,testing,production}.json
grunt
```

## Environments
You can change the environment your app runs in by setting the `NODE_ENV` variable in your environment. Both `npm start` and `grunt default` will run your app in the `development` environment, while `npm test` will use `testing`.

## Modifying

The master branch of this repository tries to assume as little as possible about the rest of your stack, choosing to give a very simple starting point to build around. Some tips to make development easier while flushing out the rest of your stack..

##### Database
1. Create a `server/database.js` file to contain useful database-related function, __and__ that exports all your models, then you can do this in your routers to easily access your models.
        var {User, Item}  = require('./path/to/database'))

2. Have your `server/database.js` file's `module.exports` be a promise that resolves once the database has successfully connected. Then the worker process can safely suicide if the app cannot be run.

##### Angular
1. Install all front-end dependencies using `bower install --save <packages>`. You can then include them in your html from `/static/lib/<package>/file.js`.

2. Put all external templates in the `public/src/template/` directory, the Gruntfile htmlmin task depends on them being there.

##### React
1. Install React and other front-end dependencies through the npm, use [browserify](https://github.com/substack/node-browserify) as either a grunt task or express middleware to package them.

2. Use [react-router](https://github.com/rackt/react-router) to route your actual pages.

```js
// public/src/script/app.js
// code above ommited

if (typeof window === undefined) {
    Router.run(routes, Router.HistoryLocation, (Handler, state) => {
        React.render(<Handler routerState={state}/>, document.body);
    });
} else {
    module.exports = (req, res) => {
        Router.run(routes, req.url, (Handler, state) => {
            res.render(__dirname + '/template.ejs', {
                content: React.renderToString(<Handler routerState={state}/>)
            });
        });
    };
}

// server/app.js
// code above ommited
// last app.use!
app.use( require('../public/src/script/app') )
```
