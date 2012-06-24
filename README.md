# Subdomain example
### This is an example of how to use subdomains with express for a node application.

---

  For the purpose of this demo is to show you how to set up a node application with sub domains. Also to show you how to organize the application logic for each domain.

---

## First Steps
1. Set up project directory
  Here is the directory structure:

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
  Set the host file to point to the ip of the localhost "this usually is 0.0.0.0"
  eg: 0.0.0.0 projects.localhost