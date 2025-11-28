

class Matrix {
    constructor(app){

        this.app = app;
        const tileSize = 10;

        // Initialize matrix to size of the canvas with null values
        const rows = Math.trunc(app.canvas.width / tileSize);
        const cols = Math.trunc(app.canvas.height / tileSize);

        const matrix = []

        for (let r = 0; r < rows; r++)
        {
            matrix[r] = [];
            for(let c = 0; c < cols; c++)
            {
                matrix[r][c] = null;
            }
        }
    }


    addParticle(x, y, p){
        matrix[y][x] = p;
    }


    addToStage(obj){
        app.stage.addChild(obj);
    }
}

export default Matrix;