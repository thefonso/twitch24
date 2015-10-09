"use strict";

define(function() {
  //constructor
  function Codelib(a,b){
    // if u had passed vars
    this.b = b;
    this.a = a;
  }

  //methods
  Codelib.prototype.code = function(a, b) {
    return (a + b);
  };

  //methods
  Codelib.prototype.gotjson = function() {
     return $.getJSON("https://api.twitch.tv/kraken/streams/MedryBW");
    //TODO make a .done and.fail here
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

    return streamers;
  };

  return Codelib;
});