//Service worker
if('serviceWorker' in navigator){
    console.log('puedes usar los serviceWorker del navehgador');
    navigator.serviceWorker.register('./sw.js')
                            .then(res => console.log('serviceWorker cargao correctamente', res))
                            .catch(err => console.log('serviceWorker no se ha podido registrar', err))

}else{
    console.log('NO Puedes usar los serviceWorker del vagegador');
}

//scroll suavizado
$(document).ready(function(){
    //console.log("HOLA MUNDO");
    $("#menu a").click(function(e){
        //cancela el evento si este es cancelable
        e.preventDefault();
        //animate es un metodo de instancia crea una nueva animacion
        $("html, body").animate({
            //establece el numero de pixeles que el contenido de un elemento
            //ha sido desplazado
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    })
});