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
      if (result.stream != null) {
        online(item, client_id);
      }else{
        offline(item, client_id);
      }
    });
  }

  function online(item,client_id){

      var apiurl = "streams";
      codeLib.gotjson(apiurl,item,client_id)
      .done(function(result) {

          var display_name;
          var channel_logo;
          var channel_status;
          var txtstatus = 'on';
          var preview;

          if(result.stream.preview.medium != null){
            preview = result.stream.preview.medium;
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
            channel_status = result.stream.game
          }else{
            channel_status = 'empty';
          }

          $('#onlinechannels').append('<a target="_blank" href="http://www.twitch.tv/'+item+'">' +
              '<div class="channel online no-gutter col-md-2" style="background-image: url('+preview+')">' +
              '<div class="logo col-md-3"><img src='+channel_logo+' alt=""/></div>' +
              '<div class="name col-md-7">'+display_name+'</div>' +
              '<div class="status_online green col-md-2">'+txtstatus+'</div>' +
              '<div class="channel_status col-md-12">'+channel_status+'</div>' +
              '</div></a>'
          );
        }
      )
      .fail(function(x) {
            // Tell the user something bad happened
      });
  }

  function offline(item,client_id){

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

        //TODO place holder thumbnails for null results

        $('#onlinechannels').append('<a target="_blank" href="http://www.twitch.tv/'+item+'">'+
            '<div class="channel no-gutter col-md-2">' +
            '<div class="logo col-md-3"><img src='+channel_logo+' alt=""/></div>'+
            '<div class="name col-md-9">'+display_name+'</div>' +
            '<div class="bio col-md-12">'+bio_result.substring(0,100)+'</div>' +
            '<div class="status red col-md-12">'+txtstatus+'</div>' +
            '</div></a>');

      })
      .fail(function(x) {
        // Tell the user something bad happened
      });
  }

  $(document).ready(function(){
    //TODO rebuild as fullstack MEAN app so env var can be set and OAuth can be used...since the next line is evil.
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
      codeLib.getChannels().forEach(function(item){
        online(item,client_id);
      });
    });

    document.getElementById("getOffline").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        offline(item,client_id);
      });
    });

    document.getElementById("getAll").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.getChannels().forEach(function(item){
        showAll(item,client_id);
      });
    });

    document.getElementById("updateList").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.channelForm();
    });

    document.getElementById("search").addEventListener("click", function(){
      document.getElementById("onlinechannels").innerHTML = '';
      codeLib.search4more();
    });

  });


});
