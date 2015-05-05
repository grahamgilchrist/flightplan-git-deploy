// include flightplan.js
var plan = require('flightplan');

// Plan to git deploy via ssh remote
plan.remote('gitDeploy', function(remote) {
  var webRoot = plan.runtime.options.webRoot;

  // git pull
  remote.with('cd ' + webRoot, function() {
      remote.exec('git pull');
  });
});
