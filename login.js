var list = [];
var login;
var i = 0;
var logged = false;
var api = 'https://teste-caze.herokuapp.com';

var userslist
function signup() {
    window.location = 'l'
}
function getUsers() {
    login = $("#login").val();
    pass = $("#pass").val();
    $.get("https://teste-caze.herokuapp.com", function(users) {
    userslist = sessionStorage.setItem("userslist", users)
    while (i < users.length) {
    if (users[i].login == login) {
        if (users[i].senha == pass) {
            logged = true;  
        }
    }
    i += 1;    
    console.log(logged)
}
if (logged == false) {
    alert("Login ou senha inválidos");
}
else {
        toastLoginSucces();
        postAcess();
        logged = false
    }
    })
}
function postAcess() {
    {
        $.ajax({
            type: 'POST',
            url: api + '/new-access',
            data: {
                login_parceiro:login
            }
        })
    }
    changePage()
}
function changePage() {
    window.location = "src/Frontend/html/antecipe.html"
}
function toastLoginSucces() {
    toast({
      title: "Sucesso!",
      message: "Você efetuou login no sistema.",
      type: "success",
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
  