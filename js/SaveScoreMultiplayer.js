const Player1points = window.location.search;
const url_paramsP1 = new URLSearchParams(Player1points);
var puntuacion1 = url_paramsP1.get("puntosP1");

const Player2points = window.location.search;
const url_paramsP2 = new URLSearchParams(Player2points);
var puntuacion2 = url_paramsP2.get("puntosP2");
var nivel = url_paramsP1.get("nivel");

$(document).ready(function() {
    $("#puntuacion_recibida_P1").html(puntuacion1);

    $("#puntuacion_recibida_P2").html(puntuacion2);

    $("#save_score").submit(function(event){
        event.preventDefault();
        var puntos1 = $("#puntuacion_recibida_P1").text();
        var nombre1 = $("#Jugador1").val();
    
        var puntos2 = $("#puntuacion_recibida_P2").text();
        var nombre2 = $("#Jugador2").val();
    
        var dataToSend ={ 
            action: "addScoreMulti",
            puntos1: puntos1,
            nombre1: nombre1,
            puntos2: puntos2,
            nombre2: nombre2
        };
        
        
        $.ajax({
            url: "./webservice/webservice.php",
            async: true,
            type: 'POST',
            data: dataToSend,
            success: function(data){
                window.location.href = "score.html";
            },
            error: function(x, y, x){
                alert("Error en el webservice") + x + y + z;
            }
        });

    });

});

    
