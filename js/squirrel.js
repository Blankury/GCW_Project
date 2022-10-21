export class Squirrel {
    constructor(){
        this.moving = false;

    }

    update(){
        if(this.moving === false){
            this.moving = true;
        }
    }

}