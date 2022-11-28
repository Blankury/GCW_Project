const Player1points = window.location.search;
const url_paramsP1 = new URLSearchParams(Player1points);
var puntuacion1 = url_paramsP1.get("puntosP1");
var estado = url_paramsP1.get("estado");
var nivel = url_paramsP1.get("nivel");


$(document).ready(function() {
    $("#puntuacion_recibida").html(puntuacion1);
    if(estado=="PERDISTE"){
        
        document.getElementById("partida_status").innerHTML="NIVEL FALLIDO";
        document.getElementById("message_status").innerHTML="No has sobrevivido, suerte para la proxima.";
    }

    $("#save_score").submit(function(event){
        event.preventDefault();

        var puntos = $("#puntuacion_recibida").text();
        var nombre = $("#nombreUsuario").val();

        var dataToSend ={ 
            action: "addScore",
            puntos: puntos,
            nombre: nombre,
            nivel: nivel
        };
        
        
        $.ajax({
            url: "webservice/webservice.php",
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
