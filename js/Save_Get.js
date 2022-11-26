const Player1points = window.location.search;
const url_paramsP1 = new URLSearchParams(Player1points);
var puntuacion1 = url_paramsP1.get("puntosP1");
var estado = url_paramsP1.get("estado");

$(document).ready(function() {
    $("#puntuacion_recibida").html(puntuacion1);
    if(estado=="PERDISTE"){
        
        document.getElementById("partida_status").innerHTML="NIVEL FALLIDO";
        document.getElementById("message_status").innerHTML="No has sobrevivido, suerte para la proxima.";
    }
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