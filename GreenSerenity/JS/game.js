// Make sure game.js is loaded in index.html
console.log("game.js loaded");

// ----------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------CODE BREAKDOWN------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

// ConfigureScene - preload assets and create the trash objects which all level scenes will use
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
        this.fontproperties = {font:'Pixelify Sans'};
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
class Menu extends ConfigureScene {
    constructor(){
        super('Menu');
    }
    create(){
        this.add.text(20,20, "Menu Scene", {
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
    
    
    scene : [ConfigureScene,Menu],
}

const game = new Phaser.Game(config);