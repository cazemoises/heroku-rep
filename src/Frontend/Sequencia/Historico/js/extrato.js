var logged_cnpj = sessionStorage.getItem("logged_cnpj");
console.log(logged_cnpj)

function teste() {
    $.get("http://127.0.0.1:3000/anticipations", function(anticipation) {
      let i = 0;
      var requestedString = ' <div class="item">Valor Solicitado</div>'
      var discountedString = ' <div class="item">Valor Descontado</div>'
      var ruleString = '<div class="item">Regra</div>'
      var dateString = '<div  class="item">Data de solicitação</div>'
      var percent
      while (i < anticipation.length) {
        if (anticipation[i].hotelCnpj == logged_cnpj) {
            console.log(anticipation[i].montanteEscolhido)

            requestedString += '<div class="value">R$ ' + anticipation[i].montanteEscolhido + '</div>'
            discountedString += '<div class="value">R$ ' + anticipation[i].discountedAnticipation + '</div>'
            
            dateString += '<div class="date"> ' + anticipation[i].data + '</div>'
            if (anticipation[i].regraNegocio == 12) {

            }
            ruleString += '<div class="rule">D+ ' + anticipation[i].regraNegocio + '</div>'
        }
        i += 1
      }
      $(`#requested-values`).html(requestedString);
      $(`#discounted-values`).html(discountedString);
      $(`#rule`).html(ruleString);
      $(`#date`).html(dateString)
})
}