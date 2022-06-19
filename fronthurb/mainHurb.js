var total =0;
var i = 0;
var lucro = 0;
var lucroTotal = 0;
var string;

// Pega o status de antecipações
function getAnticipationsNumber() {
    $.get("https://teste-caze.herokuapp.com/feedback", function(quantidade) {
    var size = quantidade.length;
    if (size == 0) {
        string = "Nenhuma antecipação";
        $("#anticipations-amount").html(string);    
    }
    else if (size == 1) {
        $("#anticipations-amount").html(size);
    }
    else if (size > 1) {
        $("#anticipations-amount").html(size);
    }
    
    quantidade.map(item => {
        total += parseFloat(item.montanteEscolhido);
        lucroTotal += parseFloat(item.discountedAnticipation);

        $("#total-value").html("R$ " + total)

    })
    lucro += (total - lucroTotal)
    $("#profits").html("R$ " + lucro.toFixed(2))
    }
)}

$('#valor').keyup(function() {
    console.log("AA")
})