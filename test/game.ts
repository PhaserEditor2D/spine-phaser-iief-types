class Level extends Phaser.Scene {

    preload() {

        this.load.spineAtlas("spine-atlas", "assets/spine.atlas");
        
        this.load.spineJson("spine-data", "assets/spine.json")
    }

    create() {

        const obj = this.add.spine(0, 0, "data-key", "atlas-key");

        obj.setScale(0.5, 0.5);
    }
}