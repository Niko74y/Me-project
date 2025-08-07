// Основной скрипт для музыкального плеера

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const playPauseBtn = document.querySelector('.play-pause');
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const albumCover = document.querySelector('.album-cover');
    const progressBar = document.querySelector('.progress');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');
    const volumeBar = document.querySelector('.volume-level');
    const volumeBtn = document.querySelector('.fa-volume-up').parentElement;

    // Пример треков
    const tracks = [
        {
            title: 'Сентябрь горит',
            artist: 'Исполнитель',
            cover: 'https://via.placeholder.com/50',
            src: 'Сентябрь горит.mp3'
        },
        {
            title: 'Трек 2',
            artist: 'Исполнитель 2',
            cover: 'https://via.placeholder.com/50',
            src: 'https://example.com/track2.mp3'
        },
        {
            title: 'Трек 3',
            artist: 'Исполнитель 3',
            cover: 'https://via.placeholder.com/50',
            src: 'https://example.com/track3.mp3'
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;
    let audio = new Audio(tracks[currentTrackIndex].src);
    let isMuted = false;
    let previousVolume = 0.7; // Начальная громкость 70%

    // Установка начальной громкости
    audio.volume = previousVolume;
    volumeBar.style.width = `${previousVolume * 100}%`;

    // Обновление информации о треке
    function updateTrackInfo() {
        songTitle.textContent = tracks[currentTrackIndex].title;
        songArtist.textContent = tracks[currentTrackIndex].artist;
        albumCover.src = tracks[currentTrackIndex].cover;
        audio.src = tracks[currentTrackIndex].src;
    }

    // Воспроизведение/пауза
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class=\"fas fa-play\"></i>';
        } else {
            audio.play().catch(e => console.error('Ошибка воспроизведения:', e));
            playPauseBtn.innerHTML = '<i class=\"fas fa-pause\"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Следующий трек
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateTrackInfo();
        if (isPlaying) {
            audio.play().catch(e => console.error('Ошибка воспроизведения:', e));
        }
    }

    // Предыдущий трек
    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        updateTrackInfo();
        if (isPlaying) {
            audio.play().catch(e => console.error('Ошибка воспроизведения:', e));
        }
    }

    // Обновление прогресс-бара
    function updateProgress() {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Обновление времени воспроизведения
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds}`;

        // Обновление длительности трека
        if (!isNaN(audio.duration)) {
            const durationMinutes = Math.floor(audio.duration / 60);
            const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
            durationDisplay.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }

    // Установка времени воспроизведения
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

    // Установка громкости
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;

        audio.volume = volume;
        volumeBar.style.width = `${volume * 100}%`;
        previousVolume = volume;

        // Обновляем иконку громкости
        if (volume === 0) {
            volumeBtn.innerHTML = '<i class=\"fas fa-volume-mute\"></i>';
            isMuted = true;
        } else if (volume < 0.5) {
            volumeBtn.innerHTML = '<i class=\"fas fa-volume-down\"></i>';
            isMuted = false;
        } else {
            volumeBtn.innerHTML = '<i class=\"fas fa-volume-up\"></i>';
            isMuted = false;
        }
    }

    // Переключение состояния звука (включить/выключить)
    function toggleMute() {
        if (isMuted) {
            audio.volume = previousVolume;
            volumeBar.style.width = `${previousVolume * 100}%`;
            if (previousVolume === 0) {
                volumeBtn.innerHTML = '<i class=\"fas fa-volume-mute\"></i>';
            } else if (previousVolume < 0.5) {
                volumeBtn.innerHTML = '<i class=\"fas fa-volume-down\"></i>';
            } else {
                volumeBtn.innerHTML = '<i class=\"fas fa-volume-up\"></i>';
            }
        } else {
            previousVolume = audio.volume;
            audio.volume = 0;
            volumeBar.style.width = '0%';
            volumeBtn.innerHTML = '<i class=\"fas fa-volume-mute\"></i>';
        }
        isMuted = !isMuted;
    }

    // Обработчики событий
    playPauseBtn.addEventListener('click', togglePlayPause);
    document.querySelector('.fa-step-forward').parentElement.addEventListener('click', nextTrack);
    document.querySelector('.fa-step-backward').parentElement.addEventListener('click', prevTrack);
    audio.addEventListener('timeupdate', updateProgress);
    document.querySelector('.progress-bar').addEventListener('click', setProgress);
    document.querySelector('.volume-bar').addEventListener('click', setVolume);
    volumeBtn.addEventListener('click', toggleMute);
    audio.addEventListener('ended', nextTrack);

    // Инициализация
    updateTrackInfo();

    // Создание примеров карточек
    function createCardExample(containerSelector, title) {
        const container = document.querySelector(containerSelector);
        // Создаем первую карточку с вашей песней
        const firstCard = document.createElement('div');
        firstCard.className = 'card';
        firstCard.innerHTML = `
            <img src=\"https://via.placeholder.com/180\" alt=\"Сентябрь горит\">
            <h3>Сентябрь горит</h3>
            <p>Исполнитель</p>
        `;
        container.appendChild(firstCard);

        // Создаем остальные карточки
        for (let i = 1; i < 6; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src=\"https://via.placeholder.com/180\" alt=\"${title} ${i+1}\">
                <h3>${title} ${i+1}</h3>
                <p>Исполнитель ${i+1}</p>
            `;
            container.appendChild(card);
        }
    }

    createCardExample('.section:nth-of-type(1) .cards-container', 'Рекомендуемый трек');
    createCardExample('.section:nth-of-type(2) .cards-container', 'Новый релиз');
    createCardExample('.section:nth-of-type(3) .cards-container', 'Популярный плейлист');
});
