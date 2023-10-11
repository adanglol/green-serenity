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
        const sceneWidth = this.scene.cameras.main.width;
        const sceneHeight = this.scene.cameras.main.height;

        const inventoryWidth = sceneWidth;
        const inventoryHeight = sceneHeight * 0.2; // 10% of the scene height

        const inventoryBackground = this.scene.add.rectangle(
            0,
            sceneHeight - inventoryHeight, // align to bottom of the screen
            inventoryWidth,
            inventoryHeight,
            0xD2B48C
        );
        
        // modifying properties of the background
        inventoryBackground.alpha = 0.8;
        inventoryBackground.setOrigin(0);

        // adding the background to the container
        this.inventoryUIContainer.add(inventoryBackground);

        //  Create inventory button to toggle inventory UI
        this.inventoryButton = this.scene.add.text(0,0, '👜', {
            fontFamily: this.fontproperties.font,
            fontSize: 50,
        }).setInteractive();

          // Calculate the X position to center the button horizontally
        //   (inventoryWidth - this.inventoryButton.width) / 2;
          const buttonX = sceneWidth * .9;
          // Set the Y position to place the button at the top of the container
        //   sceneHeight *.75
          const buttonY = sceneHeight * .05;
  
          // Set the position of the button
          this.inventoryButton.setPosition(buttonX, buttonY);

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
        // this.inventoryUIContainer.visible = !this.inventoryUIContainer.visible;
        //  If its invisible fade it in
        if (!this.inventoryUIContainer.visible){
            // if currently invisble fade it in
            this.inventoryUIContainer.alpha = 0;
            this.scene.tweens.add({
                targets : this.inventoryUIContainer,
                alpha : 1,
                duration : 1000,
                ease : 'Power2',
                onStart : () => {
                    this.inventoryUIContainer.visible = true;
                },
            })
        } else {
            // if its currently visible fade it out
            this.scene.tweens.add({
                targets : this.inventoryUIContainer,
                alpha : 0,
                duration : 1000,
                ease : 'Power2',
                onComplete : () => {
                    this.inventoryUIContainer.visible = false; // set visible to false
                }
            });
        }
    }

    updateInventory(){
         // Get the dimensions of the background rectangle
         const background = this.inventoryUIContainer.getAt(0);
         const backgroundWidth = background.displayWidth;
         const backgroundHeight = background.displayHeight;
 
         // Calculate the width and height of each item's display area within the background
         const itemWidth = backgroundWidth / 4; // Adjust the divisor as needed
         const itemHeight = backgroundHeight / Math.ceil(this.inventory.length / 4); // 4 items per row
 
        // Calculate the vertical spacing needed for centering the item text vertically
         const verticalSpacing = (itemHeight - 18) / 2; // Adjust the value as needed

        // Calculate the horizontal spacing needed for centering the items horizontally
        const horizontalSpacing = (itemWidth - 18) / 2; // Adjust the value as needed

        // Calculate the font size as a percentage of the item's height
        const fontSizePercentage = 20; // Adjust the percentage as needed
        const fontSize = `${(itemHeight * fontSizePercentage) / 100}px`;

         for (let i = 0; i < this.inventory.length ; i++){
             const item = this.inventory[i];
 
             // calculate the row and column for each item
             const row = Math.floor(i / 4);
             const column = i % 4;
 
             // Calculate the X and Y positions based on the row, column, and item dimensions
             const itemX = column * itemWidth;
             const itemY = row * itemHeight;

             const itemText = this.scene.add.text(
                 itemX + background.x + horizontalSpacing,
                 itemY + background.y + verticalSpacing,
                   item.name,
                 {
                 fontSize: fontSize,
                 fill: '#fff',
                 fontFamily: this.fontproperties.font,
                 }
             );
             this.inventoryUIContainer.add(itemText);
            }
    }
    getInventory(){
        return this.inventory;
    }
    deleteInventory(){
        this.inventory = [];
        this.itemcount = 0;
        // this.inventoryUIContainer.removeAll(true);
        this.toggleInventory();
    }
    destroy(){
        this.inventoryButton.destroy();
        this.inventoryUIContainer.destroy();
    }
 

   
}

export { InventoryUI }