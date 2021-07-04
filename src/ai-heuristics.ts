class BasicAi{
    constructor(){
        this.player = null;
        this.actions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    }
    setplayer(player){this.player = player};
    step(observations){
        if (observations == null) {
            return this.actions[1];
        }
        else {return this.actions[2];}
    }
}

export {BasicAi}