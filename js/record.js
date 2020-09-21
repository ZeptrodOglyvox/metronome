class Recorder {
    constructor() {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream, {audioBitsPerSecond: 256000});
            this.audioBlobs = [];
    
            this.mediaRecorder.addEventListener('dataavailable', (e) => {
                this.audioBlobs.push(e.data);
            });

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioBlobs);
                const audioUrl = URL.createObjectURL(audioBlob);
                this.audio = new Audio(audioUrl);
            }
        }); 
    }

    start() { 
        this.clear();
        this.mediaRecorder.start();
    }

    stop() {
        this.mediaRecorder.stop();
    }

    clear() {
        this.audioBlobs = [];
        this.audio = null;
    }
}

const recButton = document.querySelector('#rec-btn');
const playButton = document.querySelector('#play-btn');
const delButton = document.querySelector('#trash-btn');
const recordMsg = document.querySelector('.record_msg');

let recState = 0;
let playState = 0;
let audioRecorder = new Recorder;


function toggleRecState() {
    recState = recState ? 0 : 1;
    recordMsg.textContent = recState ? 'Recording audio...' : 'Audio Recorded.'
    recButton.classList.toggle('fa-circle');
    recButton.classList.toggle('fa-square');
}


function togglePlayState() {
    playState = playState ? 0 : 1;
    recordMsg.textContent = playState ? 'Playing audio...' : 'Audio Recorded.'
    playButton.classList.toggle('fa-play');
    playButton.classList.toggle('fa-pause');
}


recButton.addEventListener('click', () => {
    if(!recState) {
        audioRecorder.start();
        toggleRecState();
    } else {
        audioRecorder.stop();
        toggleRecState();
        setTimeout(() => {
            audioRecorder.audio.addEventListener('ended', togglePlayState);
        }, 1000);

        // FIXME Hack because .audio is null if you don't wait so a promise should be 
        // involved somewhere.
    }
});

playButton.addEventListener('click', () => {
    if(!recState && audioRecorder.audio) {
        if(!playState) {
            audioRecorder.audio.play();
            togglePlayState();
        } else {
            audioRecorder.audio.pause();
            togglePlayState();
        }
    }
});

delButton.addEventListener('click', () => {
    if(playState) {
        audioRecorder.audio.pause();
        togglePlayState();
    }
    audioRecorder.clear();
    recordMsg.textContent = 'No audio recorded.'
});