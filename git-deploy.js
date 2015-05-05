/*
  @method gitPull
  Takes a flightplan instance and transport
  @param remote {Object} Flightplan transport instance
  @param webRoot {string} path to run git pull on the remote server
   e.g. /var/www/project
*/
var gitPull = function (remote, webRoot) {
  // git pull
  remote.with('cd ' + webRoot, function() {
    remote.exec('git pull');
  });
};

/*
  @method addToPlan
  Takes a flightplan instance and adds a task called gitDeploy
  @param plan {Object} Flightplan instance
  @param plan.runtime.options.webRoot {String} Remote path to run git pull
*/
var addToPlan = function (plan) {
  // Plan to git deploy via ssh remote
  var webRoot = plan.runtime.options.webRoot;

  plan.remote('gitDeploy', function(remote) {
    remoteGitDeploy(remote, webRoot);
  });
};

module.exports = {
  addToPlan: addToPlan,
  remoteGitDeploy: remoteGitDeploy
};
