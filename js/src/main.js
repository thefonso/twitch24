"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  $(document).ready(function(){
    //TODO rebuild as fullstack MEAN app so env var can be set and OAuth can be used...since the next line is evil.
    var client_id = '?client_id=l91ohh8zyji3s3xztrc3w5j8r21wuak&callback=?';

  //TODO read default channels into localStorage on first load
    if (window.localStorage.length == 0){
      var array_of_channels = [];
      codeLib.default_channels().forEach(function(item){
        array_of_channels.push(item);
      });
      codeLib.setChannels(array_of_channels);
      codeLib.getChannels().forEach(function(item){
        codeLib.showAll(item,client_id);
      });
    }else{
      codeLib.getChannels().forEach(function(item){
        codeLib.showAll(item,client_id);
      });
    }


// TODO refactor using jquery. remove repetition.
    document.getElementById("getOnline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        codeLib.online(item,client_id);
      });
    });

    document.getElementById("getOffline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        codeLib.offline(item,client_id);
      });
    });

    document.getElementById("getAll").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        codeLib.showAll(item,client_id);
      });
    });

    document.getElementById("updateList").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.channelForm();
    });

    document.getElementById("search").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.search4more();
    });

  });


});
