<?php

    if(isset($_POST["submit"])){


        //Selecciona de los radios cual nivel escoge el jugador
        if($_POST["selectescenario"]=="City"){

            //Selecciona de los radios el modo de juego
            if($_POST["slectmode"]=="Individual"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_POST["slectdificultad"]=="Facil"){
                    header("location: ../levels/city_easy_individual.html");
                }
                if($_POST["slectdificultad"]=="Dificil"){
                    header("location: ../levels/city_hard_individual.html");
                }
            }
            else if($_POST["slectmode"]=="Multijugador"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_POST["slectdificultad"]=="Facil"){
                    header("location: ../levels/city_easy_multiplayer.html");
                }
                if($_POST["slectdificultad"]=="Dificil"){
                    header("location: ../levels/city_hard_multiplayer.html");
                }
            }
            
        }
        else if($_POST["selectescenario"]=="Snow City"){

             //Selecciona de los radios el modo de juego
             if($_POST["slectmode"]=="Individual"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_POST["slectdificultad"]=="Facil"){
                    header("location: ../levels/snow_easy_individual.html");
                }
                if($_POST["slectdificultad"]=="Dificil"){
                    header("location: ../levels/snow_hard_individual.html");
                }
            }
            else if($_POST["slectmode"]=="Multijugador"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_POST["slectdificultad"]=="Facil"){
                    header("location: ../levels/snow_easy_multiplayer.html");
                }
                if($_POST["slectdificultad"]=="Dificil"){
                    header("location: ../levels/snow_hard_multiplayer.html");
                }
            }
        }
        else if($_POST["selectescenario"]=="Beach City Night"){
             //Selecciona de los radios el modo de juego
             if($_POST["slectmode"]=="Individual"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_POST["slectdificultad"]=="Facil"){
                    header("location: ../levels/beach_easy_individual.html");
                }
                if($_POST["slectdificultad"]=="Dificil"){
                    header("location: ../levels/beach_hard_individual.html");
                }
            }
            else if($_POST["slectmode"]=="Multijugador"){

                /*Selecciona de los radios la dificultad del juego y nos redirecciona 
                al nivel dependiendo de la configuracion que hayamos escogido*/
                if($_POST["slectdificultad"]=="Facil"){
                    header("location: ../levels/beach_easy_multiplayer.html");
                }
                if($_POST["slectdificultad"]=="Dificil"){
                    header("location: ../levels/beach_hard_multiplayer.html");
                }
            }
        }
    }


?>