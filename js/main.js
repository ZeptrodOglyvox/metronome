import './metronome.js';
import './counter.js'

// Button click effect 
const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
    btn.addEventListener('mousedown', () => {
        btn.classList.add("button_click");
    });
    btn.addEventListener('mouseup', () => {
        btn.classList.remove("button_click");
    });
});