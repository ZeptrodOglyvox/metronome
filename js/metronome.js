const slider = document.querySelector('#metronome-slider');
const output = document.querySelector('output[for="metronome-slider"]');
const playBtn = document.querySelector('#mtr-play');
let state = 0;

output.textContent = slider.value;
const sound = new Howl({
    src: ['audio/metronome-pulse.wav'],
});

let loopId = undefined;
function loopSample() {
    const bpm = parseInt(slider.value)
    const interval = Math.floor((1 / bpm) * 60000);
    return setInterval(() => {sound.play()}, interval);
}

playBtn.addEventListener('click', () => {
    state = state ? 0 : 1;
    if (state) {
        sound.play();
        loopId = loopSample(loopId);
    }
    else clearInterval(loopId);

    playBtn.classList.toggle("fa-play");
    playBtn.classList.toggle("fa-pause");
});

slider.addEventListener('input', () => {
    output.textContent = slider.value;
    if (state) {
        clearInterval(loopId);
        loopId = loopSample(); 
    }
});
