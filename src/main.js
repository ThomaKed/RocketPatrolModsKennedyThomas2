let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderpadding = borderUISize / 3;

//Bandit Buster by Kennedy Thomas 04/18/2022. The game took me '15' hours to complete.

//Credits
//Shooting Gun Sound Effect - 9mm pistol shoot short reverb by gattoangus
//Select sound - 1911 Reload by Nioczkus
//Explosion Sound - Explosion_03 by Little Robot Sound Factory
//BGMusic - Wild West Story by Soundroll
//Emery on the discord for helping me with the timer function and ship animations.


//Point Break down - 120 Max points
//Allow the player to control the Rocket after it's fired (5)
//Display the time remaining (in seconds) on the screen (10)
//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//Add your own (copyright-free) background music to the Play scene (5)
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
//Create a new title screen (e.g., new artwork, typography, layout) (10)
//Create a new animated sprite for the Spaceship enemies (10)