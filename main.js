//Create a flap display
let flap = new flapDisplay(document.getElementById("flap"));

let clock;

function startClock() {
    clearInterval(clock);
    //update it regularly
    clock = setInterval(() => {
        //we don't want short circuiting too prevent everyone from running
        //so use an extra variable when multiple are active, like so:
        let comp = flap.updateCurrent();
        // comp = flap2.update() && comp 
        if (comp) {
            //stop when finished
            clearInterval(clock);
        }
    }, 100);
}


let input = document.getElementById("input");

input.addEventListener("change", () => {
    flap.setGoal(input.value);
    startClock();
})