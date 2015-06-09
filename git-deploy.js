/*
  @method gitPull
  Takes a flightplan instance and transport
  @param remote {Object} Flightplan transport instance
  @param webRoot {string} path to run git pull on the remote server
  @param [gitIdentifier=master] {string} branch/tag/commit identifier
   e.g. /var/www/project
*/
var gitPull = function (remote, webRoot, gitIdentifier) {
  // git pull
  var gitIdentifier = gitIdentifier || 'master';
  remote.with('cd ' + webRoot, function() {
    remote.exec('git pull');
    remote.exec('git checkout ' + gitIdentifier);
  });
};

/*
  @method addToPlan
  Takes a flightplan instance and adds a task called gitDeploy
  @param plan {Object} Flightplan instance
  @param plan.runtime.options.webRoot {String} Remote path to run git pull
*/
var addToPlan = function (plan) {
  // Task to git deploy via ssh remote
  plan.remote('gitDeploy', function(remote) {
    var webRoot = plan.runtime.options.webRoot;
    gitPull(remote, webRoot);
  });
};

module.exports = {
  addToPlan: addToPlan,
  gitPull: gitPull
};
