import Solid from '../solid'


class MoveableSolid extends Solid{
    constructor(x, y, isFlammable, isDestructable, toughness, speed, app, matrix)
    {
        super(x, y, isFlammable, isDestructable, toughness, speed, app, matrix)
        this.framesSinceLastUpdate = 0;
    }

    move(){
        if(this.framesSinceLastUpdate == this.speed && !(this.movedThisFrame)){
            //console.log(`${this.getX()}, ${this.getY()}`);
            var bottomTile = this.getY()+1 < this.matrix.getRows() ? this.matrix.getParticle(this.x, this.y+1) : undefined ;

            if(bottomTile === null){
                this.matrix.swapParticles(this.getX(), this.getY(), this.getX(), this.getY()+1);
            }

            this.framesSinceLastUpdate = 0;
            this.movedThisFrame = true;

        }else if(this.movedThisFrame){
            this.movedThisFrame = false;
            
        }else{
            this.framesSinceLastUpdate++;
        }





    }

    action(){

    }
}

export default MoveableSolid;