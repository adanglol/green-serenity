
// Make sure game.js is loaded in index.html
console.log("game.js loaded");

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
        // inventory array
        this.inventory = [];
        this.itemcount = 0;
        // flag for recognizing speech
        this.recognitionInProgress = false;
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

    collectItem(item){
        this.inventory.push(item);
        this.itemcount++;
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


        this.add.text(20,20, "Menu Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

        const startButton = this.add.text(20, 100, 'Say "start" to begin the game or click here!', {
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
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
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
        this.add.text(20,20, "Level1 Scene", {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        },);

        const item1 = this.add.text(20, 100, 'Say "item" to collect the item or click here!', {
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
    
                    if (transcript.includes("item")) {
                        // recognition is in progress stops it and collect the item and stop the recognizer
                        this.recognitionInProgress = true;
                        this.collectItem(item1);
                        recognizer.stop();
                        item1.destroy();
                        console.log("recognizer stopped");
                        console.log("inventory",this.inventory);
                        console.log(this.itemcount);  
                    }
                }
            }
            
        }



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
// -----------------------------Level3 Scene------------------------------------
// ---------------------------------------------------------------------------

class thirdLevel extends ConfigureScene {
    constructor(){
        super('thirdLevel');
    }
    create(){
        this.add.text(20,20, "Level3 Scene", {
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