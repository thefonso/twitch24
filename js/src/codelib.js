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

//TODO - use this to grab the top games
//  Codelib.prototype.gottop = function() {
//    return $.getJSON("https://api.twitch.tv/kraken/games/top")
//  };

   Codelib.prototype.channels = function(){
    var streamers = [

      'habathcx', //yes
      'terakilobyte',
      'freecodecamp', //yes
      'medrybw', //yes
      'thomasballinger',
      'noobs2ninjas', //yes
      'RobotCaleb',
      'beohoff', //yes
      'GeoffStorbeck', //yes
      'leagueoflegends',
      'ThunderCast'
      //'comster404',
      //'brunofin'
    ];

    //show all
    //show online - and - what is streaming

    //show offline
    Codelib.prototype.offline = function(channel){

    };

    return streamers;
  };

  return Codelib;
});