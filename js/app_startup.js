require(["config", "storage"], function(config, Storage){

  var history = Storage.getHistory();
  history.newSession();
  
});
