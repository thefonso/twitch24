"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  $(document).ready(function(){
    //TODO rebuild as fullstack MEAN app so env var can be set and
    // OAuth can be used...since the next line is evil.
    var client_id = '?client_id=l91ohh8zyji3s3xztrc3w5j8r21wuak&callback=?';

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

// TODO refactor. remove repetition. make SOLID.

    codeLib.addClickHandler("getOnline", function(){
      codeLib.getChannels().forEach(function(item){
        codeLib.online(item,client_id);
      });
    });

    codeLib.addClickHandler("getOffline", function(){
      codeLib.getChannels().forEach(function(item){
        codeLib.offlineOnly(item,client_id);
      });
    });

    codeLib.addClickHandler("getAll", function(){
      codeLib.getChannels().forEach(function(item){
        codeLib.showAll(item,client_id);
      });
    });

    codeLib.addClickHandler("aboutPage", function(){
        codeLib.aboutPage();
    });

    codeLib.addClickHandler("search", function(){
        codeLib.search4more();
    });
  });
});
