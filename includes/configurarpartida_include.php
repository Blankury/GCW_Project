<?php

    if(isset($_GET["submit"])){


        //Selecciona de los radios cual nivel escoge el jugador
        if($_GET["selectescenario"]=="City"){

            //Selecciona de los radios el modo de juego
            if($_GET["slectmode"]=="Individual"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_GET["slectdificultad"]=="Facil"){
                    header("location: ../levels/city_easy_individual.html");
                }
                if($_GET["slectdificultad"]=="Dificil"){
                    header("location: ../levels/city_hard_individual.html");
                }
            }
            else if($_GET["slectmode"]=="Multijugador"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_GET["slectdificultad"]=="Facil"){
                    header("location: ../levels/city_easy_multiplayer.html");
                }
                if($_GET["slectdificultad"]=="Dificil"){
                    header("location: ../levels/city_hard_multiplayer.html");
                }
            }
            
        }
        else if($_GET["selectescenario"]=="Snow City"){

             //Selecciona de los radios el modo de juego
             if($_GET["slectmode"]=="Individual"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_GET["slectdificultad"]=="Facil"){
                    header("location: ../levels/snow_easy_individual.html");
                }
                if($_GET["slectdificultad"]=="Dificil"){
                    header("location: ../levels/snow_hard_individual.html");
                }
            }
            else if($_GET["slectmode"]=="Multijugador"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_GET["slectdificultad"]=="Facil"){
                    header("location: ../levels/snow_easy_multiplayer.html");
                }
                if($_GET["slectdificultad"]=="Dificil"){
                    header("location: ../levels/snow_hard_multiplayer.html");
                }
            }
        }
        else if($_GET["selectescenario"]=="Beach City Night"){
             //Selecciona de los radios el modo de juego
             if($_GET["slectmode"]=="Individual"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_GET["slectdificultad"]=="Facil"){
                    header("location: ../levels/beach_easy_individual.html");
                }
                if($_GET["slectdificultad"]=="Dificil"){
                    header("location: ../levels/beach_hard_individual.html");
                }
            }
            else if($_GET["slectmode"]=="Multijugador"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_GET["slectdificultad"]=="Facil"){
                    header("location: ../levels/beach_easy_multiplayer.html");
                }
                if($_GET["slectdificultad"]=="Dificil"){
                    header("location: ../levels/beach_hard_multiplayer.html");
                }
            }
        }
    }


?>