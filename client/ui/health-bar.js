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

    // total will be an array of indexes
    healthAdded(total, image) {
        for (let added = 0; added < total; ++added)
        {
            this.healths[total[added]].setTe
        }
    }

    damageTaken(total) {

    }
}