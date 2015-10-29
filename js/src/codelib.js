"use strict";

define(function() {
  //constructor
  function Codelib(a,b){
    // if u had passed vars, maybe future channel names
    this.b = b;
    this.a = a;
  }

  //test method
  Codelib.prototype.code = function(a, b) {
    return (a + b);
  };

  //methods
  Codelib.prototype.gotjson = function(apiurl,channel,client_id) {
    return $.getJSON("https://api.twitch.tv/kraken/"+apiurl+"/"+channel+client_id)
  };



//  TODO - use this to grab the top games
//  Codelib.prototype.gottop = function() {
//    return $.getJSON("https://api.twitch.tv/kraken/games/top")
//  };

//  TODO - save via local storage !!
  Codelib.prototype.default_channels = function(){

    var channels = [
      'habathcx',
      'terakilobyte',
      'freecodecamp',
      'medrybw',
      'thomasballinger',
      'noobs2ninjas',
      'RobotCaleb',
      'beohoff',
      'GeoffStorbeck',
      'leagueoflegends',
      'ThunderCast',
      'esl_csgo',
      'summit1g',
      'izakooo',
      'comster404',
      'sodapoppin',
      'stormstudio_csgo_ru',
      'imaqtpie'
      //'comster404',
      //'brunofin'
    ];

     return channels;
  };

//TODO - display 24 channels via localStorage.getItem
//TODO - set onclick for "update"

  Codelib.prototype.setChannels = function(array){
    array.forEach(function(element,index){
      localStorage.setItem(index, element);
    });
  };

  Codelib.prototype.getChannels = function(){

    var newChannels = [];
    for(var item in window.localStorage){
      newChannels.push(window.localStorage[item])
    }

    return newChannels;
  };

  Codelib.prototype.channelForm = function(){

    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var value = localStorage[key];

      var channel = document.createElement('div');
      channel.setAttribute('class','channel col-md-2');

      var inputElementOne = document.createElement('input');
      inputElementOne.type = "text";
      inputElementOne.id = key;
      inputElementOne.value = value;

      var inputElementTwo = document.createElement('input');
      inputElementTwo.type = "button";
      inputElementTwo.value = "update";
      (function (i){
        inputElementTwo.addEventListener('click', function(){
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i,newValue);
          alert("updated: "+newValue);
        });
      })(i);

      document.getElementById("onlinechannels").appendChild(channel).appendChild(inputElementOne);
      document.getElementById("onlinechannels").appendChild(channel).appendChild(inputElementTwo);
    }


  };

  Codelib.prototype.searchgames = function(ask){
    return $.getJSON("https://api.twitch.tv/kraken/search/streams?limit=10&offset=10&query="+ask)
        .done(function(result){
          //alert(result);
          console.dir(result.streams);
          result.streams.forEach(function(node){
            console.dir(node.channel.display_name);
            var channel_name  = node.channel.display_name;
            var game_name     = node.game;
            var followers     = node.channel.followers;

            var div           = document.createElement('div');
            var uList         = document.createElement('ul');
            var listItem      = document.createElement('li');
            var channel = document.createTextNode(channel_name);

            document.getElementById("searchDiv").appendChild(uList).appendChild(listItem).appendChild(channel);
          });


        })
        .fail(function (result) {
          // Tell user of error
          console.log("error occured: "+result.statusText);
        })
  };

  Codelib.prototype.search4more = function(client_id){
    var oneColumn = document.createElement('div');
    oneColumn.setAttribute('class','search col-md-6');
    oneColumn.setAttribute('id','searchDiv');
// TODO: type game in search field,

// TODO: add a channel to current list

      var uList     = document.createElement('ul');
      var listItem  = document.createElement('li');

      var inputElementOne = document.createElement('input');
      inputElementOne.type = "text";
      inputElementOne.id = 'searchBox';
      inputElementOne.value = 'starcraft';

      var inputElementTwo = document.createElement('input');
      inputElementTwo.type = "button";
      inputElementTwo.value = "go";

    document.getElementById("onlinechannels").appendChild(oneColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementOne);
    document.getElementById("onlinechannels").appendChild(oneColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementTwo);

      (function () {
        inputElementTwo.addEventListener('click', function () {
          // TODO: see result channels for that game under search field
          // TODO: game_name, channel, followers
          var ask = document.getElementById('searchBox').value;
          Codelib.prototype.searchgames(ask);

        });
      })();

    //TODO col2 see all current channel names
    var twoColumn = document.createElement('div');
    twoColumn.setAttribute('class','channels col-md-6');
    twoColumn.setAttribute('id','channels');

    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var value = localStorage[key];
      var uList     = document.createElement('ul');
      var listItem  = document.createElement('li');

      var inputElementOne = document.createElement('input');
      inputElementOne.type = "text";
      inputElementOne.id = key;
      inputElementOne.value = value;

      var inputElementTwo = document.createElement('input');
      inputElementTwo.type = "button";
      inputElementTwo.value = "update";
      (function (i) {
        inputElementTwo.addEventListener('click', function () {
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i, newValue);
          alert("updated: " + newValue);
        });
      })(i);

      document.getElementById("onlinechannels").appendChild(twoColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementOne);
      document.getElementById("onlinechannels").appendChild(twoColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementTwo);
    }

  };

  return Codelib;
});