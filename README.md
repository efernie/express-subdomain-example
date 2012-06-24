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

  This file is the main routing file.

  ```javascript
    var express = require('express')
      , ENV = process.env['NODE_ENV'] || 'development'
      , config = require('./config')[ENV]
      // The express server to listen for the subdomains
      , app = express.createServer()
      // The main application
      , home = require('./lib/home/home')(__dirname)
      // The example subdomain
      , projects = require('./lib/projects/projects')(__dirname)
      ;

    // Main application
    app.use(express.vhost('localhost', home));

    // Example sub domain
    app.use(express.vhost('projects.localhost', projects));

    app.listen(config.port, function () {
      var addr = app.address();
      console.log(('   app listening on http://' + addr.address + ':' + addr.port));
    });
  ```
