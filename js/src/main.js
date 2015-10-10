"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO split into online and offline methods, return local array 4 each

  function online(item){
      codeLib.gotjson(item)
      .done(function(result) {
        if(result.stream != null) {
          // do stuff
          var node = document.createElement('li');
          var textnode = document.createTextNode(item);
          node.appendChild(textnode);
          document.getElementById("onlinechannels").appendChild(node);
        }
      })
      .fail(function(x) {
            // Tell the user something bad happened
      });
  }

  function offline(item){
    codeLib.gotjson(item)
        .done(function(result) {
          if(result.stream == null) {
            // do stuff
            var node = document.createElement('li');
            var textnode = document.createTextNode(item);
            node.appendChild(textnode);
            document.getElementById("offchannels").appendChild(node);
          }
        })
        .fail(function(x) {
          // Tell the user something bad happened
        });
  }

  $(document).ready(function(){
    //for each name in channels display name
    codeLib.channels().forEach(function(item){
      var node = document.createElement('li');
      var textnode = document.createTextNode(item);
      node.appendChild(textnode);
      document.getElementById("allchannels").appendChild(node);
    });

    codeLib.channels().forEach(function(item){
      online(item);
    });

    codeLib.channels().forEach(function(item){
      offline(item);
    });
  });


});
