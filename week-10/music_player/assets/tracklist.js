'use strict';

const trackList = function() {
    const $tracklist = document.querySelector('.track-list ol');
    let $trackElements = null;
    console.log($tracklist);
        
    const tracks = [
        {
        title: 'ayy',
        url: 'file:///C:/GreenFox/Manfred28/week-10/music_player/assets/music/test.mp3',
        length: '120'
    },
    {
        title: 'party',
        url: 'file:///C:/GreenFox/Manfred28/week-10/music_player/assets/music/test.mp3',
        length: '150'
    },
    {
        title: 'hey',
        url: 'file:///C:/GreenFox/Manfred28/week-10/music_player/assets/music/test.mp3',
        length: '100'
    }
    ]

    const createTracklistElements = function() {
        tracks.forEach(function(elem, i) {
            const $li = document.createElement('li');
            $li.innerHTML = `<span class="index">${i+1}</span>
                            ${elem.title}
                            <span class="track-length">${elem.length}</span>`
            $tracklist.appendChild($li);
        })
        $trackElements = $tracklist.querySelectorAll('li')
    }

    const addTracklistElementEventListener = function (callback) {
        $trackElements.forEach(function(track) {
            const index = track.querySelector('.index').textContent
            track.addEventListener('click', function() {
                callback(tracks[parseInt(index) - 1]);
            })
        })
    }

    createTracklistElements();

    return {
        trackOnClick: addTracklistElementEventListener
    }
} 
