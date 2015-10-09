"use strict";
define(['src/main','jquery'], function(Main,$){
  var run = function(){
    QUnit.skip('display array values on main page',function(assert){
      //var codelib = new Codelib();
      //assert.equal(codelib.code(-2,1),-1, 'The return should be -1.');
    });
  };
  return {run: run}
});

