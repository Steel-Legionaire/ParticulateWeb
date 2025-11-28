import { Application } from "pixi.js";
import Matrix from './matrix.js' ;

(async () => {
    const app = new Application();
    await app.init({
        width: 1500,
        height: 800,
    });
    document.body.appendChild(app.canvas);


    const matrix = new Matrix(app);


})();