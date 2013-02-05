# Subdomain example
### This is an example of how to use subdomains with express for a node application.


  For the purpose of this demo is to show you how to set up a node application with sub domains. Also to show you how to organize the application logic for each domain.

---

## First Steps
1. Set up project directory

  ```
  --client
  ----assets
  ------css
  ------img
  ------js
  ----src
  ------js
  --server
  ----lib
  ------main application
  ------some subdomain name
  ----node_modules
  ----views
  ------main application
  ------some subdomain name
  ```

2. Install express ```npm install express```

3. Configure host file
  Set the host file to point to the ip of the localhost
  eg: 0.0.0.0 projects.localhost

## Sample Application
1. Set up config file
  ```javascript
    exports.development = {
      port : 3000
    };

    exports.production = {
      port :  80
    };
  ```

2. The index.js file

  This file is the main routing file. You require the standard stuff, like express the enviorment and config. Also define the app var to create the server. Then require the subdomain servers, because they are defined as modules under the lib folder. Also I am including the base directory when I pass it along to the subdomains. Then have this listen on what ever port you choose.

  ```javascript
    var express = require('express'),
        ENV = process.env['NODE_ENV'] || 'development',
        config = require('./config')[ENV],
      // The express server to listen for the subdomains
        app = express(),
      // The main application
        home = require('./lib/home/home')(__dirname),
      // The example subdomain
        projects = require('./lib/projects/projects')(__dirname);

    // Main application
    app.use(express.vhost('localhost', home));

    // Example sub domain
    app.use(express.vhost('projects.localhost', projects));

    app.listen(3000, function () {
      var addr = app.address();
      console.log(('app listening on http://' + addr.address + ':' + addr.port));
    });
  ```

3. Set up the main application.

    This file is simply called ```home.js```. In this file I am using jade views to handle the html pages. Also seperating the router in a routes.js file.

    ```javascript
      module.exports = function (dir) {

        var express = require('express'),
            ENV = process.env['NODE_ENV'] || 'development',
            app = express(),
            publicDir = dir + '/../client';

        //  Set the view directory to where this subdomain views are located.
        app.set('views', dir + '/views/home')
          .set('view options', { 'layout': false, pretty: true })
          .set('view engine', 'jade');


        app.use(express.bodyParser())
           .use(express.cookieParser())
           .use(express.favicon());

        app.use(express.static(publicDir));

        // Router
        app.use(app.router);

        require('./index')(app);

        // Return the server
        return app;
      };
    ```

  This is the index.js file

  ```javascript
    module.exports = function () {
      require('./routes').apply(this, arguments);
    };
  ```

  This is the routes file

  ```javascript
    var ENV = process.env['NODE_ENV'] || 'development',
        config = require('../../config')[ENV];


    module.exports = function (app) {

      // Index Page
      app.get('/', function(req, res) {
        res.render('index');
      });

    }
  ```

4. Do the same thing as for the main application but in the other subdomain folder with different a script name.

5. ```node index.js``` in the server folder. Then checkout projects.localhost to see the subdomain.