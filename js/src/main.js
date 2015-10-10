"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO split into online and offline methods, return local array 4 each

  function online(){
    console.log('called online');
    //foreach item in channels
    codeLib.channels().forEach(function(item){
      console.log(item);
      // run gotJSON
      codeLib.gotjson(item).done(function(result){
        var onlinearray  = [];
        //if stream is not null add to onlinearray
        if (result.stream != null) {
          // push into offline array
          onlinearray.push(item);
          console.log('ONLINE array: ' + onlinearray);
        }
        return onlinearray;
      });

    });
  }

  console.dir(online());

  $(document).ready(function(){
    //for each name in channels display name

    codeLib.channels().forEach(function(item){
      var node = document.createElement('li');
      var textnode = document.createTextNode(item);
      node.appendChild(textnode);
      document.getElementById("allchannels").appendChild(node);
    });

    //console.dir(online());

    //online().forEach(function(item){
    //  console.log(item);
    //  var node = document.createElement('li');
    //  var textnode = document.createTextNode(item);
    //  node.appendChild(textnode);
    //  document.getElementById("onlinechannels").appendChild(node);
    //});

  });


});
