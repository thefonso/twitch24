"use strict";
requirejs.config({
  paths: {
    jquery: [
      '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery',
      //If the CDN location fails, load from this location
      'lib/jquery/jquery-2.1.4'
    ],
    bootstrap: [
      '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
      //If the CDN location fails, load from this location
      'lib/bootstrap-335/js/bootstrap'
    ],
    'QUnit':'lib/qunit/qunit-1.19.0',
    'Codelib':'src/codelib',
    'Main':'src/main'

  },
  shim: {
    'QUnit':{
      exports: 'QUnit',
      init: function(){
        QUnit.config.autoload = false;
        QUnit.config.autostart = false;
      }
    }
  }
});
//logic file
requirejs(['src/main']);
//require unit test.
requirejs(['QUnit','tests/codeTest','tests/mainTest'],
    function(QUnit,codeTest,mainTest){
    //run tests
    codeTest.run();
    mainTest.run();
    //start QUnit
    QUnit.load();
    QUnit.start();
  }
);