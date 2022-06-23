var currentVal = sessionStorage.getItem("currentVal")
var logged_cnpj = sessionStorage.getItem("logged_cnpj")
var regra
var valorEscolhido = sessionStorage.getItem("valorEscolhido")
var resultado = sessionStorage.getItem("resultado")
var d

function changePage(){
    window.location = '../html/Senha.html';
}
function teste() {
  console.log(currentVal + " " + logged_cnpj + " " + regra + " " + valorEscolhido + " " + resultado)
}
function viewAnticipation() {
        regra = sessionStorage.getItem("regra")
        if (regra == 2) {
          d = '2'
        }
        else if (regra == 7) {
          d = '7'
        }
        else if (regra == 15) {
          d = '15'
        }
        else if (regra == 30) {
          d = '30'
        }
        var data = new Date();
        var dia = data.getDate()
        var mes = data.getMonth()+1;
        var ano = data.getFullYear();
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
        $("#datenow").html(`${dia}/${mes}/${ano} - ${dianome}`);
        $("#ds").html(`D+${d} (${regra}%)`);
        $("#choosen-value").html(`R$ ${valorEscolhido}`);
        $("#final-value").html(`R$ ${resultado}`)
}