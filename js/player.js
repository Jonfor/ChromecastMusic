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
        var prepend = "<li id=song" + i + " onclick=changeSong(" + i + ")>";
        output.push(prepend, '<strong>', decodeURI(f.name), '</strong></li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

    currSongNum = 0;
    changeActiveSong(0);
    playSong(files[0]);
}

function changeSong(nextSongNum) {
    "use strict";

    if (currSongNum > files.length - 1) {
        return;
    }

    if (nextSongNum === undefined) {
        currSongNum++;
        changeActiveSong(currSongNum);
        playSong(files[currSongNum]);
    } else {
        currSongNum = nextSongNum;
        changeActiveSong(currSongNum);
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

function changeActiveSong(newActiveSongNum) {
    "use strict";
    var active = document.querySelector("[class=active]");
    if (active) {
        active.removeAttribute("class");
    }
    document.getElementById("song" + newActiveSongNum).setAttribute("class", "active");
}

document.getElementById('files').addEventListener('change', handleFileSelect);
