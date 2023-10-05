
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
                        this.scene.start('firstLevel');
                    }
                }   
            }
        }
        // start the game when the start button is clicked instead of saying "start" as another option
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => {
            recognizer.stop();
            this.scene.start('firstLevel');
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
        this.add.text(20,20, "Level4 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

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
    
    
    scene : [ConfigureScene,Menu,firstLevel],
}

const game = new Phaser.Game(config);