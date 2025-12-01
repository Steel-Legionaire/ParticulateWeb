import { Application, EventSystem } from "pixi.js";

import Matrix from './matrix.js' ;
import Sand from './particles/solids/moveableSolids/sand.js'

(async () => {
    const app = new Application();
    await app.init({
        width: 1500,
        height: 800,
    });
    document.body.appendChild(app.canvas);
    app.renderer.events = new EventSystem(app.renderer);

    const matrix = new Matrix(app)

    //app.stage.addChild(new Graphics().rect(10,10,10,10).fill(0xffffff));

    app.ticker.add(gameLoop);

    function gameLoop(){
        //console.log('Updating');
        matrix.updateGrid();
    }

    // Enable event system (required in v8)
    app.renderer.events = new EventSystem(app.renderer);

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    app.stage.on("mousedown", (event) => {
        console.log("mouse global:", event.global.x, event.global.y);
        matrix.createParticle(Math.trunc(event.global.x / matrix.getTileSize()), Math.trunc(event.global.y / matrix.getTileSize()));
    });

    

})();
