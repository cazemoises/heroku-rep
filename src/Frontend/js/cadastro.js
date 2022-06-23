var api = 'http://127.0.0.1:3000'
// Check se os valores da etapa 1 da inscrição são válidos (LOGIN e PIN)
function check() {
    
    let i = 0;
    $.get("https://teste-caze.herokuapp.com/users", function(users) {
        let exists = false
        while (i<users.length) {
            if ($('#login').val() == users[i].login) {
                exists = true;
            }
            i += 1;
        }
        if (exists == true) {
            console.log('existe');
            loginAlreadyExistsToast();
        }
        else {
            saveData();
        }

    })   
}

var loginVal
var pinVal
var confirmPinVal
var cnpjVal
var email
function saveData() {
    loginVal = $("#login").val()
    if (($("#pass").val()).length != 4) {
        toast4charPass();
    }
    else {
        pinVal = $("#pass").val();
        console.log(pinVal)
        if ($("#confirm-pass").val() != pinVal) {
            pinsNotSame()
        }
        else {
            confirmPinVal = $("#confirm-pass").val();
            var loginVal = sessionStorage.setItem("loginVal", loginVal);
            var pinVal = sessionStorage.setItem("pinVal", pinVal);
            nextPage()
        }
    }
}

function saveData2() {
    var pinVal = sessionStorage.getItem("pinVal")
    console.log(pinVal)
    if (($("#cnpj").val()).trim() != '') {
        if (($("#cnpj").val()).length != 14) {
            cnpjNot14char()
        }
        else {
          cnpjVal = ($("#cnpj").val())
          email = $("#email").val()
          postAll()
        }
      }
      else {
        
      }
    }
    
    function postAll() {
  var loginVal = sessionStorage.getItem("loginVal")
  var pinVal = sessionStorage.getItem("pinVal")
  if ($('#email').val() == $('#confirm-email').val()) {
    console.log(pinVal)
    {
      $.ajax({
          type: 'POST',
          url: api + '/save-new-hotel',
          data: {
              login:loginVal,
              senha:pinVal,
              email:email,
              hotel_cnpj:cnpjVal
          }
      })
  } 
  }
  successRegisterToast()
  window.location = '../html/index.html'
}

function successRegisterToast() {
  toast({
    title: "Sucesso!",
    message: "Cadastro criado com sucesso.",
    type: "success",
    duration: 5000
  });
}
// Toast CNPJ não tem 14 caracteres (apenas números)
function cnpjNot14char() {
    toast({
        title: "Erro!",
        message: "O cnpj precisa ter 14 caracteres(apenas números).",
        type: "error",
        duration: 5000
      });
    }

function cnpjempty() {
    toast({
        title: "Erro!",
        message: "O campo do CNPJ está vazio.",
        type: "error",
        duration: 5000
      });
    }

function nextPage() {
    window.location = '../html/cadastro2.html'
}


// 


//   Toast para PINS diferentes
function pinsNotSame() {
    toast({
      title: "Erro!",
      message: "Os PINS não coincidem.",
      type: "error",
      duration: 5000
    });
  }

//   Toast para campo vazio
function loginAlreadyExistsToast() {
    toast({
      title: "Erro!",
      message: "Este login já existe.",
      type: "error",
      duration: 5000
    });
  }

// Toast para a length do PIN != 4 
  function toast4charPass() {
    toast({
      title: "Erro!",
      message: "Insira um PIN numérico com 4 caracteres.",
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
  