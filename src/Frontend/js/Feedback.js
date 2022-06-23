function timeNow() {
    console.log("A")
    let data = new Date();
    let dia = data.getDate();
    let mes = (data.getMonth()+1);
    let ano = data.getFullYear();
    let hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();
    var dianome
    switch (new Date().getDay()) {
        case 0:
        dianome = "Domingo";
        break;
        case 1:
        dianome = "Segunda-feira";
        break;
        case 2:
        dianome = "Terça-feira";
        break;
        case 3:
        dianome = "Quarta-feira";
        break;
        case 4:
        dianome = "Quinta-feira";
        break;
        case 5:
        dianome = "Sexta-feira";
        break;
        case 6:
        dianome = "Sábado";
    }
    $("#datenow").html(dia + "/" + mes + "/" + ano + " " + hora + ":" + min + ":" + seg + " - " + dianome)
}

function changepage(){
    window.location='../html/antecipe.html'
}

