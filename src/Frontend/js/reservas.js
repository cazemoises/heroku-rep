var api = '127.0.0.1:3000'
var logged_cnpj = sessionStorage.getItem("logged_cnpj");
var reservas;
function getReserves() {
    
    $.get("http://127.0.0.1:3000/get-reserves", function(reserves) {
    let i = 0;
    let totalvalue = 0;
    while (i < reserves.length) {
        document.getElementById(`tbody`).innerHTML += `<td><input type = "checkbox" id = "input-reserve${i}"></td><td>${reserves[i].id}</td><td>${reserves[i].data_inicio}</td><td>R$ ${reserves[i].valor}</td>`
        totalvalue += Number(`${reserves[i].valor}`);
        i += 1;
    }
    i = -20
    while (i < 0) {
        document.getElementById(`tbody`).innerHTML += `<td><input type = "checkbox" id = "input-reserves"></td><td>4</td><td>4</td><td>R$ 4</td>`
        i += 1
    }
    $("#tbody").append(`<tr id = "tdtotal"><td>Total</td><td><td><td>R$ ${totalvalue}</td></tr>`);
    reservas = reserves;
    })

    }

    function gotodemonstrativo() {
        window.location = '../Sequencia/DemonstrativoReserva/HTML/Solicitacao-Demonstrativo-Reserva.html'
    }
    
// function selectAll() {
//     let i = 0;
//     while (i < reservas.length) {
//         // if ($(`#input-reserve${i}`).prop('checked')) {
//         ($(`#input-reserve${i}`).is(true))
//         // }
//         i += 1
//     }
// }

