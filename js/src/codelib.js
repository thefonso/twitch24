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
  Codelib.prototype.gotjson = function(channel) {
    return $.getJSON("https://api.twitch.tv/kraken/streams/"+channel)
  };

  Codelib.prototype.gotjsonusers = function(channel) {
    return $.getJSON("https://api.twitch.tv/kraken/users/"+channel)
  };

  Codelib.prototype.channels = function(){
    var streamers = [
      'freecodecamp',
      'GeoffStorbeck',
      'terakilobyte',
      'habathcx',
      'notmichaelmcdonald',
      'RobotCaleb',
      'medrybw',
      'comster404',
      'brunofin',
      'thomasballinger',
      'joe_at_underflow',
      'noobs2ninjas',
      'mdwasp',
      'beohoff',
      'xenocomagain'
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