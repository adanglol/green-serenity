
// Make sure game.js is loaded in index.html
console.log("game.js loaded");

// Import the InventoryItem class from items.js
import { InventoryItem } from './items.js';
import { InventoryUI } from './ui.js';

// ----------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------CODE BREAKDOWN------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

// ConfigureScene - preload assets which other scenes will use and start the menu scene
// Menu - create the menu scene
// Level1 - create the first level scene
// Level2 - create the second level scene
// Level3 - create the third level scene
// config - configure the game settings

// ----------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------CONFIGURE SCENE------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------


class ConfigureScene extends Phaser.Scene {
    constructor(scenekey) {
        super(scenekey);
        // font properties
        this.fontproperties = {font:'Pixelify Sans'};
        // flag for recognizing speech
        this.recognitionInProgress = false;
        // inventory flag
        // this.updateInventoryFlag = false;
    }
    preload() {
        // WHERE WE PRELOAD ALL ASSETS
        // Load the font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Who is the Loudest Assets
        this.load.image('whosLoudestBackground', '../ASSETS/whosLoudest.png');
        this.load.image('fox', '../ASSETS/fox.png');
        this.load.image('racoon', '../ASSETS/racoon.png');
        this.load.image('butterfly', '../ASSETS/butterfly.png');
        this.load.image('slug', '../ASSETS/slug.png');
        // audio assets who is the loudest
        
        this.load.audio('slugSounds', '../ASSETS/slugSound.mp3');
        this.load.audio('butterflySounds', '../ASSETS/FireFlySound.wav');
        this.load.audio('racoonSounds', '../ASSETS/RacoonSounds.wav');
        this.load.audio('foxSounds', '../ASSETS/CoyoteSound.wav');


    }
    create(){
        // Use WebFont Loader to load Google Fonts
        WebFont.load({
            google: {
                families: ['Pixelify Sans']
            },
            active: () => {
                game.scene.start('Menu');
            },
        });


    }
}


// ---------------------------------------------------------------------------
// -----------------------------Menu Scene------------------------------------
// ---------------------------------------------------------------------------

class Menu extends ConfigureScene {
    constructor(){
        super('Menu');
    }
    create(){
        let isGameStarted = false;


        this.menuText = this.add.text(20,20, "Menu Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

        this.startButton = this.add.text(20, 100, 'Say "start" to begin the game or click here!', {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

        let recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = "en-US";
        recognizer.start();
        console.log("recognizer started");

        recognizer.onresult = (event) => {
            if (!this.recognitionInProgress) {
                for(let i = event.resultIndex; i < event.results.length; i++){
                    const transcript = event.results[i][0].transcript.toLowerCase();
                    console.log(transcript); 
                    if (transcript.includes("start") && !isGameStarted) {
                        // recognition is in progress
                        this.recognitionInProgress = true;
                        // start the game and set isGameStarted to true and stop the recognizer
                        isGameStarted = true;
                        recognizer.stop();
                        console.log("recognizer stopped");
                        this.scene.start('whosLoudest');
                    }
                }   
            }
        }
        // start the game when the start button is clicked instead of saying "start" as another option
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('whosLoudest');
        });
    }

}

// ---------------------------------------------------------------------------
// -----------------------------Level1 Scene------------------------------------
// ---------------------------------------------------------------------------

class firstLevel extends ConfigureScene {
    constructor(){
        super('firstLevel');
    }
    create(){
        console.log("firstLevel scene created and called")
        // inventory UI
        this.inventoryUI = new InventoryUI(this);

        this.add.text(20,20, "Level1 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

        // Create some items to collect
        const keyItem = new InventoryItem('Key','A shiny key');
        keyItem.createItemText(this, 20, 80);

        keyItem.text.setInteractive();
        keyItem.text.on('pointerdown', () => {
            console.log('key item clicked')
            this.inventoryUI.collectItem(keyItem);
            keyItem.text.destroy();
        });
        
        const coinItem = new InventoryItem('Coin','A shiny coin');
        coinItem.createItemText(this, 20, 120);

        coinItem.text.setInteractive();
        coinItem.text.on('pointerdown', () => {
            console.log('coin item clicked')
            this.inventoryUI.collectItem(coinItem);
            coinItem.text.destroy();
        });

        const swordItem = new InventoryItem('Sword','A shiny sword');
        swordItem.createItemText(this, 20, 160);

        swordItem.text.setInteractive();
        swordItem.text.on('pointerdown', () => {
            console.log('sword item clicked')
            this.inventoryUI.collectItem(swordItem);
            swordItem.text.destroy();
        });
       
        const shieldItem = new InventoryItem('Shield','A shiny shield');
        shieldItem.createItemText(this, 20, 200);

        shieldItem.text.setInteractive();
        shieldItem.text.on('pointerdown', () => {
            console.log('shield item clicked')
            this.inventoryUI.collectItem(shieldItem);
            shieldItem.text.destroy();
        });

        


    }
    
    
}


// ---------------------------------------------------------------------------
// -----------------------------Level2 Scene------------------------------------
// ---------------------------------------------------------------------------

class secondLevel extends ConfigureScene {
    constructor(){
        super('secondLevel');
    }
    create(){
        this.add.text(20,20, "Level2 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

    }
}




// ---------------------------------------------------------------------------
// -----------------------------makeAWish Scene------------------------------------
// ---------------------------------------------------------------------------

class makeAWish extends ConfigureScene {
    constructor(){
        super('makeAWish');
    }
    create(){
        this.add.text(20,20, "Level3 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

    }

}

// ---------------------------------------------------------------------------
// -----------------------------Who's The Loudest Scene------------------------------------
// ---------------------------------------------------------------------------

class whosLoudest extends ConfigureScene{
    constructor(){
        super('whosLoudest');
    }
    create(){
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        // background
        const background = this.add.sprite(0,0, 'whosLoudestBackground');
        background.setOrigin(0,0);

        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;


        const loudestText = this.add.text(gameWidth / 2 *.3,gameHeight / 2 *.1, "Who's the Loudest?", {
            fontFamily: this.fontproperties.font,
            fontSize: 80,
        },);

        const centerX = gameWidth / 2;
        const centerY = gameHeight / 2;

        const listenText = this.add.text(centerX, centerY, 'Carefully Listen...', {
            fontFamily: this.fontproperties.font,
            fontSize: 80,
        });
        listenText.setOrigin(0.5);


        const slugSound = this.sound.add('slugSounds');
        const butterflySound = this.sound.add('butterflySounds');
        const racoonSound = this.sound.add('racoonSounds');
        const foxSound = this.sound.add('foxSounds');

        this.tweens.add({
            targets: listenText,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                console.log('tween completed');
                const slug = this.add.sprite(gameWidth * .45, gameHeight *.9 , 'slug');
                slug.setScale(0.7);

                const butterfly = this.add.sprite(gameWidth * .375, gameHeight *.55 , 'butterfly');
                butterfly.setScale(0.4);

                const racoon = this.add.sprite(gameWidth * .65, gameHeight *.55 , 'racoon');
                racoon.setScale(0.4);

                const fox = this.add.sprite(gameWidth * .9, gameHeight *.55 , 'fox');
                fox.setScale(0.4);

                this.tweens.add({
                    targets: slug,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 2000,
                    ease: 'Linear',
                    yoyo: true,

                    onStart : () => {
                        console.log('slug tween started');
                        // play the slug sound
                        slugSound.play();
                    },

                    onComplete: () => {
                        slugSound.stop();
                        this.tweens.add({
                            targets: butterfly,
                            scaleX: 1,
                            scaleY: 1,
                            duration: 2000,
                            ease: 'Linear',
                            yoyo: true,
                            
                            onStart : () => {
                                console.log('butterfly tween started');
                                // play the butterfly sound
                                butterflySound.volume = 5;
                                butterflySound.play();
                            },

                            onComplete: () => {
                                butterflySound.stop();
                                this.tweens.add({
                                    targets: racoon,
                                    scaleX: 1,
                                    scaleY: 1,
                                    duration: 2000,
                                    ease: 'Linear',
                                    yoyo: true,
                                    
                                    onStart : () => {
                                        console.log('racoon tween started');
                                        // play the racoon sound
                                        racoonSound.play();
                                    },

                                    onComplete: () => {
                                        racoonSound.stop();
                                        this.tweens.add({
                                            targets: fox,
                                            scaleX: 1,
                                            scaleY: 1,
                                            duration: 2000,
                                            ease: 'Linear',
                                            yoyo: true,
                                            
                                            onStart : () => {
                                                console.log('fox tween started');
                                                // play the fox sound
                                                foxSound.play();
                                            },

                                            onComplete: () => {
                                                console.log('all tweens completed');
                                                // go to the next scene

                                                foxSound.stop();

                                                this.tweens.add({
                                                    targets: loudestText,
                                                    alpha: 0,
                                                    duration: 2000,
                                                    ease: 'Linear',

                                                    onComplete: () => {
                                                        const loudText = this.add.text(centerX, centerY *.4, 'Who made the loudest sound?', {
                                                            fontFamily: this.fontproperties.font,
                                                            fontSize: 60,
                                                        });
                                                        loudText.setOrigin(0.5);
                                                        loudText.setAlpha(0);

                                                        this.tweens.add({
                                                            targets: loudText,
                                                            alpha: 1,
                                                            duration: 2000,
                                                            ease: 'Linear',

                                                        });


                                                        
                                                        slug.setInteractive();
                                                        slug.on('pointerdown', () => {
                                                            console.log('slug clicked');
                                                            this.tweens.add({
                                                                targets: loudText,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',

                                                            });
                                                            butterfly.destroy();
                                                            racoon.destroy();
                                                            fox.destroy();
                                                            
                                                            slug.setPosition(gameWidth *.7, gameHeight *.8);
                                                            slug.setOrigin(0.5);

                                                            this.add.text(centerX * .1, centerY * .1, 'Looks like you did not find the loudest!\nMaybe Next Time!', {
                                                                fontFamily: this.fontproperties.font,
                                                                fontSize: 50,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('findSound');

                                                                },
                                                            });


                                                            
                                                        
                                                        
                                                        });

                                                        butterfly.setInteractive();
                                                        butterfly.on('pointerdown', () => {
                                                            console.log('butterfly clicked');
                                                            this.tweens.add({
                                                                targets: loudText,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',

                                                            });
                                                            slug.destroy();
                                                            racoon.destroy();
                                                            fox.destroy();

                                                            butterfly.setPosition(gameWidth *.5, gameHeight *.5);

                                                            this.add.text(centerX * .1, centerY * .1, 'Congrats you found the loudest one!\nMoving onwards!', {
                                                                fontFamily: this.fontproperties.font,
                                                                fontSize: 50,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('findSound');

                                                                },
                                                            });
                                                        });

                                                        racoon.setInteractive();
                                                        racoon.on('pointerdown', () => {
                                                            console.log('racoon clicked');
                                                            this.tweens.add({
                                                                targets: loudText,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',

                                                            });
                                                            slug.destroy();
                                                            butterfly.destroy();
                                                            fox.destroy();

                                                            racoon.setPosition(gameWidth *.5, gameHeight *.5);

                                                            this.add.text(centerX * .1, centerY * .1, 'Looks like you did not find the loudest!\nMaybe Next Time!', {
                                                                fontFamily: this.fontproperties.font,
                                                                fontSize: 50,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('findSound');

                                                                },
                                                            });
                                                        });

                                                        fox.setInteractive();
                                                        fox.on('pointerdown', () => {
                                                            console.log('fox clicked');
                                                            this.tweens.add({
                                                                targets: loudText,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',

                                                            });
                                                            slug.destroy();
                                                            butterfly.destroy();
                                                            racoon.destroy();

                                                            fox.setPosition(gameWidth *.5, gameHeight *.5);

                                                            this.add.text(centerX * .1, centerY * .1, 'Looks like you did not find the loudest!\nMaybe Next Time!', {
                                                                fontFamily: this.fontproperties.font,
                                                                fontSize: 50,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('findSound');
                                                                },
                                                            });
                                                        });


                                                        slug.on('pointerover', () => {
                                                            console.log('slug pointerover');
                                                            const slugTween = this.tweens.add({
                                                                targets: slug,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',
                                                                yoyo: true,
                                                                repeat: -1,
                                                            });
                                                            slug.on('pointerout', () => {
                                                                console.log('slug pointerout');
                                                                slugTween.stop();
                                                                slug.alpha = 1;
                                                            });
                                                        });

                                                       

                                                        butterfly.on('pointerover', () => {
                                                            console.log('butterfly pointerover');
                                                            const butterflyTween = this.tweens.add({
                                                                targets: butterfly,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',
                                                                yoyo: true,
                                                                repeat : -1,
                                                            });
                                                            butterfly.on('pointerout', () => {
                                                                console.log('butterfly pointerout');
                                                                butterflyTween.stop();
                                                                butterfly.alpha = 1;
                                                            });

                                                        });

                                                      

                                                        racoon.on('pointerover', () => {
                                                            console.log('racoon pointerover');
                                                            const racoonTween = this.tweens.add({
                                                                targets: racoon,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',
                                                                yoyo: true,
                                                                repeat : -1,
                                                            });
                                                            racoon.on('pointerout', () => {
                                                                racoonTween.stop();
                                                                console.log('racoon pointerout');
                                                                racoon.alpha = 1;
                                                            });
                                                        });

                                                       

                                                        fox.on('pointerover', () => {
                                                            console.log('fox pointerover');
                                                            const foxTween = this.tweens.add({
                                                                targets: fox,
                                                                alpha: 0,
                                                                duration: 500,
                                                                ease: 'Linear',
                                                                yoyo: true,
                                                                repeat : -1,
                                                            });
                                                            fox.on('pointerout', () => {
                                                                console.log('fox pointerout');
                                                                foxTween.stop();
                                                                fox.alpha = 1;
                                                            });
                                                        });

                                                       





                                                               
                                                    },
                                                });


                                        
                                            },

                                        });
                                    },

                                });

                            },

                        });
                    },




                });




            }
        });
        
        

    }

}


// ---------------------------------------------------------------------------
// -----------------------------Find Sound Scene------------------------------------
// ---------------------------------------------------------------------------

class findSound extends ConfigureScene{
    constructor(){
        super('findSound');
    }
    create(){
        this.add.text(20,20, "Level5 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

    }

}


// ---------------------------------------------------------------------------
// -----------------------------What Sound Scene------------------------------------
// ---------------------------------------------------------------------------

class whatSound extends ConfigureScene{
    constructor(){
        super('whatSound');
    }
    create(){
        this.add.text(20,20, "Level6 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

    }

}


// ---------------------------------------------------------------------------
// -----------------------------Remember Gong Scene------------------------------------
// ---------------------------------------------------------------------------

class rememberGong extends ConfigureScene{
    constructor(){
        super('rememberGong');
    }
    create(){
        this.add.text(20,20, "Level7 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

    }

}


// ---------------------------------------------------------------------------
// -----------------------------Game Configuration----------------------------
// ---------------------------------------------------------------------------

const config = {
    type: Phaser.AUTO,
    scale : {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%',
        parent: 'game-container',
    },
    
    //ConfigureScene,Menu,firstLevel
    scene : [ConfigureScene,Menu,whosLoudest,findSound],
}

const game = new Phaser.Game(config);