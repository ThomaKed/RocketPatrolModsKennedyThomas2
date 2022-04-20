class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/SelectSound.mp3');
        this.load.audio('sfx_explosion', './assets/Explosion_03.mp3');
        this.load.audio('sfx_rocket', './assets/ShootGun.mp3');
        this.load.audio('BGM', './assets/BGM.mp3');
        this.load.image('Title', './assets/Title.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#ab7137',
            color: '#2b1d0e',
            align: 'center',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 0
        }

        //Title Page
        this.add.image(0, 0, 'Title').setOrigin(0);
        
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFC24B';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*5, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            
            this.scene.start('playScene');
        }
    }
}

