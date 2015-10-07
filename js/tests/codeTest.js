"use strict";
define(['src/codelib'], function(codelib){
  var run = function(){
    test('codelib should return the sum of the two supplied numbers.',function(){
      equal(codelib(1,1),2, 'The return should be 2.');
      equal(codelib(-2,1),-1, 'The return should be -1.');
    });
  };
  return {run: run}
});
