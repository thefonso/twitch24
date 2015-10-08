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
    var result = $.getJSON("https://api.twitch.tv/kraken/streams/MedryBW",function(json){
      if (json.length==0){
        console.log('error no json');
        console.dir(json);
        return json;
      }else{
        console.log('got json: ');
        console.dir(json);
        return json;
      }
    });
    return result;
  };

  return Codelib;
});