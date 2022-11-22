var selectobjects=new Audio();
selectobjects.src='./audio/sfx/jump1.mp3';

var clickaceptar =new Audio();
clickaceptar.src='./audio/sfx/selectitems.mp3';

var jump =new Audio();
jump.src='./audio/sfx/jump1.mp3';

var useSong =new Audio();
useSong.src='./audio/inicio.mp3';

var menuSong =new Audio();
menuSong.src='./audio/song2.mp3';

const configmusic=document.getElementById("musicRange");
const configeffects=document.getElementById("soundRange");

function change_musicsound(){
    var valor = configmusic.value;
    useSong.volume=valor;
    menuSong.volume=valor;
    console.log(valor);
}

function change_effectsound(){
    var valor = configeffects.value;
    selectobjects.volume=valor;
    jump.volume=valor;
    clickaceptar.volume=valor;
    console.log(valor);
}