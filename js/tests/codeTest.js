"use strict";
define(['src/code'], function(code){
  var run = function(){
    test('dummyLib should return the sum of the two supplied numbers.',function(){
      equal(code(1,1),2, 'The return should be 2.');
      equal(code(-2,1),-1, 'The return should be -1.');
    });
  };
  return {run: run}
});
//QUnit.skip("As a user, I can see whether Free Code Camp is currently streaming on Twitch.tv",function(assert){
//
//});
//
//QUnit.skip("As a user, I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel");
//
//QUnit.skip("As a user, if Free Code Camp is streaming, I can see additional details about what they are streaming.");
//
//QUnit.skip("As a user, I can search through the streams listed.");
//
//QUnit.skip("As a user, I will see a placeholder notification if a streamer has closed their Twitch account. You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.");
//QUnit.test('Pass app as exports.', function (assert) {
//  assert.ok(app.moduleExists(), 'The module exists.');
//});