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
    window.location= 'Sequencia/Agendamento/HTML/Agendamento.html'
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
var logged_cnpj
function getAmount() {
    $.get("https://teste-caze.herokuapp.com/get-access", function(access) {
    let accessed = (access[0].login_parceiro);
    console.log(accessed + " = login que acessou");
    $.get("https://teste-caze.herokuapp.com/users", function(users) {
        console.log(users);
        // fazer looping para verificar qual users[n].login é igual ao accessed (login do acesso mais recente)
        let i = 0;
        let found = false;
        while (i < users.length && found == false) {
            if (users[i].login == accessed) {
                found = true;
                console.log(users[i].hotel_cnpj)
                logged_cnpj = (users[i].hotel_cnpj)
                console.log(logged_cnpj);
                $.get("https://teste-caze.herokuapp.com/get-hotels", function(hotels) {
                let j = 0;    
                let match = false;
                while (j < hotels.length && match == false) {
                    console.log(logged_cnpj + " " + hotels[j].cnpj)
                    if (logged_cnpj == hotels[j].cnpj) {
                        match = true;
                        console.log(logged_cnpj + " " + hotels[j].cnpj + " é o que logou");
                        part = (hotels[j].montante);
                        $("#teste2").append(hotels[j].montante);
                        currentVal = hotels[j].montante;
                        console.log(currentVal)
                        sessionStorage.setItem("currentVal", currentVal);
                        sessionStorage.setItem("logged_cnpj", logged_cnpj);
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
    if(document.getElementById('eyeimg').src == 'https://teste-caze.herokuapp.com/imgs/olho_aberto2.png') {
        document.getElementById('eyeimg').src = 'https://teste-caze.herokuapp.com/imgs/olho_fechado.png'
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
        document.getElementById('eyeimg').src = 'https://teste-caze.herokuapp.com/imgs/olho_aberto2.png'
        $('#teste2').html(`R$ ${currentVal}`)
    }
}