"use strict";
//const request = require('request')

define([""],function () {
  //constructor
  function Codelib(a, b) {
    // if u had passed vars, maybe future channel names
    this.b = b;
    this.a = a;
  }

  //test method
  Codelib.prototype.code = function (a, b) {
    return (a + b);
  };

  Codelib.prototype.default_channels = function () {

    var channels = [
      'danikaxix',
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
      'sodapoppin',
      'stormstudio_csgo_ru',
      'imaqtpie',
      'dfunker0',
      'LeagueOfMichael',
      'Quinnell',
      'Gaungade',
      'cokeduppatty',
      'snipealot2',
      'esl_sc2',
      'Lana_Lux'
    ];

    return channels;
  };



  // TODO build your own twitch-api back-end
  Codelib.prototype.gotjson = function (apiurl, channel, client_id) {
    console.log("apiurl: " + apiurl);
    console.log("channel: " + channel);
    console.log("client_id: " + client_id);
    // TODO need to build my own version of the api app
    return $.getJSON("http://localhost:3000/twitch-api/" + apiurl + "/" + channel + client_id)
  };


  Codelib.prototype.showAll = function showAll(item, client_id) {
    var apiurl = "streams";
    Codelib.prototype.gotjson(apiurl, item, client_id)
      .done(function (result) {
        if (result.stream != null) {
          Codelib.prototype.online(item, client_id);
        } else if (result.status === 422) {
          console.dir(result);
          Codelib.prototype.status404(item, client_id);
        } else {
          Codelib.prototype.offline(item, client_id);
        }
      });
  };

  Codelib.prototype.status404 = function status404(item, client_id) {

    var apiurl = "streams";
    Codelib.prototype.gotjson(apiurl, item, client_id)
      .done(function (result) {

        var display_name = item;
        var channel_logo = 'images/twitch.png';
        var bio_result = result.message;
        var txtstatus = 'unavailable';
        var itemProfile = item + '/profile';

        //TODO place holder thumbnails for null results
        $('#onlinechannels').append(
          '<a target="_blank" href="http://www.twitch.tv/' + itemProfile + '">' +
          '<div class="channel unavailable no-gutter col-md-2">' +
          '<div class="row">' +
          '<div class="logo col-md-2"><img src=' + channel_logo + ' alt=""/></div>' +
          '<div class="name col-md-10">' + display_name + '</div>' +
          '</div>' +
          '<div class="bio col-md-12">' + bio_result.substring(0, 95) + "..." + '</div>' +
          '<div class="status red col-md-12">' + txtstatus + '</div>' +
          '</div></a>'
        );
      }
      )
      .fail(function (x) {
        // Tell the user something bad happened
      });
  };
  // when triggered by eventhandler in main.js, this will display snippet of html.
  // this is "like" a react component in concept
  Codelib.prototype.online = function online(item, client_id) {

    var apiurl = "streams";
    Codelib.prototype.gotjson(apiurl, item, client_id)
      .done(function (result) {

        var display_name;
        var channel_logo;
        var channel_status;
        var text_status = 'on';
        var preview;

        if (result.stream.preview.medium != null) {
          preview = result.stream.preview.medium;
        } else {
          preview = '';
        }

        if (result.stream.channel.display_name != null) {
          display_name = result.stream.channel.display_name;
        } else {
          display_name = 'empty';
        }

        if (result.stream.channel.logo != null) {
          channel_logo = result.stream.channel.logo;
        } else {
          channel_logo = 'images/twitch.png';
        }

        if (result.stream.channel.status != null) {
          channel_status = result.stream.game
        } else {
          channel_status = 'empty';
        }

        $('#onlinechannels').append('<a target="_blank" href="http://www.twitch.tv/' + item + '">' +
          '<div class="channel online no-gutter col-md-2" style="background-image: url(' + preview + ')">' +
          '<div class="row">' +
          '<div class="logo col-md-2"><img src=' + channel_logo + ' alt=""/></div>' +
          '<div class="name col-md-8">' + display_name + '</div>' +
          '<div class="status_online green col-md-2">' + text_status + '</div>' +
          '</div>' +
          '<div class="channel_status col-md-12">' + channel_status + '</div>' +
          '</div></a>'
        );
      }
      )
      .fail(function (x) {
        // Tell the user something bad happened
        console.log("OOPS...", x)
      });
  };

  Codelib.prototype.offline = function offline(item, client_id) {
    console.log("offline called");
    //console.log("item: " + item);
    var apiurl = "users";
    //TODO why is this line failing?
    Codelib.prototype.gotjson(apiurl, item, client_id)
      .done(function (result) {
        console.log("result")
        console.log(result)
        var display_name;
        var channel_logo;
        var bio_result;
        var txtstatus = 'offline';
        var item = result.display_name + '/profile';
        //console.log("INSIDE gotjson " + result.display_name);
        if (result.display_name != null) {
          display_name = result.display_name;
        } else {
          display_name = 'empty';
        }

        if (result.logo != null) {
          channel_logo = result.logo;
        } else {
          channel_logo = 'images/twitch.png';
        }

        if (result.bio != null) {
          bio_result = result.bio;
        } else {
          bio_result = 'empty';
        }

        //TODO place holder thumbnails for null results

        $('#onlinechannels').append('<a target="_blank" href="http://www.twitch.tv/' + item + '">' +
          '<div class="channel no-gutter col-md-2">' +
          '<div class="row">' +
          '<div class="logo col-md-2"><img src=' + channel_logo + ' alt=""/></div>' +
          '<div class="name col-md-10">' + display_name + '</div>' +
          '</div>' +
          '<div class="bio col-md-12">' + bio_result.substring(0, 80) + "..." + '</div>' +
          '<div class="status red col-md-12">' + txtstatus + '</div>' +
          '</div></a>'
        );

      })
      .fail(function (x) {
        // Tell the user something bad happened
      });
  };

  Codelib.prototype.offlineOnly = function offlineOnly(item, client_id) {
    var apiurl = "streams";
    Codelib.prototype.gotjson(apiurl, item, client_id)
      .done(function (result) {
        if (result.stream != null) {

        } else {
          var apiurl = "users";
          Codelib.prototype.gotjson(apiurl, item, client_id)
            .done(function (result) {
              var display_name;
              var channel_logo;
              var bio_result;
              var txtstatus = 'offline';
              var item = item + '/profile';

              if (result.display_name != null) {
                display_name = result.display_name;
              } else {
                display_name = 'empty';
              }

              if (result.logo != null) {
                channel_logo = result.logo;
              } else {
                channel_logo = 'images/twitch.png';
              }

              if (result.bio != null) {
                bio_result = result.bio;
              } else {
                bio_result = 'empty';
              }

              //TODO place holder thumbnails for null results

              $('#onlinechannels').append('<a target="_blank" href="http://www.twitch.tv/' + item + '">' +
                '<div class="channel no-gutter col-md-2">' +
                '<div class="row">' +
                '<div class="logo col-md-2"><img src=' + channel_logo + ' alt=""/></div>' +
                '<div class="name col-md-10">' + display_name + '</div>' +
                '</div>' +
                '<div class="bio col-md-12">' + bio_result.substring(0, 95) + "..." + '</div>' +
                '<div class="status red col-md-12">' + txtstatus + '</div>' +
                '</div></a>');

            })
            .fail(function (x) {
              // Tell the user something bad happened
            });
        }
      });


  };

  //  TODO - use this to grab the top games
  //  Codelib.prototype.gottop = function() {
  //    return $.getJSON("https://api.twitch.tv/kraken/games/top")
  //  };

  Codelib.prototype.setChannels = function (array) {
    array.forEach(function (element, index) {
      localStorage.setItem(index, element);
    });
  };

  Codelib.prototype.getChannels = function () {

    var newChannels = [];
    for (var item in window.localStorage) {
      newChannels.push(window.localStorage[item])
    }

    return newChannels;
  };

  Codelib.prototype.channelForm = function () {

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage[key];

      var channel = document.createElement('div');
      channel.setAttribute('class', 'channel col-md-2');

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
          alert("updated: " + newValue);
        });
      })(i);

      document.getElementById("onlinechannels").appendChild(channel).appendChild(inputElementOne);
      document.getElementById("onlinechannels").appendChild(channel).appendChild(inputElementTwo);
    }


  };

  Codelib.prototype.aboutPage = function () {
    $('#onlinechannels').append('<div id="about"><h1>About this app: Twitch24 v0.1.0 </h1>' +
      '<p>Proof of concept: to experiment with qunit, pure javascript, AMD module design, requireJS, with a touch of jquery and Bootstrap.</p>' +
      '<p>This is alpha software. A non-angular, single page app that pulls data from the Twitch api and allows the user to track the online/offline status of 24 user chosen channels which are stored via localStorage</p>' +
      '</div>');
  };

  Codelib.prototype.searchgames = function (ask) {
    return $.getJSON("https://twitch-proxy.freecodecamp/twitch-api/search/streams?limit=10&offset=10&query=" + ask)
      .done(function (result) {
        console.dir(result);
        result.streams.forEach(function (node) {
          console.dir(node.channel.display_name);
          var channel_name = node.channel.display_name;
          var game_name = node.game;
          var followers = node.channel.followers;
          $('#results').after('<li><h3>' + channel_name + '</h3><p> ' + game_name + ' (followers:' + followers + ')</p></li>').fadeIn(5000);
        });
      })
      .fail(function (result) {
        // Tell user of error
        console.log("error occured: " + result.statusText);
      })
  };

  Codelib.prototype.search4more = function () {
    // TODO: add a channel to current list

    $('#onlinechannels').append('<div class="search col-md-6" id="searchDiv">' +
      '<div id="topDiv" class="col-md-12"><ul id="searchElement"><li>' +
      '<input id="searchBox" value="starcraft" type="text"/>' +
      '<input id="goButton" value="go" type="button"/>' +
      '</li></ul></div></div>' +
      '<div class="channels col-md-3" id="channels1"></div><div class="channels col-md-3" id="channels2"></div>');

    $('#topDiv').after('<div id="bottomDiv" class="col-md-12"><ul><li id="results">results:-----</li></ul></div>');
    $('#bottomDiv').after('<div id="instructionDiv" class="col-md-12"><h1>Instructions:</h1><p>Enter and search for the name of a game you want to track. Channels related to that game will be displayed after a few seconds. Copy the name of a channel into one of the fields on the left, press "update" to save that channel. Then simply go to the allchannels page and start tracking. </p></div>');
    $('#bottomDiv').hide();

    (function () {
      $('#goButton').click(function () {
        //remove li after first one with id 'results'...
        $('#results').nextAll().remove();
        // TODO: game_name, channel, followers
        var ask = document.getElementById('searchBox').value;
        $('#bottomDiv').fadeIn(1000, function () {
          Codelib.prototype.searchgames(ask);
        });
      });
    })();

    for (var i = 0; i <= 11; i++) {
      var key = localStorage.key(i);
      var value = localStorage[key];
      (function (i) {
        $('#updateButton').click(function () {
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i, newValue);
          alert("updated: go to front page to see changes" + newValue);
        });
      })(i);
      $('#channels1').append('<ul><li><input id="' + key + '" value="' + value + '" type="text"><input id="updateButton" type="Button" value="update"></li></ul>');
    }

    for (var i = 12; i <= 23; i++) {
      var key = localStorage.key(i);
      var value = localStorage[key];
      (function (i) {
        $('#updateButton').click(function () {
          var newValue = document.getElementById(i).value;
          localStorage.setItem(i, newValue);
          alert("updated: go to front page to see changes" + newValue);
        });
      })(i);
      $('#channels2').append('<ul><li><input id="' + key + '" value="' + value + '" type="text"><input id="updateButton" type="Button" value="update"></li></ul>');
    }

  };

  Codelib.prototype.addClickHandler = function addClickHandler(target, handler) {
    document.getElementById(target).addEventListener("click", function () {
      document.getElementById("onlinechannels").innerHTML = '';
      handler()
    });
  };
  return Codelib;
});
