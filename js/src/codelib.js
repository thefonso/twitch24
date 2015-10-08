"use strict";
define(function() {
  //constructor
  function Codelib(a,b){
    // if u had passed vars
    this.a = a;
    this.b = b;

  }

  //methods
  Codelib.prototype.code = function(a, b) {
    return (a + b);
  };

  //methods
  Codelib.prototype.gotjson = function(){
    var result = $.getJSON("https://api.twitch.tv/kraken/streams/MedryBW")
        .done(function(data){
          return data;
        })
        .fail(function(jqxhr, textStatus, error){
          var err = textStatus + ", " + error;
          console.log( "Request Failed: " + err );
    });
    return result;
  };

  return Codelib;
});