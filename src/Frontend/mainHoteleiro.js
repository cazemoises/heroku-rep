var currentVal
var partn
function openMenu() {
    window.location = 'Sequencia/MenuHoteleiro/HTML/menu.html'
}

function menu(){    
    window.location = 'file:///C:/Users/Inteli/Desktop/DESENVOLVIMENTO%20WEB/NOVAS%20TELAS%20-%20DAYLLAN/Apresenta%C3%A7%C3%A3o/2.%20HOTEL.HENRI%20-%20Menu.Hoteleiro/HTML/tela%20de%20cadastro.html'
}

function antecipe_seus_ganhos(){
    window.location= 'Sequencia/opcaoAntecipacao/html/opcaoAntecipacao.html'
}

function antecipacao_automatica(){
    window.location= 'reservas.html'
}

function extrato(){
    window.location=''
}
function configuracoes(){
    window.location = ''
}

function saiba_mais(){
    window.location= 'file:///C:/Users/Inteli/Desktop/DESENVOLVIMENTO%20WEB/NOVAS%20TELAS%20-%20DAYLLAN/Apresenta%C3%A7%C3%A3o/2.%20HOTEL.HENRI%20-%20Menu.Hoteleiro/HTML/tela%20de%20cadastro.html'
}

function getAmount() {
    let count = 0;
    let match = false;
    $.get("http://127.0.0.1:3000/get-access", function(access) {
    let accessed = (access[0].login_parceiro);
    console.log(accessed + " = login que acessou")
    $.get("http://127.0.0.1:3000/users", function(users) {
        console.log(users);
        // fazer looping para verificar qual users[n].login é igual ao accessed (login do acesso mais recente)
        var i = 0;
        let found = false;
        while (i < users.length && found == false) {
            if (users[i].login == accessed) {
                found = true;
                var logged_id = (users[i].hotel_cnpj)
                    console.log("deu certo até aqui" + logged_id)
                $.get("http://127.0.0.1:3000/get-partners", function(partners) {
                let j = 0;    
                let match = false;
                console.log(partners);
                while (j < partners.length && match == false) {
                    if (logged_id == partners[j].id) {
                        match = true;
                        console.log(logged_id + " " + partners[j].id + " é o que logou");
                        part = (partners[j].montante);
                        $("#teste2").append(partners[j].montante);
                        currentVal = partners[j].montante;
                        console.log(currentVal)
                        sessionStorage.setItem("currentVal", currentVal);
                        sessionStorage.setItem("logged_id", logged_id);
                        console.log("TESTE")
                        var logged_hotel = (users[logged_id].hotel_cnpj)
                        sessionStorage.setItem("logged_hotel", logged_hotel);
                    }
                    j += 1;
                }
                })
            }
            i += 1;
        }
    })
    })

    }
function eyeMode() {
    if(document.getElementById('eyeimg').src == 'http://127.0.0.1:3000/Sequencia/Conta/HTML/olho_aberto2.png') {
        document.getElementById('eyeimg').src = 'http://127.0.0.1:3000/Sequencia/Conta/HTML/olho_fechado.png'
        let i = 0;
        let stringPart = String(part).length
        console.log(stringPart)
        $('#teste2').html('R$ ');
        while (i<stringPart) {
            $('#teste2').append('*');
            i +=1
        }
    }
    else {
        document.getElementById('eyeimg').src = 'http://127.0.0.1:3000/Sequencia/Conta/HTML/olho_aberto2.png'
        $('#teste2').html(`R$ ${currentVal}`)
    }
}