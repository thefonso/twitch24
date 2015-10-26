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
//  TODO - extract to json file...so you can write to that file later?
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


  Codelib.prototype.setChannels = function(array){
    array.forEach(function(element,index){
      localStorage.setItem(index, element);
    });
  };

  Codelib.prototype.getChannels = function(){
    //window.localStorage
    //localStorage.getItem(index);
    var newChannels = [];
    for(var item in window.localStorage){
      newChannels.push(window.localStorage[item])
    }
    //console.log(newChannels);
    return newChannels;
  };

  return Codelib;
});