 /*me aseguro que se ha encargado toda la pagina*/
   var indiceRandom =0;
   var op=[];
   var nivel=1;
   var puntaje=0;
   var elementos=[];
  $(document).ready(function(){

      /* $("#Login").animate({
         'top': "10%"
      },400);*/
      if(localStorage.getItem('puntaje') === null){
         puntaje = parseInt(localStorage.getItem('puntaje'));
         
      }
      $("#puntaje").text(puntaje);
      $( "#Elemento" ).droppable({
      drop: function( event, ui ) {
         $( this ).addClass( "ui-state-highlight" ).find( "h2" ).html( "Dropped!" );
         var i= $(ui.helper[0]).data('numero');
         console.log(i);
         if (i==indiceRandom){
            puntaje++;
         }else{
            puntaje--;
         }
         $("#puntaje").text(puntaje);
         localStorage.setItem('puntaje');
         recargar(elementos);
       },
       over:function(event, ui){
         $(this).css('backround-color', 'gray');
       },
       over:function(event, ui){
         $(this).css('backround-color', 'purple');
      }
     });

      $.getJSON('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json',
       function(data){
         elementos=data;
        recargar(elementos)
       });
          function recargar(data){
             $("#Opciones").find('li'),remove();
            var cuantos= data.elements.length;
            var indiceRandom= Math.floor(Math.random() * cuantos);
              $("#Elemento").find('h2').text ( data.elements [indiceRandom].name);
                for (var i= (nivel * 3);i<3;i++){
                   var n= Math.floor(Math.random() * cuantos);
                 op.push(n);
                  /* $("#Opciones").find('ul').append('<li> <h2>'+ data.elements[n].symbol+'</h2></li>');*/
              }
              /*$("#Opciones").find('ul').append('<li> <h2>'+ data.elements[indiceRandom].symbol+'</h2></li>');*/
                op.push(indiceRandom);
                console.log(op);
                op.sort (()=> Math.random() = 0.5);
                op.forEach (n=>{
                 $("#Opciones").find('ui').append('<li class="drag" data-numero="'+n+'"> <h2>'+
                                                   data.elements[n].symbol+'</h2></li>');
                });
                $( ".drag" ).draggable({
                   revert:"invalid",
                   refreshPosition: true,
                   drag: function(event,ui){
                        $(this).css('opacity','0.5');
                   },
                   stop: function(event,ui){
                    $(this).css('opacity','1');
                   }
                  });

          }

      $("#txtNombre").on('keyup', function(){
         $("#txtNombre").css('border', '1px solid white');
         $(".alerta").fadeOut(400);
      })
       $("#btniniciar").click(function(){
         if( $("#txtNombre").val() == ""){
            $("#txtNombre").css('border', '1px solid red');
            $(".alerta").fadeIn(400);
         } else {
            $("#Login").animate({
               'left': "-500px"
            },400,function(){
               $("#Login").fadeOut(1000);
            });
         }
        
         
       });
});
