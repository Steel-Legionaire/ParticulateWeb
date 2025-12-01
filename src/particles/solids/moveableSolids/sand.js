import { Graphics } from "pixi.js";
import MoveableSolid from './moveableSolid'

class Sand extends MoveableSolid{
    constructor(x, y, isFlammable, isDestructable, toughness, speed, app, matrix){
        super(x, y, isFlammable, isDestructable, toughness, speed, app, matrix)

        this.rect.fill(0xff0000);
        this.rect.position.set(this.x * this.tileSize, this.y * this.tileSize);
        this.addToStage(this.rect);
    }


}

export default Sand;