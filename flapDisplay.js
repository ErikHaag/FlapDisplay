class flapDisplay {
    static #roll = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.,";
    static #rollLen = BigInt(flapDisplay.#roll.length);
    
    static set alphabet(str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.,") {
        flapDisplay.#roll = str;
        flapDisplay.#rollLen = BigInt(str.length);
    }
    
    constructor(element) {
        this.element = element;
        this.current = [];
        this.goal = [];
        this.setCurrent(element.innerText);
        this.setGoal(element.innerText);
    }

    forceDisplay(str) {
        this.setGoal(str);
        this.setCurrent(str);
        this.updateElement();
    }

    setCurrent(str) {
        this.current = str.split("\n").map((s) => Array.from(s.trimEnd()).map((c) => {
            if (c == " ") return -1n;
            let i = flapDisplay.#roll.indexOf(c);
            if (i == -1) return flapDisplay.#rollLen;
            return BigInt(i);
        }));
    }

    setGoal(str) {
        let previousGoal = structuredClone(this.goal);
        //I <3 chaining
        this.goal = str.split("\n").map((s) => Array.from(s.trimEnd()).map((c) => {
            if (c == " ") return -1n;
            let i = flapDisplay.#roll.indexOf(c);
            if (i == -1) return c;
            return BigInt(i);
        }));

        //Add lines
        while (this.current.length < this.goal.length) {
            this.current.push([]);
        }

        for (let i = 0; i < this.current.length; i++) {
            //Add characters
            while (this.current[i].length < this.goal[i]?.length) {
                this.current[i].push(-1n);
            }
            //reset non-included character
            for (let j = 0; j < this.current[i].length; j++) {
                if (previousGoal[i]?.[j] != this.goal[i]?.[j] && this.current[i][j] >= flapDisplay.#rollLen) {
                    this.current[i][j] = -2n;
                }
            }
        }
    }

    updateCurrent() {
        let complete = true;
        //This is a rat's nest of if statements, I know.
        for (let i = 0; i < this.current.length; i++) {
            //remove the last space character if this line is too long
            while (this.current[i].length > (this.goal[i]?.length ?? 0) && this.current[i].at(-1) == -1n) {
                this.current[i].pop()
            }
            for (let j = 0; j < this.current[i].length; j++) {
                if (i >= this.goal.length || j >= this.goal[i].length) {
                    //if this line is removed or the line is too long
                    if (this.current[i][j] != -1n) {   
                        //roll the offending character until it's a space
                        this.current[i][j] = (this.current[i][j] + 2n) % (flapDisplay.#rollLen + 1n) - 1n;
                        complete = false;
                    }
                    //move to the next character in the line
                    continue;
                }
                if (typeof this.goal[i][j] == "bigint") {
                    //if the character is in the roll (-1 to rollLen - 1)
                    if (this.current[i][j] != this.goal[i][j]) {
                        //roll this character until it's correct
                        this.current[i][j] = (this.current[i][j] + 2n) % (flapDisplay.#rollLen + 1n) - 1n;
                        complete = false;
                    }
                    //move on to the next character
                    continue;
                }
                //if the character is not it the roll
                if (this.current[i][j] >= flapDisplay.#rollLen) {
                    //keep the roll at the end,
                    this.current[i][j] = flapDisplay.#rollLen;
                    //move on to the next character
                    continue;
                }
                //keep going throught the roll until you hit the end
                this.current[i][j]++;
                complete = false;
            }
            //move to the next line
        }
        //remove any undesired empty lines
        while (this.current.length > this.goal.length && this.current.at(-1).length == 0) {
            this.current.pop();
        }
        //construct text
        this.updateElement();
        //return true when done
        return complete;
    }

    updateElement() {
        let t = "";
        for (let i = 0; i < this.current.length; i++) {
            for (let j = 0; j < this.current[i].length; j++) {
                switch (this.current[i][j]) {
                    case -1n:
                        t += " ";
                        break;
                    case flapDisplay.#rollLen:
                        t += this.goal[i][j];
                        break;
                    default:
                        t += flapDisplay.#roll[this.current[i][j]];
                        break;
                }
            }
            t += "\n";
        }
        this.element.innerText = t.substring(0, t.length - 1);
    }
}