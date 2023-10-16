
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
        this.fontproperties = {font:'Modak'};
        // flag for recognizing speech
        this.recognitionInProgress = false;
        // inventory flag
        // this.updateInventoryFlag = false;
    }
    preload() {
        // WHERE WE PRELOAD ALL ASSETS
        // Load the font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Menu 
        this.load.image('menuBackground', '../ASSETS/Menu/BackgroundAsset.png');
        this.load.image('menuLogo', '../ASSETS/Menu/Logo.png');
        this.load.image('menuDivider', '../ASSETS/Menu/Divider.png');
        this.load.image('greenBean', '../ASSETS/Menu/GBLOGO 1.png');
        this.load.image('menu', '../ASSETS/Menu/Menu.png');


        // Inventory Button Asset
        this.load.image('openInventoryButton','../ASSETS/inventory/Button Inventory.png')
        this.load.image('closeInventoryButton','../ASSETS/inventory/Button Inventory close.png')

        // Green Serenity Assets
        this.load.image('greenBg','../ASSETS/greenSerenity/BG.png')
        this.load.image('greenDirt','../ASSETS/greenSerenity/Dirt.png')
        this.load.image('greenDirt1','../ASSETS/greenSerenity/Dirt 1.png')
        this.load.image('flower','../ASSETS/greenSerenity/Flower.png')
        this.load.image('grownTrees','../ASSETS/greenSerenity/Full.png')
        this.load.image('halfTree','../ASSETS/greenSerenity/Half.png')
        this.load.image('sapling','../ASSETS/greenSerenity/Sapling.png')
        this.load.image('seed','../ASSETS/greenSerenity/Seed.png')
        this.load.image('sun','../ASSETS/greenSerenity/Sun.png')
        this.load.image('water','../ASSETS/greenSerenity/Water.png')
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

        // Recordance Assets
        this.load.image('recordanceBackground', '../ASSETS/RecordanceBg.png');
        this.load.image('recordanceTitle', '../ASSETS/Recordance.png');
        this.load.image('recordancePrompt','../ASSETS/RecordancePrompt.png');
        this.load.image('recordanceNotes', '../ASSETS/RecordanceNotes.png');
        this.load.image('channelOne', '../ASSETS/RadioChannel1.png');
        this.load.image('channelTwo', '../ASSETS/RadioChannel2.png');
        this.load.image('channelThree', '../ASSETS/RadioChannel3.png');
        this.load.image('channelFour', '../ASSETS/RadioChannel4.png');
        this.load.image('startText', '../ASSETS/StartInstructions.png');
        this.load.image('scrollText', '../ASSETS/ScrollWheelInstructions.png');
        this.load.audio('channelOneSound', '../ASSETS/Channel1.wav');
        this.load.audio('channelTwoSound', '../ASSETS/Channel2.wav');
        this.load.audio('channelThreeSound', '../ASSETS/Channel3.wav');
        this.load.audio('channelFourSound', '../ASSETS/Channel4.wav');

        //what's that sound
        this.load.image('bird', '../ASSETS/whats_sound/mini game bird.png');
        this.load.image('bug', '../ASSETS/whats_sound/minigame cricket bug.png');
        this.load.image('rain', '../ASSETS/whats_sound/minigame raincloud.png');
        this.load.image('WhatSoundBackground', '../ASSETS/whats_sound/minigame mine background.png');
        this.load.audio('bird_mp3', '../ASSETS/whats_sound/bird.mp3');
        this.load.audio('cricket_mp3', '../ASSETS/whats_sound/cricket.mp3');
        this.load.audio('rain_mp3', '../ASSETS/whats_sound/rain.mp3');
        // Make a Wish Assets
        this.load.image('makeAWishBackground', '../ASSETS/makeWish/Lvl 3 BG.png');
        this.load.image('cliff', '../ASSETS/makeWish/Lvl 3 Cliff.png');
        this.load.image('cloud','../ASSETS/makeWish/Lvl 3 clouds.png');
        // paper and folding it 
        this.load.image('paper1', '../ASSETS/makeWish/Lvl 3 paper 1.png');
        this.load.image('paper2', '../ASSETS/makeWish/Lvl 3 paper 2.png');
        this.load.image('paper3', '../ASSETS/makeWish/Lvl 3 paper 3.png');
        this.load.image('paper4', '../ASSETS/makeWish/Lvl 3 paper 4.png');
        this.load.image('paper5', '../ASSETS/makeWish/Lvl 3 paper 5.png');
        // airplane flying
        this.load.image('airplane1', '../ASSETS/makeWish/Lvl 3 paper f1.png');
        this.load.image('airplane2', '../ASSETS/makeWish/Lvl 3 paper f2.png');
        this.load.image('airplane3', '../ASSETS/makeWish/Lvl 3 paper f3.png');
        this.load.image('airplane4', '../ASSETS/makeWish/Lvl 3 paper f4.png');
        // sun
        this.load.image('sunShade', '../ASSETS/makeWish/Lvl 3 Sun shade.png');
        this.load.image('sun', '../ASSETS/makeWish/Lvl 3 Sun.png');
        this.load.image('waterShade', '../ASSETS/makeWish/Lvl 3 Water shade.png');


    }
    create(){
        // Use WebFont Loader to load Google Fonts
        WebFont.load({
            google: {
                families: ['Modak']
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

        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        // background
        const background = this.add.sprite(0,0, 'menuBackground');
        background.setOrigin(0,0);

        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;

        // logo
        const logo = this.add.sprite(gameWidth * .5, gameHeight * .5, 'menuLogo');
        // logo.setScale(0.5);
        logo.alpha = 0;
        const divider = this.add.sprite(gameWidth * .55, gameHeight * .5, 'menuDivider');
        divider.setScale(0.9);
        divider.alpha = 0;


        const menuText = this.add.sprite(gameWidth * .8, gameHeight * .1, 'menu');
        menuText.setScale(0.2);

        menuText.alpha = 0;

        const startButton = this.add.text(this.scale.width *.57,this.scale.height * .25, 'Say "start" to begin or click on levels to play!', {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
            color: 'black'
        },);
        startButton.alpha = 0;

        const greenSerenityText = this.add.text(this.scale.width *.57,this.scale.height * .35, 'Green Serenity', {
            fontFamily: this.fontproperties.font,
            fontSize: 60,
            color: 'green'
        },);

        greenSerenityText.alpha = 0;

        const makeAWishText = this.add.text(this.scale.width *.57,this.scale.height * .45, 'Make A Wish!', {
            fontFamily: this.fontproperties.font,
            fontSize: 60,
            color: 'green'
        });

        makeAWishText.alpha = 0;


        
        const whosLoudestText = this.add.text(this.scale.width *.57,this.scale.height * .55, "Who's the Loudest?", {
            fontFamily: this.fontproperties.font,
            fontSize: 60,
            color: 'green'
        },);

        whosLoudestText.alpha = 0;

        const recordanceText = this.add.text(this.scale.width *.57,this.scale.height * .65, 'Recordance', {
            fontFamily: this.fontproperties.font,
            fontSize: 60,
            color: 'green'
        },);

        recordanceText.alpha = 0;

        const whatsThatSoundText = this.add.text(this.scale.width *.57,this.scale.height * .75, "What's That Sound?", {
            fontFamily: this.fontproperties.font,
            fontSize: 60,
            color: 'green'
        });

        whatsThatSoundText.alpha = 0;

        const rememberGongText = this.add.text(this.scale.width *.57,this.scale.height * .85, "Remember Gong?", {
            fontFamily: this.fontproperties.font,
            fontSize: 60,
            color: 'green'
        });

        rememberGongText.alpha = 0;


        this.tweens.add({
            targets: logo,
            alpha: 1,
            duration: 3000,
            ease: 'Circular.easeIn',
            onComplete: () => {
                this.tweens.add({
                    targets: logo,
                    scale: 0.9,
                    duration: 2000,
                    ease: 'Circular.easeIn',
                    onComplete: () => {
                        this.tweens.add({
                            targets: logo,
                            x: gameWidth * .28,
                            duration: 2000,
                            ease: 'Circular.easeIn',
                            onComplete: () => {
                                this.tweens.add({
                                    targets: divider,
                                    alpha: 1,
                                    duration: 2000,
                                    ease: 'Circular.easeIn',
                                    onComplete: () => {
                                        this.tweens.add({
                                            targets: menuText,
                                            alpha: 1,
                                            duration: 2000,
                                            ease: 'Circular.easeIn',
                                            onComplete  : () => {
                                                this.tweens.add({
                                                    targets: startButton,
                                                    alpha: 1,
                                                    duration: 2000,
                                                    ease: 'Circular.easeIn',
                                                    onComplete: () => {
                                                        this.tweens.add({
                                                            targets: greenSerenityText,
                                                            alpha: 1,
                                                            duration: 1000,
                                                            ease: 'Circular.easeIn',
                                                            onComplete: () => {
                                                                this.tweens.add({
                                                                    targets: makeAWishText,
                                                                    alpha: 1,
                                                                    duration: 1000,
                                                                    ease: 'Circular.easeIn',
                                                                    onComplete: () => {
                                                                        this.tweens.add({
                                                                            targets: whosLoudestText,
                                                                            alpha: 1,
                                                                            duration: 1000,
                                                                            ease: 'Circular.easeIn',
                                                                            onComplete: () => {
                                                                                this.tweens.add({
                                                                                    targets: recordanceText,
                                                                                    alpha: 1,
                                                                                    duration: 1000,
                                                                                    ease: 'Circular.easeIn',
                                                                                    onComplete: () => {
                                                                                        this.tweens.add({
                                                                                            targets: whatsThatSoundText,
                                                                                            alpha: 1,
                                                                                            duration: 1000,
                                                                                            ease: 'Circular.easeIn',
                                                                                            onComplete: () => {
                                                                                                this.tweens.add({
                                                                                                    targets: rememberGongText,
                                                                                                    alpha: 1,
                                                                                                    duration: 1000,
                                                                                                    ease: 'Circular.easeIn',
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        
                    }
                });
            }
        });

        const greenBean = this.add.sprite(gameWidth * .5, gameHeight * .5, 'greenBean');
        greenBean.setScale(0.5);
        greenBean.alpha = 0;

       

        greenSerenityText.setInteractive();
        makeAWishText.setInteractive();
        whosLoudestText.setInteractive();
        recordanceText.setInteractive();
        whatsThatSoundText.setInteractive();
        rememberGongText.setInteractive();

        greenSerenityText.on('pointerover', () => {
            greenBean.x = greenSerenityText.x + 500;
            greenBean.y = greenSerenityText.y + 20;
            greenBean.alpha = 1;
            const blink = this.tweens.add({
                targets: greenSerenityText,
                alpha: 0,
                duration: 500,
                ease: 'Circular.easeIn',
                yoyo: true,
                repeat  : -1,
            });
            greenSerenityText.on('pointerout', () => {
                greenBean.alpha = 0;
                greenSerenityText.alpha = 1;
                blink.stop();
            });
        });

        makeAWishText.on('pointerover', () => {
            greenBean.x = makeAWishText.x + 450;
            greenBean.y = makeAWishText.y + 20;
            greenBean.alpha = 1;
            const blink = this.tweens.add({
                targets: makeAWishText,
                alpha: 0,
                duration: 500,
                ease: 'Circular.easeIn',
                yoyo: true,
                repeat  : -1,
            });
            makeAWishText.on('pointerout', () => {
                greenBean.alpha = 0;
                makeAWishText.alpha = 1;
                blink.stop();
                });
            });

        whosLoudestText.on('pointerover', () => {
            greenBean.x = whosLoudestText.x + 620;
            greenBean.y = whosLoudestText.y +20;
            greenBean.alpha = 1;
            const blink = this.tweens.add({
                targets: whosLoudestText,
                alpha: 0,
                duration: 500,
                ease: 'Circular.easeIn',
                yoyo: true,
                repeat  : -1,
            });
            whosLoudestText.on('pointerout', () => {
                greenBean.alpha = 0;
                whosLoudestText.alpha = 1;
                blink.stop();
                });
            }
        );

        recordanceText.on('pointerover', () => {
            greenBean.x = recordanceText.x + 400;
            greenBean.y = recordanceText.y +20;
            greenBean.alpha = 1;
            const blink = this.tweens.add({
                targets: recordanceText,
                alpha: 0,
                duration: 500,
                ease: 'Circular.easeIn',
                yoyo: true,
                repeat  : -1,
            });
            recordanceText.on('pointerout', () => {
                greenBean.alpha = 0;
                recordanceText.alpha = 1;
                blink.stop();
                });
            });

        whatsThatSoundText.on('pointerover', () => {
            greenBean.x = whatsThatSoundText.x + 620;
            greenBean.y = whatsThatSoundText.y +20;
            greenBean.alpha = 1;
            const blink = this.tweens.add({
                targets: whatsThatSoundText,
                alpha: 0,
                duration: 500,
                ease: 'Circular.easeIn',
                yoyo: true,
                repeat  : -1,
            });
            whatsThatSoundText.on('pointerout', () => {
                greenBean.alpha = 0;
                whatsThatSoundText.alpha = 1;
                blink.stop();
                });
            });

        rememberGongText.on('pointerover', () => {
            greenBean.x = rememberGongText.x + 570;
            greenBean.y = rememberGongText.y +20;
            greenBean.alpha = 1;
            const blink = this.tweens.add({
                targets: rememberGongText,
                alpha: 0,
                duration: 500,
                ease: 'Circular.easeIn',
                yoyo: true,
                repeat  : -1,
            });
            rememberGongText.on('pointerout', () => {
                greenBean.alpha = 0;
                rememberGongText.alpha = 1;
                blink.stop();
                });
            });

            
  
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
                        this.scene.start('firstLevel');
                    }
                }   
            }
        }

        recognizer.onend = () => {
            console.log("recognizer ended");
            console.log('restarting')
            recognizer.start();
        }

        greenSerenityText.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('firstLevel');
        });

        makeAWishText.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('makeAWish');
        });

        whosLoudestText.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('whosLoudest');
        });

        recordanceText.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('Recordance');
        });

        whatsThatSoundText.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('whatSound');
        });

        rememberGongText.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('rememberGong');
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

        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

    
        // background
        const background = this.add.sprite(0,0, 'greenBg');
        background.setOrigin(0,0);

        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;


         // background trees
         const dirtTree = this.add.sprite(0,0, 'greenDirt1');
         dirtTree.setOrigin(0,0);
 
         dirtTree.displayWidth = gameWidth;
         dirtTree.displayHeight = gameHeight;

        // water
        const water = this.add.sprite(0,0, 'water');
        water.setOrigin(0,0);
        water.displayWidth = gameWidth;
        water.displayHeight = gameHeight;
        water.alpha = 0

        // dirt that is green
        const Dirt = this.add.sprite(0,0, 'greenDirt');
        Dirt.setOrigin(0,0);
        Dirt.displayWidth = gameWidth;
        Dirt.displayHeight = gameHeight;


        // flower
        const flower = this.add.sprite(0,0,'flower');
        flower.setOrigin(0,0)
        flower.displayWidth = gameWidth;
        flower.displayHeight = gameHeight;
        flower.alpha = 0

        // seed 
        const seed = this.add.sprite(0,0,'seed')
        seed.setOrigin(0,0)
        seed.displayWidth = gameWidth;
        seed.displayHeight = gameHeight;
        seed.alpha = 0

        // sapling
        const sapling = this.add.sprite(0,0,'sapling')
        sapling.setOrigin(0,0)
        sapling.displayWidth = gameWidth;
        sapling.displayHeight = gameHeight;
        sapling.alpha = 0

        // sun
        const sun = this.add.sprite(0,0,'sun')
        sun.setOrigin(-.2,-.1)
        sun.displayWidth = gameWidth;
        sun.displayHeight = gameHeight;
        sun.setScale(.4)
        sun.alpha = 0


        // half
        const half = this.add.sprite(0,0,'halfTree')
        half.setOrigin(0,0)
        half.displayWidth = gameWidth;
        half.displayHeight = gameHeight;
        half.alpha = 0


        // // full

        const full = this.add.sprite(0,0,'grownTrees')
        full.setOrigin(0,0)
        full.displayWidth = gameWidth;
        full.displayHeight = gameHeight;
        full.alpha = 0



        this.inventoryUI = new InventoryUI(this,'closeInventoryButton');

        const serenText = this.add.text(20,20, "Green Serenity", {
            fontFamily: this.fontproperties.font,
            fontSize: 50,
            stroke : 'black',
            strokeThickness : 4,
        },);

        let sunCollected = false;
        let waterCollected = false;
        let flowerCollected = false;
        let seedCollected = false;
        
        // sun item
        const sunItem = new InventoryItem('Sun','Power of the sun in palm of my fingertips')
        sunItem.createItemText(this,gameWidth *.4,gameHeight*.3,'white','black',4)

        // water item
        const waterItem = new InventoryItem('Water','Gotta stay cool')
        waterItem.createItemText(this,gameWidth *.25,gameHeight*.4,'white','black',4)

        // flower item
        const flowerItem = new InventoryItem('Flowers','Roses are red violets are blue')
        flowerItem.createItemText(this,gameWidth *.1,gameHeight*.8,'white','black',4)

        // seed item
        const seedItem = new InventoryItem('Seeds','Blooming with potential')
        seedItem.createItemText(this,gameWidth *.2,gameHeight*.6,'white','black',4)

        sunItem.text.setInteractive();
        sunItem.text.on('pointerdown', () => {
            console.log('sun item has been collected')
            this.inventoryUI.collectItem(sunItem,'white','black',4)
            sunItem.text.destroy();
            sunCollected = true
        })

        
        waterItem.text.setInteractive();
        waterItem.text.on('pointerdown', () => {
            console.log('sun item has been collected')
            this.inventoryUI.collectItem(waterItem,'white','black',4)
            waterItem.text.destroy();
            waterCollected = true;
        })

        
        seedItem.text.setInteractive();
        seedItem.text.on('pointerdown', () => {
            console.log('sun item has been collected')
            this.inventoryUI.collectItem(seedItem,'white','black',4)
            seedItem.text.destroy();
            seedCollected = true;
        })

        
        flowerItem.text.setInteractive();
        flowerItem.text.on('pointerdown', () => {
            console.log('sun item has been collected')
            this.inventoryUI.collectItem(flowerItem,'white','black',4)
            flowerItem.text.destroy();
            flowerCollected = true;
        })


        let isInventoryOpen = false;
        let sunOut = false;
        let waterOut = false;
        let seedPlanted = false
        let seedGrowth = false
        
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
                    if (transcript.includes("open") && !isInventoryOpen) {  
                        // recognition is in progress
                        // this.recognitionInProgress = false;
                        // toggle inventory
                        this.inventoryUI.toggleInventory();
                        isInventoryOpen = true;
                    }
                    if(transcript.includes("close") && isInventoryOpen){
                        // this.recognitionInProgress = false;
                        this.inventoryUI.toggleInventory();
                        isInventoryOpen = false;
                    }
                    if (transcript.includes("son" || "sun") && sunCollected ){
                        sun.alpha = 1;
                        sunOut = true;
                    }
                    if (transcript.includes("water") && waterCollected){
                        water.alpha = 1;
                        waterCollected = true;
                        waterOut = true;
                    }
                    if (transcript.includes("flowers") && flowerCollected){
                        flower.alpha = 1;
                    }

                    if (transcript.includes("plant") && seedCollected && sunOut && waterOut){
                        seed.alpha = 1;
                        seedPlanted = true
                    }
                    if (transcript.includes("grow") && seedPlanted && waterOut && sunOut){
                        seed.alpha = 0;
                        sapling.alpha = 1;
                        seedGrowth = true
                    }
                    if (transcript.includes("bloom") && seedGrowth){
                        sapling.alpha = 0;
                        half.alpha = 1;
                        this.time.addEvent({
                            delay : 1000,
                            callback : () => {
                                half.alpha = 0;
                            },
                        })
                        full.alpha = 1
                        serenText.setText("Forest has been thriving onwards!")
                        this.time.addEvent({
                            delay : 2000,
                            callback : ()=>{
                                this.scene.start('makeAWish')
                            }
                        })

                        
                        
                    }
                    

                   
                }   
            }
        }

        recognizer.onend = () => {
            console.log("recognizer ended");
            console.log('restarting')
            recognizer.start();
        }

        


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
      
        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

    
        // background
        const background = this.add.sprite(0,0, 'makeAWishBackground');
        background.setOrigin(0,0);

        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;

         const makeWishText = this.add.text(gameWidth * .35,gameHeight * .3, "Make A Wish!", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
            color: 'black'
        },);
        makeWishText.alpha = 0;
        makeWishText.setDepth(1);




        // sun
        const sun = this.add.sprite(gameWidth * .5, gameHeight * .55, 'sun');
        // sun.setOrigin(0.5);
        sun.setScale(.7);

        // sun shade
        const sunShade = this.add.sprite(gameWidth * .5, gameHeight * .6, 'sunShade');
        sunShade.setScale(.6);

        // water shade
        const waterShade = this.add.sprite(gameWidth * .5, gameHeight * .55, 'waterShade');
        waterShade.setScale(0.9);

        // cliff
        const cliff = this.add.sprite(gameWidth * .5, gameHeight * .47, 'cliff');
        cliff.setScale(0.9);

        // cloud
        const cloud = this.add.sprite(gameWidth * .5, gameHeight * .4, 'cloud');
        cloud.setScale(0.9);

        
        this.inventoryUI = new InventoryUI(this,'closeInventoryButton');



        const inventory = this.inventoryUI.inventory;
        console.log(inventory);

        const paperItem = new InventoryItem('Paper','A piece of paper');


        paperItem.createItemText(this, gameWidth *.37, gameHeight * .93, 'black','white',4);

        paperItem.text.setInteractive();
        paperItem.text.on('pointerdown', () => {
            console.log('paper item clicked')
            this.inventoryUI.collectItem(paperItem, 'black','white',4);
            paperItem.text.destroy();
            console.log(inventory);
        });

        let recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = "en-US";
        recognizer.start();
        console.log("recognizer started");
        let isInventoryOpen = false;
        let paperFOUND = false;
        let paperImageCount = 0;
        let makingWish = false; 
        let actionExecuted = false;
        let codeBlockExecuted = false;

        
        const paper1 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'paper1');
        paper1.setScale(0.7);
        paper1.alpha = 0;

        const paper2 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'paper2');
        paper2.setScale(0.7);
        paper2.alpha = 0;

        const paper3 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'paper3');
        paper3.setScale(0.7);
        paper3.alpha = 0;

        const paper4 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'paper4');
        paper4.setScale(0.7);
        paper4.alpha = 0;

        const paper5 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'paper5');
        paper5.setScale(0.7);
        paper5.alpha = 0;

        const airplane1 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'airplane1');
        airplane1.setScale(0.7);
        airplane1.alpha = 0;

        const airplane2 = this.add.sprite(gameWidth * .5, gameHeight * .6, 'airplane2');
        airplane2.setScale(0.5);
        airplane2.alpha = 0;

        const airplane3 = this.add.sprite(gameWidth * .5, gameHeight * .6, 'airplane3');
        airplane3.setScale(0.5);
        airplane3.alpha = 0;

        const airplane4 = this.add.sprite(gameWidth * .5, gameHeight * .55, 'airplane4');
        airplane4.setScale(0.5);
        airplane4.alpha = 0;

        function updatePaperImage(){
            switch(paperImageCount){
                case 1:
                    paper1.alpha = 1;
                    break;
                case 2:
                    paper1.alpha = 0;
                    paper2.alpha = 1;
                    break;
                case 3:
                    paper2.alpha = 0;
                    paper3.alpha = 1;
                    break;
                case 4:
                    paper3.alpha = 0;
                    paper4.alpha = 1;
                    break;
                case 5:
                    paper4.alpha = 0;
                    paper5.alpha = 1;
                    break;
                
            }
        }

        recognizer.onresult = (event) => {
            if (!this.recognitionInProgress) {
                for(let i = event.resultIndex; i < event.results.length; i++){
                    const transcript = event.results[i][0].transcript.toLowerCase();
                    console.log(transcript); 
                    if (transcript.includes("open") && !isInventoryOpen){  
                        // recognition is in progress
                        // this.recognitionInProgress = false;
                        // toggle inventory
                        this.inventoryUI.toggleInventory();
                        isInventoryOpen = true;
                    }

                    if(transcript.includes("close") && isInventoryOpen){
                        // this.recognitionInProgress = false;
                        this.inventoryUI.toggleInventory();
                        isInventoryOpen = false;
                    }

                    if (transcript.includes("paper") && inventory.length === 1){
                        console.log('paper found');
                        this.recognitionInProgress = false;
                        paperImageCount = 1;
                        paperFOUND = true;
                        updatePaperImage();
                        makeWishText.alpha = 1;
                        actionExecuted = true;
                        makingWish = true;
                        makeWishText.setText('Wish: '); // Clear previous wishes


                    }
                    if (transcript.includes("fold") && paperFOUND && paperImageCount > 0 && paperImageCount < 5){
                        this.recognitionInProgress = false;
                        console.log('paper folded');
                        if (paperImageCount <= 1){
                            makeWishText.alpha = 0;
                        }
                        paperImageCount++;
                        updatePaperImage();

                    }
                    if (transcript.includes("throw") && paperFOUND && paperImageCount === 5 && !codeBlockExecuted){
                        codeBlockExecuted = true;
                        this.recognitionInProgress = false;
                        console.log('paper flying');
                        
                        this.time.addEvent({
                            delay : 1000,
                            callback : () => {
                                console.log('delay completed');
                                paper5.alpha = 0;
                                airplane1.alpha = 1;
                            }
                        });
                        this.time.addEvent({
                            delay : 2000,
                            callback : () => {
                                console.log('delay completed');
                                airplane1.alpha = 0;
                                airplane2.alpha = 1;

                            }
                        });

                        this.time.addEvent({
                            delay : 3000,
                            callback : () => {
                                console.log('delay completed');
                                airplane2.alpha = 0;
                                airplane3.alpha = 1;

                            }
                        });

                        this.time.addEvent({
                            delay : 4000,
                            callback : () => {
                                console.log('delay completed');
                                airplane3.alpha = 0;
                                airplane4.alpha = 1;
                                airplane4.alpha = 0;
                                // this.cameras.main.setBackgroundColor('#ffffff'); // 'ffffff' is the hex color for white
                                sun.destroy();
                                sunShade.destroy();
                                waterShade.destroy();
                                cliff.destroy();
                                cloud.destroy();
                                background.destroy();
                                this.inventoryUI.destroy();
                                this.cameras.main.setBackgroundColor('#ffffff'); // 'ffffff' is the hex color for white\

                                const wishText = this.add.text(gameWidth * .3, gameHeight * .5, 'Your wish has been granted!', {
                                    fontFamily: this.fontproperties.font,
                                    fontSize: 50,
                                    color : 'black'
                                });

                                this.time.addEvent({
                                    delay : 1000,
                                    callback : () => {
                                        console.log('delay completed');
                                        this.scene.start('whosLoudest');
                                    }
                                });




                            }
                        });
                       
                    }

                    recognizer.onend = () => {
                        console.log("recognizer ended");
                        console.log('restarting')
                        recognizer.start();
                    }


                    if (makingWish){
                        this.time.addEvent({
                            delay : 6000,

                            callback : () => {
                                console.log('delay completed');
                                makeWishText.setText('Wish:' + transcript); // Clear previous wishes
                                // actionExecuted = false;
                                makingWish = false;
                            }
                        })
                       
                        // makeWishText.alpha = 0; // Hide wish text
                        
                    }
                   
                }}}


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


        const loudestText = this.add.text(gameWidth *.3,gameHeight / 2 *.1, "Who's the Loudest?", {
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
                const slug = this.add.sprite(gameWidth * .3, gameHeight *.7 , 'slug');
                slug.setScale(0.7);

                const butterfly = this.add.sprite(gameWidth * .375, gameHeight *.55 , 'butterfly');
                butterfly.setScale(0.4);

                const racoon = this.add.sprite(gameWidth * .65, gameHeight *.55 , 'racoon');
                racoon.setScale(0.4);

                const fox = this.add.sprite(gameWidth * .9, gameHeight *.55 , 'fox');
                fox.setScale(0.4);

                this.tweens.add({
                    targets: slug,
                    scaleX: .8,
                    scaleY: .8,
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
                                                            fontSize: 80,
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
                                                                fontSize: 80,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('Recordance');

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
                                                                fontSize: 80,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('Recordance');

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
                                                                fontSize: 80,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('Recordance');

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
                                                                fontSize: 80,
                                                            });

                                                            this.time.addEvent({
                                                                delay :5000,
                                                                callback : () => {
                                                                    console.log('delay completed level transition');
                                                                    this.scene.start('Recordance');
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


class Recordance extends ConfigureScene{
    constructor(){
        super('Recordance');
        
    }
    create(){
        this.add.text(20,20, "Recordance Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;

        // background
        const background = this.add.sprite(0,0, 'recordanceBackground');
        background.setOrigin(0,0);

        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;

        const title = this.add.sprite(gameWidth / 2, gameHeight * .5, 'recordanceTitle');
        title.setScale(0.6);
       
        const startText = this.add.sprite(gameWidth * .5, gameHeight * .5, 'startText');
        startText.setScale(0.5);

        const channelButton = this.add.sprite(gameWidth * 0.51, gameHeight * 0.55, 'channelOne');
        channelButton.setScale(0.7);

        console.log('Initial position of channelButton:');
        console.log('X:', channelButton.x);
        console.log('Y:', channelButton.y);



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
                    if(transcript.includes('start')){
                        title.destroy();
                        startText.destroy();
                        channelButton.destroy();
                        recognizer.stop();

                        const prompt = this.add.sprite(gameWidth *.4 , gameHeight * .4, 'recordancePrompt');
                        prompt.setScale(0.5);

                        const scrollPrompt = this.add.sprite(gameWidth /2 , gameHeight * .5, 'scrollText');
                        scrollPrompt.setScale(0.5);

                        const channelOne = this.add.sprite(gameWidth * 0.51, gameHeight * 0.55, 'channelOne');
                        channelOne.setScale(0.7);
                        
                        console.log('Initial position of channelOne:');
                        console.log('X:', channelOne.x);
                        console.log('Y:', channelOne.y);


                        // Define an array of frame names in the desired order
                        const frameNames = ['channelOne', 'channelTwo', 'channelThree', 'channelFour'];


                        // Initialize the current frame index
                        let currentFrameIndex = 0;

                        // Set the initial frame
                        channelOne.setTexture(frameNames[currentFrameIndex]);

                        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                            console.log('wheel');
                            scrollPrompt.destroy();

                            if (deltaY > 0) {
                                console.log('down');
                                // Decrement the frame index (scrolling down)
                                currentFrameIndex = (currentFrameIndex - 1 + frameNames.length) % frameNames.length;
                            } else if (deltaY < 25) {
                                console.log('up');
                                // Increment the frame index (scrolling up)
                                currentFrameIndex = (currentFrameIndex + 1) % frameNames.length;
                            }

                            // Set the sprite to the new frame
                            channelOne.setTexture(frameNames[currentFrameIndex]);

                            // Define our sounds here for each channel
                            const channelOneSound = this.sound.add('channelOneSound');
                            const channelTwoSound = this.sound.add('channelTwoSound');
                            const channelThreeSound = this.sound.add('channelThreeSound');
                            const channelFourSound = this.sound.add('channelFourSound');

                            switch(currentFrameIndex){
                                case 0:
                                    this.sound.stopAll();
                                    channelOneSound.play();
                                    break;
                                case 1:
                                    this.sound.stopAll();  
                                    channelTwoSound.play();
                                    break;
                                case 2:
                                    this.sound.stopAll();  
                                    channelThreeSound.play();
                                    break;
                                case 3:
                                    this.sound.stopAll();  
                                    channelFourSound.play();
                                    this.time.addEvent({
                                        delay : 4000,
                                        callback : () => {
                                            // console.log('delay completed');
                                            // this.scene.start('Menu');
                                            const recordanceNotes = this.add.sprite(gameWidth * .5, gameHeight * .5, 'recordanceNotes');
                                            recordanceNotes.setScale(0.4);
                                            prompt.destroy();
                                            this.time.addEvent({
                                                delay : 2000,
                                                callback : () => {
                                                    console.log('delay completed');
                                                    this.sound.stopAll();
                                                    this.scene.start('whatSound');
                                                }
                                            });
                                           
                                        }
                                    });
                                    break;
                            }
                        });

                        recognizer.onend = () => {
                            console.log("recognizer ended");
                            console.log('restarting')
                            recognizer.start();
                        }
                        

                       







                    } 
                }   
            }
        }
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

        const gameWidth = this.scale.width;
        const gameHeight = this.scale.height;
        const background = this.add.sprite(0,0, 'WhatSoundBackground');
        background.setOrigin(0,0);

        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight; 

        const BirdSound = this.sound.add('bird_mp3');
        const CricketSound = this.sound.add('cricket_mp3');
        const RainSound = this.sound.add('rain_mp3');

        // Bird = this.add.sprite('bird');
        // Cricket = this.add.sprite('bug');
        // Rain = this.add.sprite('rain');

        // put first audio here along
        BirdSound.play();

        let recognizer = new webkitSpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = "en-US";
        recognizer.start();
        console.log("recognizer started");

        recognizer.onresult = (event) => {
            recognizer.onend = () => {
                console.log("recognizer ended");
                console.log('restarting')
                recognizer.start();
            }

            if (!this,recognizerInprogress) {
                for (let i = event.resultIndex; i < event.results.length; i++){
                    const transcript = event.results[i][0].transcript.toLowerCase();
                    console.log(transcript); 

                    if (transcript.includes ("bird")){
                        BirdSound.stop();
                    } 

                    CricketSound.play();    

                    if (transcript.includes ("cricket")){
                        CricketSound.stop();
                    }

                    RainSound.play();   

                    if (transcript.includes ("rain")){
                        RainSound.stop();
                        this.add.text(this.scale.width *.8, this.scale.height * .5,
                         "Great Job, say NEXT to go to the next minigame!", this.fontproperties.font, fontSize(100)
                        );
                    }
                    if (transcript.included ("next")){
                        this.scene.start('rememberGong');
                    }
                }
            }
        }

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
    scene : [ConfigureScene,Menu,firstLevel,makeAWish,whosLoudest,Recordance,whatSound,rememberGong],
}

const game = new Phaser.Game(config);