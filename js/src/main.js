"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO split into online and offline methods, return local array 4 each

  //NOTE: this is what the JS code builds
  //<div class="container center no-gutter">
  //    <div id="testchannels" class="no-gutter col-md-12">
  //    <a href="test url">
  //    <div class="channel no-gutter col-md-2">
  //    <div class="logo col-md-3"><img src="holder.js/32x32" alt=""/></div>
  //    <div class="name col-md-9">test name</div>
  //<div class='bio col-md-12'>test bio</div>
  //<div class="status col-md-12">test status</div>
  //</div>
  //</a>
  //</div>
  //</div>

  function online(item){
    var client_id = '?client_id=l91ohh8zyji3s3xztrc3w5j8r21wuak&callback=?';
      codeLib.gotjson(item,client_id)
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
              url.setAttribute('href','http://www.twitch.tv/'+item);
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

          var bio = document.createElement('div');
              bio.setAttribute('class','bio col-md-12');
          var textbio = document.createTextNode(channel_status.substring(0, 200));
              bio.appendChild(textbio);

          var status = document.createElement('div');
          status.setAttribute('class','status green col-md-12');
          var textstatus = document.createTextNode('online');
          status.appendChild(textstatus);

          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(logo);
          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(name);
          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(bio);
          //document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(game);
          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(status);
          //document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(followers);

        }else{
          //pull results from here ...https://api.twitch.tv/kraken/users/freecodecamp
          var client_id = '?client_id=l91ohh8zyji3s3xztrc3w5j8r21wuak&callback=?';
          codeLib.gotjsonusers(item,client_id)
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
                url.setAttribute('href','http://www.twitch.tv/'+item+'/profile');
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
                status.setAttribute('class','status red col-md-12');
            var textstatus = document.createTextNode('offline');
                status.appendChild(textstatus);

            //TODO place holder thumbnails for null results

            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(logo);
            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(name);
            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(bio);
            document.getElementById("offchannels").appendChild(url).appendChild(channel).appendChild(status);
          });
        }
      })
      .fail(function(x) {
            // Tell the user something bad happened
      });
  }


  $(document).ready(function(){


    codeLib.channels().forEach(function(item){
      online(item);
    });


  });


});
