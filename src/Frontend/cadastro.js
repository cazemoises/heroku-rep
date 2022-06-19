
// Check se os valores da etapa 1 da inscrição são válidos (LOGIN e PIN)
function check() {
    var loginVal = $('#login').value
    var pinVal = $('#pass').value
    var confirmPinVal = $('#confirm-pass').value
    console.log(loginVal + " " + pinVal + " " + confirmPinVal)







    window.location = 'cadastro2.html'
}