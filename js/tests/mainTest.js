"use strict";
define(['Codelib','src/main','jquery'], function(Codelib,Main,$){

  var run = function(){
    QUnit.test("I can see an array of channel names",function(assert){
      var codelib = new Codelib();
      assert.ok(codelib.channels() instanceof Array,'should contain array')
    });
  };
  return {run: run}

});

