import Particle from "../particle";

class Solid extends Particle{
    constructor(x, y, isFlammable, isDestructable, toughness, speed, app, matrix){
        super(x, y, isFlammable, isDestructable, toughness, speed, app, matrix)
    }
}

export default Solid;