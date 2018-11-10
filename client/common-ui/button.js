export class Button extends PIXI.Sprite {

    constructor(x, y, width, height) {
        super();
        this.createButton(x, y, width, height);
    }

    createButton(x, y, width, height) {
        let gfx = new PIXI.Graphics();
        gfx.beginFill(0xfffffff, 1);
        gfx.drawRoundedRect(0, 0, width, height, height / 5);
        gfx.endFill();

        this.texture = gfx.generateCanvasTexture();

        // Set X, Y and Anchor
        this.x = x;
        this.y = y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.buttonMode = true;
        this.interactive = true;

        // TODO: pass callback into onDown
        this.on("mouseDown", () => {this.onDown()})
    }

    onDown(callback){
        console.log('%cClicked', 'background: #000; color: #fff; font-weight:bold');

        // TODO: do callback stuff
    }


}


