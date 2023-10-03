// Where we will have our UI elements within our game

// start with inventory UI
class InventoryUI {
    constructor(scene){
        // Store a reference to the scene
        this.scene = scene;
        // Create a reference to the inventory
        this.inventory = [];
        // Create a reference to the item count
        this.itemcount = 0;
        // font properties
        this.fontproperties = {font:'Pixelify Sans'};

        // Create a container for the inventory UI elements
        this.inventoryUIContainer = this.scene.add.container(0, 0);
        this.inventoryUIContainer.visible = false;
        // Create a background for the inventory UI container
        const inventoryBackground = this.scene.add.rectangle(
            0,
            0,
            400,
            300,
            0x333333
        );
        
        // modifying properties of the background
        inventoryBackground.alpha = 0.8;
        inventoryBackground.setOrigin(0);

        // adding the background to the container
        this.inventoryUIContainer.add(inventoryBackground);

        //  Create inventory button to toggle inventory UI
        this.inventoryButton = this.scene.add.text(20, 200, '👜', {
            fontFamily: this.fontproperties.font,
            fontSize: 30,
        }).setInteractive();

        this.inventoryButton.on('pointerdown', () => {
            this.toggleInventory();
        });


    }
    collectItem(item){
        this.inventory.push(item);
        this.itemcount++;
        this.updateInventory();

    }
    toggleInventory(){
        this.inventoryUIContainer.visible = !this.inventoryUIContainer.visible;
    }
    updateInventory(){
        // Clear the inventory UI
        // this.inventoryUIContainer.removeAll();
        for (let i = 0; i < this.inventory.length ; i++){
            const item = this.inventory[i];
            
            const itemText = this.scene.add.text(16, 50 * i + 50, item.name, {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: this.fontproperties.font,
            });

            this.inventoryUIContainer.add(itemText);
        }

    }
}

export { InventoryUI }