// Where we will store all the items in the game
class InventoryItem {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.text = null;
        this.fontproperties = {font:'Pixelify Sans'};

    }

    createItemText(scene, x, y) {
        this.text = scene.add.text(x, y, this.name, {
            fontSize: '40px',
            fill: '#fff',
            fontFamily: this.fontproperties.font,
        });
    }
}

export { InventoryItem }