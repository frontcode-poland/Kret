console.log('Play and Stop component');

//parametry
var nTimeout = document.getElementById("Timeout").value.trim();
var nBlink = document.getElementById("Blink").value.trim();
var pauseTimeout = null;
var pauseBlink = null;

//player
document.addEventListener('DOMContentLoaded', () => { 
    // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
console.log(nTimeout);
console.log(nBlink);

    var pauseVideo = function () {
        pauseTimeout = setTimeout(function () {
            console.log('Pause video');
            player.pause();
        },nTimeout*1000);
        clearTimeout(pauseTimeout);
    }

    var player = new Plyr('#player');

    // Expose
    window.player = player;
  
    // Bind event listener
    function on(selector, type, callback) {
      document.querySelector(selector).addEventListener(type, callback, false);
    }
  
    // Play
    on('.js-play', 'click', () => { 
      player.play();
      pauseVideo();
    });

    //Play mouseover
    on('.js-play', 'mouseover', () => { 
        var playVideo = function() {
            pauseBlink = setTimeout(function() {
                console.log("clear blinkTimeout");
                player.play();
            },nBlink*1000)
        }
        
      });
    //mouseout
      on('.js-play', 'mouseout', () => { 
        clearTimeout(pauseBlink);
      });

//      function youtube_parser(url){
//        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
//        var match = url.match(regExp);
//        return (match&&match[7].length==11)? match[7] : false;
//    }

 /*   //Przyciski
    on('BlinkButton', 'click', () =>{
        var reloadVideo = function() {
                var nReload = document.getElementById('link').value.trim();
                console.log(nReload);
                youtube_parser(nReload);
            }
    });
  
    // Pause
    on('.js-pause', 'click', () => { 
      player.pause();
    });
  
    // Stop
    on('.js-stop', 'click', () => { 
      player.stop();
    });
  
    // Rewind
    on('.js-rewind', 'click', () => { 
      player.rewind();
    });
  
    // Forward
    on('.js-forward', 'click', () => { 
      player.forward();
    });

    player.on('play', event => {
        pauseVideo();
    });*/

    //document.getElementsByClassName
    
});