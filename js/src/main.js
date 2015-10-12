"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO split into online and offline methods, return local array 4 each

  function allchannels(item){
    codeLib.gotjson(item)
        .done(function(result) {
          if(result.stream != null) {
            // onlne code
            console.dir(result.stream);
            console.log(result.stream.game);
            console.log(result.stream.channel.logo);
            console.log(result.stream.channel.status);
            console.log(result.stream.channel.url);
            console.log(result.stream.channel.updated_at);
            var node = document.createElement('li');
            var textnode = document.createTextNode(item);
            node.appendChild(textnode);
            document.getElementById("onlinechannels").appendChild(node);
          }else{
            //offline code
          }
        })
        .fail(function(x) {
          // Tell the user something bad happened
        });
  }

  function online(item){
      codeLib.gotjson(item)
      .done(function(result) {
        if(result.stream != null) {
          // do stuff
          //console.dir(result.stream);

          var channel = document.createElement('div');
          channel.setAttribute('id','channel');

          var name = document.createElement('div');
          name.setAttribute('id','name');
          var textname = document.createTextNode(result.stream.channel.display_name);
          name.appendChild(textname);

          var game = document.createElement('div');
          game.setAttribute('id','game');
          var textgame = document.createTextNode(result.stream.game);
          game.appendChild(textgame);

          var logo = document.createElement('div');
          logo.setAttribute('id','logo');
          var textlogo = document.createTextNode(result.stream.channel.logo);
          logo.appendChild(textlogo);

          var status = document.createElement('div');
          status.setAttribute('id','status');
          var textstatus = document.createTextNode(result.stream.channel.status);
          status.appendChild(textstatus);

          var url = document.createElement('div');
          url.setAttribute('id','url');
          var texturl = document.createTextNode(result.stream.channel.url);
          url.appendChild(texturl);

          var followers = document.createElement('div');
          followers.setAttribute('id','followers');
          var textfollowers = document.createTextNode(result.stream.channel.followers);
          followers.appendChild(textfollowers);


          document.getElementById("onlinechannels").appendChild(channel).appendChild(name);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(game);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(logo);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(status);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(url);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(followers);

        }else{
          //pull results from here ...https://api.twitch.tv/kraken/users/freecodecamp
          codeLib.gotjsonusers(item)
          .done(function(result) {
            console.dir(result);

            var channel = document.createElement('div');
            channel.setAttribute('id','channel');

            var name = document.createElement('div');
            name.setAttribute('id','name');
            var textname = document.createTextNode(result.display_name);
            name.appendChild(textname);

            var bio = document.createElement('div');
            bio.setAttribute('id','bio');
            var textbio = document.createTextNode(result.bio);
            bio.appendChild(textbio);

            var logo = document.createElement('div');
            logo.setAttribute('id','logo');
            var textlogo = document.createTextNode(result.logo);
            logo.appendChild(textlogo);

            var status = document.createElement('div');
            status.setAttribute('id','status');
            var textstatus = document.createTextNode('offline');
            status.appendChild(textstatus);

            var url = document.createElement('div');
            url.setAttribute('id','url');
            var texturl = document.createTextNode('http://www.twitch.tv/'+item+'/profile');
            url.appendChild(texturl);

            //var followers = document.createElement('div');
            //followers.setAttribute('id','followers');
            //var textfollowers = document.createTextNode(result.stream.channel.followers);
            //followers.appendChild(textfollowers);
            //TODO place holder thumbnails for null results

            document.getElementById("offchannels").appendChild(channel).appendChild(name);
            document.getElementById("offchannels").appendChild(channel).appendChild(bio);
            document.getElementById("offchannels").appendChild(channel).appendChild(logo);
            document.getElementById("offchannels").appendChild(channel).appendChild(status);
            document.getElementById("offchannels").appendChild(channel).appendChild(url);
          });
        }
      })
      .fail(function(x) {
            // Tell the user something bad happened
      });
  }

  function offline(item){
    codeLib.gotjson(item)
        .done(function(result) {
          if(result.stream == null) {
            // do stuff
            var node = document.createElement('li');
                node.setAttribute('id','status');
            var textnode = document.createTextNode(item);
            node.appendChild(textnode);
            document.getElementById("offchannels").appendChild(node);
          }
        })
        .fail(function(x) {
          // Tell the user something bad happened
        });
  }

  $(document).ready(function(){
    //for each name in channels display name
    codeLib.channels().forEach(function(item){
      var node = document.createElement('li');
      var textnode = document.createTextNode(item);
      node.appendChild(textnode);
      document.getElementById("allchannels").appendChild(node);
    });

    //codeLib.channels().forEach(function(item){
    //  allchannels(item);
    //});

    codeLib.channels().forEach(function(item){
      online(item);
    });

    //codeLib.channels().forEach(function(item){
    //  offline(item);
    //});
  });


});
