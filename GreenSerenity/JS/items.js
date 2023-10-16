// Where we will store all the items in the game
class InventoryItem {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.text = null;
        this.fontproperties = {font:'Modak'};

    }

    createItemText(scene, x, y,color,stroke,thickness) {
        this.text = scene.add.text(x, y, this.name, {
            fontSize: '40px',
            color : color,
            fontFamily: this.fontproperties.font,
            stroke :stroke,
            strokeThickness : thickness,
        });
    }
}

export { InventoryItem }