// Counter 
let reps = 0;
const rep_count = document.querySelector('p.rep-count');
rep_count.textContent = reps;

const rep_minus = document.querySelector('#rep-minus');
const rep_plus = document.querySelector('#rep-plus');
const rep_reset = document.querySelector('#rep-reset');

rep_minus.addEventListener('click', () => {
    reps = Math.max(reps-1, 0);
    rep_count.textContent = reps;
});

rep_plus.addEventListener('click', () => {
    reps = Math.min(reps+1, 1000);
    rep_count.textContent = reps;
});

rep_reset.addEventListener('click', () => {
    rep_count.textContent = reps = 0;
});