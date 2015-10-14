"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO split into online and offline methods, return local array 4 each

  //function allchannels(item){
  //  codeLib.gotjson(item)
  //      .done(function(result) {
  //        if(result.stream != null) {
  //          // onlne code
  //          console.dir(result.stream);
  //          console.log(result.stream.game);
  //          console.log(result.stream.channel.logo);
  //          console.log(result.stream.channel.status);
  //          console.log(result.stream.channel.url);
  //          console.log(result.stream.channel.updated_at);
  //          var node = document.createElement('li');
  //          var textnode = document.createTextNode(item);
  //          node.appendChild(textnode);
  //          document.getElementById("onlinechannels").appendChild(node);
  //        }else{
  //          //offline code
  //        }
  //      })
  //      .fail(function(x) {
  //        // Tell the user something bad happened
  //      });
  //}

  function online(item){
      codeLib.gotjson(item)
      .done(function(result) {
        if(result.stream != null) {
          var display_name;
          var stream_game;
          var channel_logo;
          var channel_status;

          if(result.stream.channel.display_name != null){
            display_name = result.stream.channel.display_name;
          }else{
            display_name = 'empty';
          }

          if(result.stream.game != null){
            stream_game = result.stream.game;
          }else{
            stream_game = 'empty';
          }

          if(result.stream.channel.logo != null){
            channel_logo = result.stream.channel.logo;
          }else{
            channel_logo = 'empty';
          }

          if(result.stream.channel.status != null){
            channel_status = result.stream.channel.status
          }else{
            channel_status = 'empty';
          }

          var url = document.createElement('a');
              //url.setAttribute('href','https://www.twitch.tv/streams/'+item);
              url.setAttribute('target','_blank');

          var channel = document.createElement('div');
              channel.setAttribute('class','channel no-gutter col-md-2');

          var name = document.createElement('div');
              name.setAttribute('class','name col-md-9');
          var textname = document.createTextNode(display_name);
              name.appendChild(textname);


          var game = document.createElement('div');
              game.setAttribute('class','game');
          var textgame = document.createTextNode(stream_game);
              game.appendChild(textgame);


          var logo = document.createElement('div');
              logo.setAttribute('class','logo col-md-3');
          var img = document.createElement('img');
              img.setAttribute('src',channel_logo);
              logo.appendChild(img);


          var status = document.createElement('div');
              status.setAttribute('class','status col-md-12');
          var textstatus = document.createTextNode(channel_status);
              status.appendChild(textstatus);




          //var followers = document.createElement('div');
          //followers.setAttribute('class','followers');
          //if(result.stream.channel.followers != null) {
          //  var textfollowers = document.createTextNode(result.stream.channel.followers);
          //  followers.appendChild(textfollowers);
          //}



          document.getElementById("onlinechannels").appendChild(channel).appendChild(logo);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(name);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(game);
          document.getElementById("onlinechannels").appendChild(channel).appendChild(status);
          //document.getElementById("onlinechannels").appendChild(channel).appendChild(url);
          //document.getElementById("onlinechannels").appendChild(channel).appendChild(followers);

        }else{
          //pull results from here ...https://api.twitch.tv/kraken/users/freecodecamp
          codeLib.gotjsonusers(item)
          .done(function(result) {
            console.dir(result);
                var display_name;
                var channel_logo;
                var bio_result;

                if(result.display_name != null){
                  display_name = result.display_name;
                }else{
                  display_name = 'empty';
                }

                if(result.bio != null){
                  bio_result = result.bio;
                }else{
                  bio_result = 'empty';
                }

                if(result.logo != null){
                  channel_logo = result.logo;
                }else{
                  channel_logo = 'empty';
                }



            var url = document.createElement('a');
                //url.setAttribute('href','http://www.twitch.tv/'+item+'/profile');
                url.setAttribute('target','_blank');

            var channel = document.createElement('div');
                channel.setAttribute('class','channel no-gutter col-md-2');

            var logo = document.createElement('div');
                logo.setAttribute('class','logo col-md-3');
            var img = document.createElement('img');

                  img.setAttribute('src',channel_logo);
                  logo.appendChild(img);

            var name = document.createElement('div');
                name.setAttribute('class','name col-md-9');

                  var textname = document.createTextNode(display_name);
                  name.appendChild(textname);

            var bio = document.createElement('div');
                bio.setAttribute('class','bio col-md-12');

                  var textbio = document.createTextNode(bio_result.substring(0, 100));
                  bio.appendChild(textbio);

            var status = document.createElement('div');
                status.setAttribute('class','status col-md-12');
            var textstatus = document.createTextNode('offline');
                status.appendChild(textstatus);


            //var followers = document.createElement('div');
            //followers.setAttribute('id','followers');
            //var textfollowers = document.createTextNode(result.stream.channel.followers);
            //followers.appendChild(textfollowers);
            //TODO place holder thumbnails for null results

            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(logo);
            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(name);
            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(bio);
            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(status);
            //document.getElementById("offchannels").appendChild(channel).appendChild(url);
          });
        }
      })
      .fail(function(x) {
            // Tell the user something bad happened
      });
  }

  //function offline(item){
  //  codeLib.gotjson(item)
  //      .done(function(result) {
  //        if(result.stream == null) {
  //          // do stuff
  //          var node = document.createElement('li');
  //              node.setAttribute('id','status');
  //          var textnode = document.createTextNode(item);
  //          node.appendChild(textnode);
  //          document.getElementById("offchannels").appendChild(node);
  //        }
  //      })
  //      .fail(function(x) {
  //        // Tell the user something bad happened
  //      });
  //}

  $(document).ready(function(){

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
