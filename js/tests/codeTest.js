"use strict";
define(['Codelib','jquery'], function(Codelib,$){
  var run = function(){
    QUnit.test('code should return the sum of the two supplied numbers.',function(assert){
      var codelib = new Codelib();
      assert.equal(codelib.code(1,1),2, 'The return should be 2.');
      assert.equal(codelib.code(-2,1),-1, 'The return should be -1.');
    });

    QUnit.test("As a user, I can see whether Free Code Camp is currently streaming on Twitch.tv",function(assert){
      var codelib = new Codelib();
      //qunit needs this assert.async() to make asycronus test
      var done = assert.async();
      var channel = "freecodecamp";
      //run the .done call back here to test result
      codelib.gotjson(channel).done(function(result){
        assert.notEqual(result.stream,null, 'should not be true');
        done();
      });

    });

    QUnit.test("I can see an array of channel names",function(assert){
      var codelib = new Codelib();
      assert.ok(codelib.channels() instanceof Array,'should contain array')
    });
    QUnit.skip("I can return an array list of offline streamers ",function(assert){
      var codelib = new Codelib();
    });

    QUnit.skip("As a user, I can change the list of 24 channels");

    QUnit.skip("As a user, I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel");

    QUnit.skip("As a user, if Free Code Camp is streaming, I can see additional details about what they are streaming.");

    QUnit.skip("As a user, I can search through the streams listed.");

    QUnit.skip("As a user, I will see a placeholder notification if a streamer has closed their Twitch account. You can verify this works by adding brunofin and comster404 to your array of Twitch streamers.");


  };
  return {run: run}
});

