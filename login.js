var list = [];
var login;
var i = 0;
var logged = false;


function signup() {
    window.location = 'Frontend/cadastro.html'
}
function getUsers() {
    console.log(window.location)
    login = $("#login").val();
    pass = $("#pass").val();
    $.get("http://127.0.0.1:3000/users", function(users) {
    while (i < users.length) {
    if (users[i].login == login) {
        if (users[i].senha == pass) {
            alert("Login efetuado com sucesso");
            logged = true;  
            postAcess();
        }
    }
    i += 1;    
}
    if (logged == false) {
        alert("Login ou senha inválidos");
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
    window.location = "Frontend/antecipe.html"
}