import { Application, EventSystem } from "pixi.js";

import Matrix from './matrix.js' ;
import Sand from './particles/solids/moveableSolids/sand.js'

var mouseDown = false;
var mouseX = null;
var mouseY = null;

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

        if(mouseDown){
            matrix.createParticle(mouseX, mouseY);
        }
    }

    // Enable event system (required in v8)
    app.renderer.events = new EventSystem(app.renderer);

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    app.stage.on("mousedown", (event) => {
        //console.log("mouse global:", event.global.x, event.global.y);
        //matrix.createParticle(Math.trunc(event.global.x / matrix.getTileSize()), Math.trunc(event.global.y / matrix.getTileSize()));
        mouseX = Math.trunc(event.global.x / matrix.getTileSize());
        mouseY = Math.trunc(event.global.y / matrix.getTileSize());
        mouseDown = true;
    
    });

    app.stage.on("mousemove", (event) => {
        //console.log("mouse global:", event.global.x, event.global.y);
        //matrix.createParticle(Math.trunc(event.global.x / matrix.getTileSize()), Math.trunc(event.global.y / matrix.getTileSize()));
        mouseX = Math.trunc(event.global.x / matrix.getTileSize());
        mouseY = Math.trunc(event.global.y / matrix.getTileSize());
    });

    app.stage.on("mouseup", (event) => {
        //console.log("mouse global:", event.global.x, event.global.y);
        //matrix.createParticle(Math.trunc(event.global.x / matrix.getTileSize()), Math.trunc(event.global.y / matrix.getTileSize()));
        
        mouseDown = false;
    });

    

})();
