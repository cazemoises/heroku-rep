var currentVal = sessionStorage.getItem("currentVal");
var logged_cnpj = sessionStorage.getItem("logged_cnpj");
var regra = sessionStorage.getItem("regra");
var valorEscolhido = sessionStorage.getItem("valorEscolhido");
var resultado = sessionStorage.getItem("resultado");
var api = 'https://teste-caze.herokuapp.com'

let otp = document.querySelector("#otp-input");

for (let pin of otp.children) {
    pin.onkeyup = function (event) {
        if (event.target.value > 0)
        if (pin.nextElementSibling) {
            pin.nextElementSibling.focus();
        }   
    };
}

function changePage(){
    window.location='../html/Feedback.html'
}

function confirmProcess(){
    var a = 1;
    var entryPass = ''
    while (a<=4) {
        entryPass += (Number($(`#part-code${a}`).val()))
        a += 1;
    }
    console.log(entryPass) 
    $.get("https://teste-caze.herokuapp.com/users", function(users) {
        let i = 0
        let match = false
        while (i<users.length && match == false) {
            if (users[i].hotel_cnpj == logged_cnpj) {
                match = true
                if (users[i].senha == entryPass) {
                    console.log(users[i].senha + " " + entryPass)
                    insert()   
                    PINSuccess()
                }
                else {
                    PINfail()
                    console.log(users[i].senha + " " + entryPass)
                    $("#part-code1").val('')
                    $("#part-code2").val('')
                    $("#part-code3").val('')
                    $("#part-code4").val('')
                    
                }
            }
            i += 1
        }
    })
}
    // Dá o post via ajax e salva a requisição na tabela ANTECIPACAO e chama a função para rodar a tela seguinte
function insert() {
    const Ndate = new Date()
    var dia = Ndate.getDate()
    var mes = Ndate.getMonth()
    var year = Ndate.getFullYear()
    var dataDMA = (`${dia}/` + (Number(mes)+1) + `/${year}`)
    var d
    console.log(dataDMA)
    if (regra == 6) {
        d = 15
    }
    else if (regra == 9) {
        d = 7
    }
    else if (regra == 12) {
        d = 2
    }
    else {
        d = 30
    }
    $.ajax({
        type: 'POST',
        url: api + '/register',
        data: {
            montanteEscolhido:valorEscolhido,
            regraNegocio:d,
            hotelCnpj:logged_cnpj,
            discountedAnticipation:resultado,
            data:dataDMA
        }
    })
    update();
}

function update() {
    let discounted = currentVal-valorEscolhido;
    $.ajax({
        type: 'POST',
        url: api + '/update-amount',
        data: {montante:discounted, cnpj:logged_cnpj},
    })
    currentVal = discounted
    sessionStorage.setItem("currentVal", currentVal);
    changePage()
}

function PINSuccess() {
    toast({
    title: "Sucesso!",
    message: "Login efetuado com sucesso",
    type: "success",
    duration: 5000
    });
}

function PINfail() {
    toast({
    title: "Erro!",
    message: "PIN incorreto!",
    type: "error",
    duration: 5000
    });
}

//   IGNORAR
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
  