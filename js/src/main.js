"use strict";
// AMD module pattern
define(['Codelib', 'jquery'], function (Codelib, $) {
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  $(document).ready(function () {
    // TODO APP STARTS HERE
    // This will be our UseState...
    // rebuild as a React app so env var can be set and
    // OAuth can be used...since the next line is evil.

    //codeLib.callAjax(AJAXProps)

    // TODO this block is the entire main app
    var callback = '?callback=?';//I don't recall why this is here
    //check if local storage is empty
    if (window.localStorage.length == 0) {
      var array_of_channels = [];
      codeLib.default_channels().forEach(function (item) {
        array_of_channels.push(item);//
      });
      codeLib.setChannels(array_of_channels);//put list of defaults into localStorage
      codeLib.getChannels().forEach(function (item) {
        codeLib.showAll(item, callback); //show each channels info
      });
    } else {
      codeLib.getChannels().forEach(function (item) {
        codeLib.showAll(item, callback); //just show the channels in memory
      });
    }

    // TODO This next block adds links to display pages.
    // these are like your react components being
    // swapped in and out based on which is clicked

    codeLib.addClickHandler("getOnline", function () {
      codeLib.getChannels().forEach(function (item) {
        codeLib.online(item, callback);
      });
    });

    codeLib.addClickHandler("getOffline", function () {
      codeLib.getChannels().forEach(function (item) {
        codeLib.offlineOnly(item, callback);
      });
    });

    codeLib.addClickHandler("getAll", function () {
      codeLib.getChannels().forEach(function (item) {
        codeLib.showAll(item, callback);
      });
    });

    codeLib.addClickHandler("aboutPage", function () {
      codeLib.aboutPage();
    });

    codeLib.addClickHandler("search", function () {
      codeLib.search4more();
    });
  });
});
