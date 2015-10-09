"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  $(document).ready(function(){
    var codeLib = new Codelib();

    //for each name in channels display name
    codeLib.channels().forEach(function(item){
      document.getElementById("channels").innerHTML = item;
    });

  });
});
