var total =0;
var i = 0;
var lucro = 0;
var lucroTotal = 0;
var string;
var anticipations
var melhores = []
var anticipationslist
// Pega o status de antecipações
function getAnticipationsNumber() {
    $.get("https://teste-caze.herokuapp.com/anticipations", function(quantidade) {
        console.log(quantidade)
    anticipationslist = quantidade;
    console.log(quantidade)
    console.log(anticipationslist)
    if (anticipationslist.length == 0) {
        string = "Nenhuma antecipação";
        $("#anticipations-amount").html(string);    
    }
    else if (anticipationslist.length == 1) {
        $("#anticipations-amount").html(`${anticipationslist.length}`);
    }
    else if (anticipationslist.length > 1) {
        $("#anticipations-amount").html(`${anticipationslist.length}`);
    }
    
    quantidade.map(item => {
        total += parseFloat(item.montanteEscolhido);
        lucroTotal += parseFloat(item.discountedAnticipation);
        $("#total-value").html("R$ " + total)

    })
    lucro += (total - lucroTotal)
    $("#profits").html("R$ " + lucro.toFixed(2))
    }
)    
    getTable()
}

function getTable() {
    $.get("https://teste-caze.herokuapp.com/get-intersec", function(intersec) {
        let i = 0;
        console.log(intersec)
        while (i < intersec.length) {
            melhores.push(intersec[i].hotelCnpj)
            i += 1
       }
    $.get("https://teste-caze.herokuapp.com/get-hotels", function (hotels) {

        var top3Nomes = []
        var top3Cnpjs = []      
        // contador externo do looping (verifica a iteração)
        let i = 0
        // contador interno do looping (verifica o index)
        let p = 0
        // index do top3Nomes hoteis
        let k = 0

        while (i < melhores.length) {   
            while (p < melhores.length) {
                if (hotels[p].cnpj === melhores[k]) {
                    top3Nomes.push(hotels[p].nome)
                    top3Cnpjs.push(hotels[p].cnpj)
                    k += 1
                }
                p += 1
            }
            p = 0
            i += 1
        }
        console.log(top3Nomes)
        console.log(intersec)
        $("#hotel-name1").html(top3Nomes[0])
        $("#hotel-name2").html(top3Nomes[1])
        $("#hotel-name3").html(top3Nomes[2])
        // contador para o looping
        console.log(anticipationslist)
        let top1count = 0
        let top2count = 0
        let top3count = 0
        console.log(anticipationslist)
        console.log(top3Cnpjs)
        let m = 0
        for (let m = 0; m < anticipationslist.length; m++) {
            if (anticipationslist[m].hotelCnpj == top3Cnpjs[0]) {
                top1count += 1
            }
            else if (anticipationslist[m].hotelCnpj == top3Cnpjs[1]) {
                top2count += 1
            }
            else if (anticipationslist[m].hotelCnpj == top3Cnpjs[2]) {
                top3count += 1
            }
        }
        let y = 0
        while (y < intersec.length) {
            $(`#hotel-favrule${y+1}`).html(`D+${intersec[y].regraNegocio}`)
            console.log(intersec[y].regraNegocio)
            y += 1
        }

        let n = 0
        var teste = 0
        let g = 0
        var hotel1value = 0
        var hotel2value = 0
        var hotel3value = 0
        while (n < anticipationslist.length) {
            console.log(anticipationslist[n].hotelCnpj + " " + melhores[g])
            if (anticipationslist[n].hotelCnpj == melhores[0]) {
                hotel1value += anticipationslist[n].montanteEscolhido
            }
            else if (anticipationslist[n].hotelCnpj == melhores[1]) {
                hotel2value += anticipationslist[n].montanteEscolhido
            }
            else if (anticipationslist[n].hotelCnpj == melhores[2]) {
                hotel3value += anticipationslist[n].montanteEscolhido   
            }
            n += 1
        }
        $('#quantidade').click(function() {
            if (top1count > 1) {
                $(`#hotel-count1`).html(`${top1count} antecipações`)
            }
            else if (top1count == 1) {
                $(`#hotel-count1`).html(`${top1count} antecipação`)
            }
            else if (top1count == 0) {
                $(`#hotel-count1`).html('')
            }
            
            if (top2count > 1) {
                $(`#hotel-count2`).html(`${top2count} antecipações`)
            }
            else if (top2count == 0) {
                $('#hotel-count2').html('')
            }
            
            if (top3count > 1) {
                $(`#hotel-count3`).html(`${top3count} antecipações`)
            }
            else if (top3count == 1) {
                $(`#hotel-count3`).html(`${top3count} antecipação`)
            }
            else if (top3count == 0) {
                $(`#hotel-count3`).html('')
            }
            $("#case-view").html("Quantidade de Antecipações")
         })
         $('#valor').click(function() {
            $(`#hotel-count1`).html(`R$${hotel1value}`)
            if (hotel2value != 0) {
                $(`#hotel-count2`).html(`R$${hotel2value}`)
            }
            else {
                $(`#hotel-count2`).html('')
            }
            if (hotel3value != 0) {
                $(`#hotel-count3`).html(`R$${hotel3value}`)
            }
            else {
                $(`#hotel-count3`).html('')
            }
            $("#case-view").html("Valor antecipado")

        });
        })
    })
}