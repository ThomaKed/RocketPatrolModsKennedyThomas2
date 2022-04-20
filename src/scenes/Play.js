class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load image/tile sprites
        this.load.image('rocket', './assets/Badge.png');
        this.load.image('desert', './assets/Desert.png');
        this.load.spritesheet('explosion', './assets/Bexplosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('spaceship', './assets/Bandit.png', {frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame: 2});
        
    }

    create() {
        var music = this.sound.add('BGM');
        music.setLoop(true);
        music.play();

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'desert').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderpadding, game.config.width, borderUISize * 2, 0xFFC24B).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x2b1d0e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x2b1d0e).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x2b1d0e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x2b1d0e).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderpadding, 'rocket').setOrigin(0.5, 0);

        this.anims.create({
            key: 'spaceshipmove',
            frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        });


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //spaceships
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + borderUISize*9, borderUISize*6, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0,0);
        
        this.ship05 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4, 'spaceship', 0, 100, game.settings.spaceshipSpeed*2).setOrigin(0,0);

        //special ships


        this.ship05.setScale(0.6);

        //animation
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#ab7137',
            color: '#2b1d0e',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderpadding, borderUISize + borderpadding*2, this.p1Score, scoreConfig);
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true
        }, null, this);
        
        this.timer = this.time.addEvent({ delay: game.settings.gameTimer});
        this.remaining = this.timer.getRemaining();

        scoreConfig.fixedWidth = 100;
        this.timeShow = this.add.text(game.config.width - scoreConfig.fixedWidth - borderUISize - borderpadding, borderUISize + borderpadding * 2, this.remaining, scoreConfig);
        this.seconds = 0;
        scoreConfig.fixedWidth = 0;

    }

    update() {

        this.seconds = this.timer.getRemaining() / 1000;
        this.timeShow.text = Math.ceil(this.seconds);

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.sound.get('BGM').stop();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.sound.get('BGM').stop();
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship02.update();
            this.ship03.update();

            this.ship05.update();
        }
        
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }


        if(this.checkCollision(this.p1Rocket, this.ship05)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
        }
    }
    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x +rocket.width > ship.x &&
            rocket.y <ship.y +ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
          ship.reset();
          ship.alpha = 1;
          boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}
