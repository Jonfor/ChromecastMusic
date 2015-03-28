/**
 * Created by Jonfor on 3/17/15.
 */
var files;
var currSongNum;
function handleFileSelect(evt) {
    "use strict";
    files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', decodeURI(f.name), '</strong></li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

    currSongNum = 0;
    playSong(files[0]);
}

function changeSong(nextSongNum) {
    "use strict";

    if (currSongNum >= files.length - 1) {
        return;
    }

    nextSongNum = nextSongNum || -1;

    if (nextSongNum === -1) {
        currSongNum++;
        playSong(files[currSongNum]);
    } else {
        currSongNum = nextSongNum;
        playSong(files[currSongNum]);
    }

}

function playSong(song) {
    "use strict";
    var player = document.getElementById('player');

    var freader = new FileReader();
    freader.onload = function(e) {
        player.src = e.target.result;
    };

    freader.readAsDataURL(song);
}

document.getElementById('files').addEventListener('change', handleFileSelect);
