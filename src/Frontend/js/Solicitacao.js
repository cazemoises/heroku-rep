var api = 'http://127.0.0.1:3000'
var regra = 0;
var valorEscolhido;
var dia;
var currentVal = sessionStorage.getItem("currentVal");
var finalString
// Muda a tela para a página seguinte (Demonstrativo)
function changeScreen() {
    window.location = "../html/Solicitacao-Demonstrativo.html"
}
// Verifica se o campo está vazio e se seu valor é menor que o montante total do parceiro. Se sim, salva as variáveis para dar o post em seguida (rodando a função insert())
function confirm(){
  console.log(finalString)
    if ((finalString) != undefined && finalString != '') {  
      
        console.log (Number(finalString) + " " + currentVal)
        if (Number(finalString) > currentVal) {
          $("#valorEscolhido").val('a')
          notEnoughMoney()
        }
        else {

            sessionStorage.setItem("valorEscolhido", finalString);
            dia = Number($('input[name="d"]:checked').val());
            if (dia == 2) {
                regra = 12;
                sessionStorage.setItem("regra", regra);  

            }
            else if (dia == 7) {
                regra = 9;
                sessionStorage.setItem("regra", regra);  

            }
            else if (dia == 15) {
                regra = 6;
                sessionStorage.setItem("regra", regra);  

            }
            else if (dia == 30) {
                regra = 0;
                sessionStorage.setItem("regra", regra);  

            }
            resultado = Number(finalString)-regra/100*Number(finalString);
            sessionStorage.setItem("resultado", resultado);  
            console.log(resultado)
            console.log(dia + " dia" + "<br>" + regra + " regra");
            console.log(regra)
            changeScreen()
        }
    }
    else {
      emptyField();
      $("#label30").html('30 Dias - sem abatimento, valor final de R$(sem desconto)');
      $("#label15").html('15 dias - descontados 6%, valor final de R$(valor - 6%)');
      $("#label7").html('7 dias - descontados 9%, valor final de R$(valor - 9%)');
      $("#label2").html('2 dias - descontados 12%, valor final de R$(valor - 12%)');
    }
}    
// Toast para valor da solicitação > valor total
function notEnoughMoney() {
    toast({
      title: "Algo deu errado!",
      message: "Você não possui saldo suficiente para efetuar esta solicitação.",
      type: "error",
      duration: 5000
    });
  }
//   Toast para campo vazio
  function emptyField() {
    toast({
      title: "Campo vazio!",
      message: "Defina o valor desejado para continuar.",
      type: "error",
      duration: 5000
    });
  }
  // Função do Toast
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Toast sair por si só
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      const icons = {
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
      $("#valorEscolhido").val('')
    }
  }
  
// Atualiza em tempo real os valores descontados
function keyUp() { 
    let d15 = 6/100;
    let d7 = 9/100;
    let d2 = 12/100
        $('#valorEscolhido').keyup(function() {
            var value = (document.getElementById("valorEscolhido").value)
            value = value.split(/[ ,]+/)
            let a = 2;
            value.splice(0,1)
            let k = 0;
            finalString = ''
            while (k < value.length) {
                finalString += String(value[k]);
                k += 1;
            }

            $("#label30").html("30 Dias - sem abatimento, valor final de R$" + String(Number(finalString)));
            $("#label15").html("15 Dias - descontados 6%, valor final de R$" + String((Number(finalString) - Number(finalString)*d15).toFixed(2)));
            $("#label7").html("7 Dias - descontados 9%, valor final de R$" + String(Number(finalString) - Number(finalString)*d7.toFixed(2)));
            $("#label2").html("2 Dias - descontados 12%, valor final de R$" + String(Number(finalString) - Number(finalString)*d2.toFixed(2)));
        });
    }


// Jquery Dependency

$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // Formatar de 1000000 para 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
    // Append R$ no valor, posiciona o cursor à direita 

    // Pega o valor do input
  var input_val = input.val();
  
  // Ignora input vazio
  if (input_val === "") { return; }
  
  // Length original
  var original_len = input_val.length;

  // Posição inicial do Caret
  var caret_pos = input.prop("selectionStart");
    
  // Check os decimais
  if (input_val.indexOf(".") >= 0) {

    // Pega a posição do primeiro decimal, evita que vários decimais sejam adicionados
 
    var decimal_pos = input_val.indexOf(".");

    // Dividir o número pelo ponto decimal
    var left_side = input_val.substring(0, decimal_pos);
    
    var right_side = input_val.substring(decimal_pos);

    // Adiciona vírgulas no lado esquerdo
    left_side = formatNumber(left_side);

    // Valida o lado direito
    right_side = formatNumber(right_side);
    
    // Garante que existem 2 números após a vírgula
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limita o número decimal para apenas 2 dígitos
    right_side = right_side.substring(0, 2);

    // Usa o .
    input_val = "R$ " + left_side + "." + right_side;

  } else {
    // Se não tiver uma entrada decimal, adiciona vírgulas e retira todos os não-dígitos
    input_val = formatNumber(input_val);
    input_val = "R$ " + input_val;
    
    // Formatação final
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // Envia a nova string para o input
  input.val(input_val);

  // Coloca o caret de volta na direita na nova string
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}


