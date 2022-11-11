
function selectLevel(){
    var level = {
        scene: [],
        mode: [],
        difficulty: []
    }
    var allChecked = {
        scene: false,
        mode: false,
        difficulty: false
    };

    level.scene.push(document.getElementById('scCity'));
    level.scene.push(document.getElementById('scSnowCity'));
    level.scene.push(document.getElementById('scBCityN'));

    level.mode.push(document.getElementById('smIndiv'));
    level.mode.push(document.getElementById('smMulti'));

    level.difficulty.push(document.getElementById('sdEasy'));
    level.difficulty.push(document.getElementById('sdHard'));


    for(var p in level){
        //console.log(level[p]);

        level[p].forEach(e => {
            if (e.checked){
                sessionStorage.setItem(p, e.value);
                if(p === "scene")
                    allChecked.scene = true;
                if(p === "mode")
                    allChecked.mode = true;
                if(p === "difficulty")
                    allChecked.difficulty = true;
            }
        });
    }

    if (allChecked.scene && allChecked.difficulty && allChecked.difficulty)
        window.location.href = "partida.html";
}