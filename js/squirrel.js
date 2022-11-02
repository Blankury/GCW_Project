export class Squirrel {
    constructor(){
        this.moving = true;

    }

    update(){
        if(this.moving === true){
            this.moving = false;
        }
    }

}