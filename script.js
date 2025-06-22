document.addEventListener('DOMContentLoaded', function() {
    const audioPlayers = [
        document.getElementById('audio-player'),
        document.getElementById('audio-player-2'),
        document.getElementById('audio-player-3'),
        document.getElementById('audio-player-4')
    ];

    const playButtons = [
        document.getElementById('play-button'),
        document.getElementById('play-button-2'),
        document.getElementById('play-button-3'),
        document.getElementById('play-button-4')
    ];

    let currentTrackIndex = 0;

function playNextTrack() {
    if (currentTrackIndex < audioPlayers.length) {
        audioPlayers[currentTrackIndex].play().catch(error => {
            console.error('Error attempting to play audio:', error);
        });
    }
}

    playButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            currentTrackIndex = index;
            playNextTrack();
        });
    });

audioPlayers.forEach((player, index) => {
    player.addEventListener('ended', function() {
        currentTrackIndex = index + 1;
        if (currentTrackIndex < audioPlayers.length) {
            playNextTrack();
        }
    });
});
});
