const Player1points = window.location.search;
const url_paramsP1 = new URLSearchParams(Player1points);
var puntuacion1 = url_paramsP1.get("puntosP1");

const Player2points = window.location.search;
const url_paramsP2 = new URLSearchParams(Player2points);
var puntuacion2 = url_paramsP2.get("puntosP2");

const Player1Status = window.location.search;
const url_params_status = new URLSearchParams(Player1Status);
var estado = url_params.get("estado");

const Players= window.location.search;
const url_params_status_players = new URLSearchParams(Players);
var estado_players = url_params_players.get("estadoMultijugador");


$(document).ready(function() {
    $("#puntuacion_recibida").html(puntuacion1);
    if(estado=="PERDISTE"){
        $("#partida_status").html("NIVEL FALLIDO");
        $("#message_status").html("No has sobrevivido, suerte para la proxima.");
    }
    getScores();
});

function saveDB() {

    //var puntos = $("#txtScore").val();
    var puntos = $("#puntuacion_recibida").text();
    var nombre = $("#nombreUsuario").val();
    //var nivel = $("#nombreUsuario").val();

    alert(puntos);

    var dataToSend ={ 
        action: "addScore",
        puntos: puntos,
        nombre: nombre
        //nivel: nivel
    };
    
    
    $.ajax({
        url: "webservice/webservice.php",
        async: true,
        type: 'POST',
        data: dataToSend,
        success: function(data){
            alert(data);
        },
        error: function(x, y, x){
            alert("Error en el webservice") + x + y + z;
        }
    });
}

function getScores() {
    var dataToSend = { action: "getScores" };
    $.ajax({
        url: "webservice/webservice.php",
        async: true,
        type: 'POST',
        data: dataToSend,
        dataType: 'json',
        success: function(data){
            //obtenemos el arreglo de la db
            //var productos = JSON.parse(data);
            //debugger;
            
            for(let i = 0; i < data.length; i++){
                //alert(data[i].puntuacion);
               $("#scorescontainer").append(' <div class="col-1"></div> <div class="col-2 text-center py-2" style=" border-style: double; border-color: aliceblue;"><p>' + (i+1) + '</p></div> <div class="col-2 text-center py-2" style=" border-style: double; border-color: aliceblue;"><p>' +data[i].nombre+ '</p></div> <div class="col-2 text-center py-2" style=" border-style: double; border-color: aliceblue;"><p>' + data[i].fecha+ '</p></div> <div class="col-2 text-center py-2" style=" border-style: double; border-color: aliceblue;"><p>' + data[i].nivel + '</p></div> <div class="col-2 text-center py-2" style=" border-style: double; border-color: aliceblue;"><p>' + data[i].puntuacion + '</p></div> <div class="col-1"></div>');                
            }

        },
        error: function(x, y, z){
            alert("Error en el webservice" + x + y + z);

        }
    })
}

