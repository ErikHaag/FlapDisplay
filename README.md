```flapDisplay``` is an easy to use "cloak" for the \<p\> element, simply create an instance, add use setGoal() instead of assigning innerText directly.
The code will progress each character along a set sequence, until each character is correct, akin to the split-flap displays at old train stations.<br>
You don't like the ordering of the alphabet? Simple do ```flapDisplay.alphabet = someString;```, a space is always the first character, if you add more, they'll be ignored.
If you want to return to the original alphabet, simple do ```fLapDisplay.alphabet = undefined;```.

If you use a character in the ```setGoal()``` call that is *not* included in the alphabet, it will spontaniously appear where one would expect the first space to be, this is too prevent the display from needing to go through every unicode character.<br>
If you want to force the paragraph to display something, simply call ```forceDisplay(message)```

Try it out here: https://erikhaag.github.io/FlapDisplay/
