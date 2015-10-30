"use strict";
// AMD module pattern
define(['Codelib','jquery'],function(Codelib,$){
  var codeLib = new Codelib();

  //show all
  //show online - and - what is streaming
  //show offline

  //TODO combine online and offline into one array 4 display

  function showAll(item,client_id){

    var apiurl = "streams";
      codeLib.gotjson(apiurl,item,client_id)
      .done(function(result) {
        if(result.stream != null) {
          var display_name;
          var channel_logo;
          var channel_status;
          var txtstatus = 'on';
          var preview;

          if(result.stream.preview.medium != null){
            preview = result.stream.preview.medium;
            console.log(preview);
          }else{
            preview = '';
          }

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

console.log(item);
          $('#onlinechannels').after('<a target="_blank" href="http://www.twitch.tv/'+item+'">' +
              '<div class="channel online no-gutter col-md-2" style="background-image: url('+preview+')">' +
              '<div class="logo col-md-3"><img src='+channel_logo+' alt=""/></div>' +
              '<div class="name col-md-7">'+display_name+'</div>' +
              '<div class="status_online green col-md-2">'+txtstatus+'</div>' +
              '</div></a>');

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

  //TODO read default channels into localStorage on first load
    if (window.localStorage.length == 0){
      var array_of_channels = [];
      codeLib.default_channels().forEach(function(item){
        array_of_channels.push(item);
      });
      codeLib.setChannels(array_of_channels);
      codeLib.getChannels().forEach(function(item){
        showAll(item,client_id);
      });
    }else{
      codeLib.getChannels().forEach(function(item){
        showAll(item,client_id);
      });
    }


// TODO refactor using jquery. remove repetition.
    document.getElementById("getOnline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        online(item,client_id);
      });
    });

    document.getElementById("getOffline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        offline(item,client_id);
      });
    });

    document.getElementById("getAll").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        showAll(item,client_id);
      });
    });

    document.getElementById("updateList").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.channelForm();
    });

    document.getElementById("search").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      document.getElementById("offchannels").innerHTML = '';
      document.getElementById("allchannels").innerHTML = '';
      codeLib.search4more();
    });

  });


});
