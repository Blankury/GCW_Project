export class Squirrel {
    constructor(){
        this.moving = true;
        this.vida = 5;
    }

    update(){
        if(this.moving === true){
            this.moving = false;
        }
    }

}