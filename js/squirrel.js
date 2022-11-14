export class Squirrel {
    constructor(){
        this.moving = true;
        this.vida = 5;
        this.puntos = 0;
        this.monedas = 0;
    }

    update(){
        if(this.moving === true){
            this.moving = false;
        }
    }

    updateMonedas(){
        this.monedas += 1;
    }

    updatePuntaje(){
        this.puntos += 5;
    }

}