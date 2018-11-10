export class HealthBar extends PIXI.Container {
    constructor(images,) {
        super();
        this.images = images;
        this.healths = [];
        this.createHealthBar()
    };

    createHealthBar() {
        for (let health in this.images)
        {
            this.healths.push(this.addChild(new PIXI.Sprite(this.images[health])));
        }
    }
    
    healthAdded(idx, image) {
        for (let added = 0; added < idx; ++added)
        {
            this.removeChild(this.healths[idx[added]]);
            this.healths[idx[added]] = new PIXI.Sprite(image);
        }
    }

    damageTaken(idx, image) {
        for (let added = 0; added < idx; ++added)
        {
            this.removeChild(this.healths[idx[added]]);
            this.healths[idx[added]] = new PIXI.Sprite(image);
        }
    }
}