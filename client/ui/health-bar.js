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
       const currentPips = this.pips.length;
       this.health -= amount;
       this.health < 0 && (this.health = 0);

       // FIXME: This seems like it's probably wrong, but I am nowhere near awake enough to figure out what it should be.
       const targetPips = this.health / this.healthPerTick;
       const difference = currentPips - targetPips;
       for(let i = 0; i < difference; i++) {
           const pipToRemove = this.pips.pop();
           pipToRemove.parent.removeChild(pipToRemove);
       }
   }
}