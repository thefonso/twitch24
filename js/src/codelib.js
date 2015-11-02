"use strict";

//TODO BIG - refactor this file...violating SOLID via method calls inside of methods

define(function() {
  //constructor
  function Codelib(a,b){
    // if u had passed vars, maybe future channel names
    this.b = b;
    this.a = a;
  }

  //test method
  Codelib.prototype.code = function(a, b) {
    return (a + b);
  };

  //methods
  Codelib.prototype.gotjson = function(apiurl,channel,client_id) {
    return $.getJSON("https://api.twitch.tv/kraken/"+apiurl+"/"+channel+client_id)
  };

  Codelib.prototype.showAll = function showAll(item,client_id){
    var apiurl = "streams";
    Codelib.prototype.gotjson(apiurl,item,client_id)
        .done(function(result) {
          if (result.stream != null) {
            Codelib.prototype.online(item, client_id);
          }else{
            Codelib.prototype.offline(item, client_id);
          }
        });
  };

  Codelib.prototype.online = function online(item,client_id){

    var apiurl = "streams";
    Codelib.prototype.gotjson(apiurl,item,client_id)
        .done(function(result) {

          var display_name;
          var channel_logo;
          var channel_status;
          var text_status = 'on';
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
              '<div class="status_online green col-md-2">'+text_status+'</div>' +
              '<div class="channel_status col-md-12">'+channel_status+'</div>' +
              '</div></a>'
          );
        }
    )
        .fail(function(x) {
          // Tell the user something bad happened
        });
  };

  Codelib.prototype.offline = function offline(item,client_id){

    var apiurl = "users";
    Codelib.prototype.gotjson(apiurl,item,client_id)
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
  };
//  TODO - use this to grab the top games
//  Codelib.prototype.gottop = function() {
//    return $.getJSON("https://api.twitch.tv/kraken/games/top")
//  };

  Codelib.prototype.default_channels = function(){

    var channels = [
      'habathcx',
      'terakilobyte',
      'freecodecamp',
      'medrybw',
      'thomasballinger',
      'noobs2ninjas',
      'RobotCaleb',
      'beohoff',
      'GeoffStorbeck',
      'leagueoflegends',
      'ThunderCast',
      'esl_csgo',
      'summit1g',
      'izakooo',
      'comster404',
      'sodapoppin',
      'stormstudio_csgo_ru',
      'imaqtpie'
      //'comster404',
      //'brunofin'
    ];

     return channels;
  };

  Codelib.prototype.setChannels = function(array){
    array.forEach(function(element,index){
      localStorage.setItem(index, element);
    });
  };

  Codelib.prototype.getChannels = function(){

    var newChannels = [];
    for(var item in window.localStorage){
      newChannels.push(window.localStorage[item])
    }

    return newChannels;
  };

  Codelib.prototype.channelForm = function(){

    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var value = localStorage[key];

      var channel = document.createElement('div');
      channel.setAttribute('class','channel col-md-2');

      var inputElementOne = document.createElement('input');
      inputElementOne.type = "text";
      inputElementOne.id = key;
      inputElementOne.value = value;

      var inputElementTwo = document.createElement('input');
      inputElementTwo.type = "button";
      inputElementTwo.value = "update";
      (function (i){
        inputElementTwo.addEventListener('click', function(){
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i,newValue);
          alert("updated: "+newValue);
        });
      })(i);

      document.getElementById("onlinechannels").appendChild(channel).appendChild(inputElementOne);
      document.getElementById("onlinechannels").appendChild(channel).appendChild(inputElementTwo);
    }


  };

  Codelib.prototype.searchgames = function(ask){
    return $.getJSON("https://api.twitch.tv/kraken/search/streams?limit=10&offset=10&query="+ask)
        .done(function(result){
          console.dir(result);
          result.streams.forEach(function(node){
            console.dir(node.channel.display_name);
            var channel_name  = node.channel.display_name;
            var game_name     = node.game;
            var followers     = node.channel.followers;

            //$('#bottomDiv').fadeIn(5000,function(){
              $('#results').after('<li>'+channel_name+'</li>').fadeIn(5000);
            //});
          });
        })
        .fail(function (result) {
          // Tell user of error
          console.log("error occured: "+result.statusText);
        })
  };

  Codelib.prototype.search4more = function(){
    var oneColumn = document.createElement('div');
    oneColumn.setAttribute('class','search col-md-6');
    oneColumn.setAttribute('id','searchDiv');
    // TODO: type game in search field,

    // TODO: add a channel to current list

    var topDiv = document.createElement('div');
    topDiv.setAttribute('id','topDiv');
    topDiv.setAttribute('class','col-md-12');

    var uList     = document.createElement('ul');
    uList.setAttribute('id','searchElement');
    var listItem  = document.createElement('li');

    var inputElementOne = document.createElement('input');
    inputElementOne.type = "text";
    inputElementOne.id = 'searchBox';
    inputElementOne.value = 'starcraft';

    var inputElementTwo = document.createElement('input');
    inputElementTwo.type = "button";
    inputElementTwo.value = "go";

    document.getElementById("onlinechannels").appendChild(oneColumn).appendChild(topDiv).appendChild(uList).appendChild(listItem).appendChild(inputElementOne);
    document.getElementById("onlinechannels").appendChild(oneColumn).appendChild(topDiv).appendChild(uList).appendChild(listItem).appendChild(inputElementTwo);

    $('#topDiv').after('<div id="bottomDiv" class="col-md-12"><ul><li id="results">results:-----</li></ul></div>');
    $('#bottomDiv').after('<div id="instructionDiv" class="col-md-12"><h1>Instructions:</h1><p>Enter and search for the name of a game you want to track. Channels related to that game will be displayed after a few seconds. Copy the name of a channel into one of the fields on the left, press "update" to save that channel. Then simply go to the allchannels page and start tracking. </p></div>');
    $('#bottomDiv').hide();

      (function () {
        inputElementTwo.addEventListener('click', function () {
          //remove li after first one with id 'results'...
          $('#results').nextAll().remove();
          // TODO: game_name, channel, followers
          var ask = document.getElementById('searchBox').value;
          $('#bottomDiv').fadeIn(1000,function(){
            Codelib.prototype.searchgames(ask);
          });
        });
      })();

    //TODO col2 see all current channel names
    var twoColumn = document.createElement('div');
    twoColumn.setAttribute('class','channels col-md-3');
    twoColumn.setAttribute('id','channels1');

    var threeColumn = document.createElement('div');
    threeColumn.setAttribute('class','channels col-md-3');
    threeColumn.setAttribute('id','channels2');

    for (var i = 0; i <= 12; i++){
      var key = localStorage.key(i);
      var value = localStorage[key];
      var uList     = document.createElement('ul');
      var listItem  = document.createElement('li');

      var inputElementOne = document.createElement('input');
      inputElementOne.type = "text";
      inputElementOne.id = key;
      inputElementOne.value = value;

      var inputElementTwo = document.createElement('input');
      inputElementTwo.type = "button";
      inputElementTwo.value = "update";
      (function (i) {
        inputElementTwo.addEventListener('click', function () {
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i, newValue);
          alert("updated: go to front page to see changes" + newValue);
        });
      })(i);

      document.getElementById("onlinechannels").appendChild(twoColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementOne);
      document.getElementById("onlinechannels").appendChild(twoColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementTwo);
    }

    for (var i = 13; i <= 24; i++){
      var key = localStorage.key(i);
      var value = localStorage[key];
      var uList     = document.createElement('ul');
      var listItem  = document.createElement('li');

      var inputElementOne = document.createElement('input');
      inputElementOne.type = "text";
      inputElementOne.id = key;
      inputElementOne.value = value;

      var inputElementTwo = document.createElement('input');
      inputElementTwo.type = "button";
      inputElementTwo.value = "update";
      (function (i) {
        inputElementTwo.addEventListener('click', function () {
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i, newValue);
          alert("updated: go to front page to see changes" + newValue);
        });
      })(i);

      document.getElementById("onlinechannels").appendChild(threeColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementOne);
      document.getElementById("onlinechannels").appendChild(threeColumn).appendChild(uList).appendChild(listItem).appendChild(inputElementTwo);
    }

  };

  return Codelib;
});