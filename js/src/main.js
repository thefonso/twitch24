"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO split into online and offline methods, return local array for each

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

  function showAll(item,client_id){

    var apiurl = "streams";
      codeLib.gotjson(apiurl,item,client_id)
      .done(function(result) {
        if(result.stream != null) {
          var display_name;
          var channel_logo;
          var channel_status;
          var txtstatus = 'online';

          if(result.stream.channel.display_name != null){
            display_name = result.stream.channel.display_name;
          }else{
            display_name = 'empty';
          }

          if(result.stream.channel.logo != null){
            channel_logo = result.stream.channel.logo;
          }else{
            channel_logo = 'images/twitch.png';
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

          var logo = document.createElement('div');
              logo.setAttribute('class','logo col-md-3');
          var img = document.createElement('img');
              img.setAttribute('src',channel_logo);
              logo.appendChild(img);

          var bio = document.createElement('div');
              bio.setAttribute('class','bio col-md-12');
          var textbio = document.createTextNode(channel_status.substring(0, 100));
              bio.appendChild(textbio);

          var status = document.createElement('div');
          status.setAttribute('class','status green col-md-12');
          var textstatus = document.createTextNode(txtstatus);
          status.appendChild(textstatus);

          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(logo);
          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(name);
          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(bio);
          document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(status);

        }else{
          var apiurl = "users";
          codeLib.gotjson(apiurl,item,client_id)
              .done(function(result) {
                var display_name;
                var channel_logo;
                var bio_result;
                var txtstatus = 'offline';
                var item = item+'/profile';

                if(result.display_name != null){
                  display_name = result.display_name;
                }else{
                  display_name = 'empty';
                }

                if(result.logo != null){
                  channel_logo = result.logo;
                }else{
                  channel_logo = 'images/twitch.png';
                }

                if(result.bio != null){
                  bio_result = result.bio;
                }else{
                  bio_result = 'empty';
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

                var logo = document.createElement('div');
                logo.setAttribute('class','logo col-md-3');
                var img = document.createElement('img');
                img.setAttribute('src',channel_logo);
                logo.appendChild(img);

                var bio = document.createElement('div');
                bio.setAttribute('class','bio col-md-12');
                var textbio = document.createTextNode(bio_result.substring(0, 100));
                bio.appendChild(textbio);

                var status = document.createElement('div');
                status.setAttribute('class','status red col-md-12');
                var textstatus = document.createTextNode(txtstatus);
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

  function online(item,client_id){

    var apiurl = "streams";
    codeLib.gotjson(apiurl,item,client_id)
        .done(function(result) {
          if(result.stream != null) {
            var display_name;
            var channel_logo;
            var channel_status;
            var txtstatus = 'online';

            if(result.stream.channel.display_name != null){
              display_name = result.stream.channel.display_name;
            }else{
              display_name = 'empty';
            }

            if(result.stream.channel.logo != null){
              channel_logo = result.stream.channel.logo;
            }else{
              channel_logo = 'images/twitch.png';
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

            var logo = document.createElement('div');
            logo.setAttribute('class','logo col-md-3');
            var img = document.createElement('img');
            img.setAttribute('src',channel_logo);
            logo.appendChild(img);

            var bio = document.createElement('div');
            bio.setAttribute('class','bio col-md-12');
            var textbio = document.createTextNode(channel_status.substring(0, 100));
            bio.appendChild(textbio);

            var status = document.createElement('div');
            status.setAttribute('class','status green col-md-12');
            var textstatus = document.createTextNode(txtstatus);
            status.appendChild(textstatus);

            document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(logo);
            document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(name);
            document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(bio);
            document.getElementById("onlinechannels").appendChild(url).appendChild(channel).appendChild(status);

          }else{
          //...nothing
          }
        })
        .fail(function(x) {
          // Tell the user something bad happened
        });
  }

  function offline(item,client_id){

    var apiurl = "streams";
    codeLib.gotjson(apiurl,item,client_id)
        .done(function(result) {
          if(result.stream != null) {
            //...nothing
          }else{
            var apiurl = "users";
            codeLib.gotjson(apiurl,item,client_id)
                .done(function(result) {
                  var display_name;
                  var channel_logo;
                  var bio_result;
                  var txtstatus = 'offline';
                  var item = item+'/profile';

                  if(result.display_name != null){
                    display_name = result.display_name;
                  }else{
                    display_name = 'empty';
                  }

                  if(result.logo != null){
                    channel_logo = result.logo;
                  }else{
                    channel_logo = 'images/twitch.png';
                  }

                  if(result.bio != null){
                    bio_result = result.bio;
                  }else{
                    bio_result = 'empty';
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

                  var logo = document.createElement('div');
                  logo.setAttribute('class','logo col-md-3');
                  var img = document.createElement('img');
                  img.setAttribute('src',channel_logo);
                  logo.appendChild(img);

                  var bio = document.createElement('div');
                  bio.setAttribute('class','bio col-md-12');
                  var textbio = document.createTextNode(bio_result.substring(0, 100));
                  bio.appendChild(textbio);

                  var status = document.createElement('div');
                  status.setAttribute('class','status red col-md-12');
                  var textstatus = document.createTextNode(txtstatus);
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
    var client_id = '?client_id=l91ohh8zyji3s3xztrc3w5j8r21wuak&callback=?';

    document.getElementById("getOnline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.channels().forEach(function(item){
        online(item,client_id);
      });
    });

    document.getElementById("getOffline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.channels().forEach(function(item){
        offline(item,client_id);
      });
    });

    document.getElementById("getAll").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.channels().forEach(function(item){
        showAll(item,client_id);
      });
    });

  });


});
