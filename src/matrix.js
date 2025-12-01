import { Graphics } from "pixi.js";
import Sand from "./particles/solids/moveableSolids/sand";

class Matrix {
    constructor(app){

        this.app = app;
        this.tileSize = 10;

        // Initialize matrix to size of the canvas with null values
        this.rows = Math.trunc(app.canvas.height / this.tileSize);
        this.cols = Math.trunc(app.canvas.width / this.tileSize);

        this.matrix = []

        for (let r = 0; r < this.rows; r++)
        {
            this.matrix[r] = [];
            for(let c = 0; c < this.cols; c++)
            {
                this.matrix[r][c] = null;
            }
        }
    }

    updateGrid(){
        for (let r = this.rows-1; r >= 0; r--)
        {
            for(let c = this.cols-1; c >= 0; c--)
            {
                if(this.getParticle(c, r) != null){
                    this.matrix[r][c].move();
                }
            }
        }
    }

    createParticle(x, y){
        if(this.matrix[y][x] == null){
            this.matrix[y][x] = new Sand(x, y, false, true, 5, 0, this.app, this);
        }
        
    }

    swapParticles(x1, y1, x2, y2){
        let p1 = this.getParticle(x1, y1);
        let p2 = this.getParticle(x2, y2);

        if(p2 == null){
            this.matrix[y2][x2] = p1;
            this.matrix[y1][x1] = null;
            p1.setPosition(x2, y2);
        }
    }


    getParticle(x, y)
    { 
        return this.matrix[y][x]; 
    }

    getTileSize(){ return this.tileSize; }

    getRows(){ return this.rows; }
    getCols(){ return this.cols; }

    addParticle(x, y, p){
        this.matrix[y][x] = p;
        this.addToStage(p);
    }


    addToStage(obj){
        this.app.stage.addChild(obj);
    }
}

export default Matrix;