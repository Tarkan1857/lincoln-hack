const pipCount = 8;

export class HealthBar extends PIXI.Container {
    // first:
    // 325, 16

    // width: 73 per pip
    // 8 total
    constructor(initialHealth) {
        super();
        this.health = initialHealth;
        this.healthPerTick = initialHealth / pipCount;
        this.pips = [];
        for(let i = 0; i < 8; i++) {
            const pip = PIXI.Sprite.fromImage('pip');
            pip.x = 73 * i;
            this.addChild(pip);
            this.pips.push(pip);
        }
    };
    
   damage(amount) {
       // TODO: calculate how many pips remain and remove extras
       this.health -= amount;
       this.health < 0 && (this.health = 0);

   }
}