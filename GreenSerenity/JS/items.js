// Where we will store all the items in the game
class InventoryItem {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.text = null;
    }

    createItemText(scene, x, y) {
        this.text = scene.add.text(x, y, this.name, {
            fontSize: '18px',
            fill: '#fff',
        });
    }
}

export { InventoryItem }