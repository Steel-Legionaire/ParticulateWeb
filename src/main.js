
import Matrix from './matrix.js' ;

import { Sand, Dirt, Stone, Water, Ash } from "./particles/particles.js";

const { Application, EventSystem, Text, Container, Graphics } = PIXI;

let maxWidth = 1800;
let maxHeight = 1000;

let mouseDown = false;
let mouseX = null;
let mouseY = null;

let previouseMouseX = null;
let previouseMouseY = null;

let selectedParticle = Sand;

(async () => {
    const app = new Application();
    await app.init({
        view: document.querySelector("#pixi"),
        // set height and width only if window is smaller than max sizes
        width: window.innerWidth < maxWidth ? window.innerWidth : maxWidth,
        height: window.innerHeight < maxHeight ? window.innerHeight : maxHeight,
    });

    document.body.appendChild(app.canvas);

    const containers = {
        playArea: new Container(),
        menu: new Container(),
        ui: new Container(),
    };

    containers.menu.x = 0;
    containers.menu.y = app.screen.height - 300;

    addToStage(containers.playArea, containers.menu, containers.ui);

    // set background color and size of container
    containers.playArea.addChild(new Graphics().rect(0, 0, app.screen.width, app.screen.height - 300).fill(0x555555));
    containers.menu.addChild(new Graphics().rect(0, 0, app.screen.width, 300).fill(0x333333))


    

    const matrix = new Matrix(app, containers)

  


    app.ticker.add(gameLoop);

    function gameLoop(){
        matrix.updateGrid();

        if(mouseDown){
            matrix.traverseMatrixAndCreate(previouseMouseX, previouseMouseY, mouseX, mouseY, selectedParticle);
        }
    }

    const outline = new Graphics().rect(0,0, matrix.getTileSize(), matrix.getTileSize()).stroke({ width: 1, color: 0xff0000 });
    containers.ui.addChild(outline);

    createMenu();

    // Mouse and keyboard inputs
    app.renderer.events = new EventSystem(app.renderer);
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    app.stage.on("pointerdown", (event) => {
        previouseMouseX = mouseX;
        previouseMouseY = mouseY;

        mouseX = Math.trunc(event.global.x / matrix.getTileSize());
        mouseY = Math.trunc(event.global.y / matrix.getTileSize());
        mouseDown = true;
    
    });

    app.stage.on("pointermove", (event) => {
        previouseMouseX = mouseX;
        previouseMouseY = mouseY;

        mouseX = Math.trunc(event.global.x / matrix.getTileSize());
        mouseY = Math.trunc(event.global.y / matrix.getTileSize());

        outline.position.set(mouseX * matrix.getTileSize(), mouseY * matrix.getTileSize());
    });

    app.stage.on("pointerup", (event) => {
        mouseDown = false;
    });

    function addToStage(){
        for(let i = 0; i < arguments.length; i++){
            let child = arguments[i];
            if(child && child.emit){
                app.stage.addChild(arguments[i]);
            }
            else{
                console.error('Invalid Child: ', child);
            }
            
        }
    }

    // Create a Text object to display the FPS
    const fpsText = new Text('FPS: 0', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
    });
    fpsText.x = 10;
    fpsText.y = 10;
    containers.menu.addChild(fpsText);

    // Add a listener to the ticker to update the FPS display
    let updateFps = true;
    app.ticker.add(() => {
        if(updateFps){
            fpsText.text = `FPS: ${app.ticker.FPS.toFixed(0)}`;
            updateFps = false;
        }else{
            updateFps = true;
        }
        
    });
    
    function createButton(label, width = 150, height = 50){
        const container = new Container();

        const button = new Graphics()
            .roundRect(0, 0, width, height, 10)
            .fill(0x4a90e2);

        container.addChild(button);

        const text = new Text(label, {
            fontSize: 20,
            fill: 0xffffff,
        })

        text.anchor.set(0.5);
        text.position.set(width / 2, height / 2);

        container.addChild(text);

        container.cursor = 'pointer';
        container.eventMode = 'static';

        container.on('pointerover', () => (button.scale.set(1.05)));
        container.on('pointerout', () => (button.scale.set(1)));

        return container;
    }

    function createMenu(){
        let buttonY = 50;
        let buttonIndent = 50;
        let buttonSpacing = 175;
        


        let allButtons = createButtons(buttonY, buttonSpacing, buttonIndent);

        //allButtons["staticSolidsButtons"]["stoneBtn"].visible = false;
    }

    function createButtons(buttonY, buttonSpacing, buttonIndent){

        let allButtons = {
            staticSolidsButtons: {
                stoneBtn: createButton("Stone").on('pointerdown', () => { selectedParticle = Stone; }),
            },
            moveableSolidsButtons: {
                sandBtn: createButton("Sand").on('pointerdown', () => { selectedParticle = Sand; }),
                dirtBtn: createButton("Dirt").on('pointerdown', () => { selectedParticle = Dirt; }),
                ashBtn: createButton("Ash").on('pointerdown', () => { selectedParticle = Ash }),
            },
            liquidsButtons: {
                waterBtn: createButton("Water").on('pointerdown', () => { selectedParticle = Water }),
            },
            gasesButtons: {},
            miscButtons: {
                eraserBtn: createButton("Eraser").on('pointerdown', () => { selectedParticle = null }),
            },
        }

        let i = 0;
        for(let btns in allButtons){
            btns = allButtons[btns];
            for(let btn in btns){

                let btnPos = buttonSpacing*i + buttonIndent;
                let row = 1;

                if(btnPos + btns[btn].width >= app.screen.width){
                    i = 0;
                    row++;

                    buttonY = (buttonY * row) + buttonIndent/2;
                    btnPos = buttonSpacing*i + buttonIndent;
                }
                
                if(i == 0){ btns[btn].position.set(buttonIndent, buttonY); }
                else{
                    btns[btn].position.set(btnPos, buttonY);
                }

                containers.menu.addChild(btns[btn]);
                i++;
            }
        }


        return allButtons;

    }

    /*window.addEventListener('resize', () => {
        console.log('Resized!');

        let newWidth = window.innerWidth < maxWidth ? window.innerWidth : maxWidth;
        let newHegiht = window.innerHeight < maxHeight ? window.innerHeight : maxHeight;

        app.renderer.resize( newWidth, newHegiht);

        containers.playArea.width = newWidth;
        containers.menu.width = newWidth;

    })*/

})();

