export class Squirrel {
    constructor(){
        moving = true;
        vida = 5;
    }

    update(){
        if(this.moving === true){
            this.moving = false;
        }
    }

}