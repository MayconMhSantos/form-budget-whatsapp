const form = document.getElementById("form");

const username = document.getElementById("username");
const txtemail = document.getElementById("txtemail");
const phone = document.getElementById("phone");
const servicos = document.getElementById("servicos");
const txtarea = document.getElementById("txtarea");

const btnEnviar = document.getElementById("btnEnviar");


document.getElementById("phone").onkeyup = function(){
    mascara( this, validedPhone);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validedForm()

})

function validedForm(){

   const usernameValue = username.value;
   const emailValue = txtemail.value;
   const phoneValue = phone.value;
   const txtareaValue = txtarea.value;

    if(usernameValue === ""){
        errorMessage(username, "O nome é obrigatorio!")
    } else if (usernameValue.length < 3){
        errorMessage(username, "O nome deve conter pelo menos 3 caracteres!")
    } else {
        successMessage(username)     
    }

    if(emailValue === ""){
        errorMessage(txtemail, "O email é obrigatorio!")
    } else if (!validateEmail(emailValue)){
        errorMessage(txtemail, "O email não é valido!")
    } else {
        successMessage(txtemail)     
    }

    if(phoneValue === ""){
        errorMessage(phone, "O numero é obrigatorio!")
    } else if (phoneValue.length < 15){
        errorMessage(phone, "Ex: (45) 98888-0000")
    } else {
        successMessage(phone)     
    }

    if(txtareaValue === ""){
        errorMessage(txtarea, "Descreva prevemente o serviço")
    } else if (txtareaValue.length < 5){
        errorMessage(txtarea, "Deve conter pelo menos 5 caracteres!")
    } else {
        successMessage(txtarea)     
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
      return formControl.className === "form-control success";
    });
  
    if (formIsValid) {

        //   console.log("O formulário está 100% válido!");

        const nameWhats = username.value.replace(/( )+/g, "+")
        const phoneWhats = phone.value.replace(/( )+/g, "+")
        const textAreaWhats = txtarea.value.replace(/( )+/g, "+")
        let url = "https://wa.me/5545998359106?text="+'Nome+:+'+nameWhats+'+/+'+'+Email:+'+emailValue+'+/+'+'+Telefone:+'+phoneWhats+'+/+'+'+Necessidade+do+cliente:+'+textAreaWhats;
        console.log(url);
        console.log("Tudo certo")
        openInNewTab(url)
        document.getElementById("username").value = ""
        document.getElementById("txtemail").value = ""
        document.getElementById("phone").value  = ""

        document.getElementById("txtarea").value = ""
        
    }
}

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

function errorMessage(input, message){
    const formControls = input.parentElement;
    const small = formControls.querySelector("small")
    
    small.innerText = message
    formControls.className = "form-control error"
}
function successMessage(input){
    const formControls = input.parentElement;
    formControls.className = "form-control success"
}

// E-mail validation
function validateEmail(email){
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

//  PHONE Number validation
function validedPhone(v){
    v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v
}

function mascara(input,func){
    input_telefone=input
    validedPhone_Aux=func
    setTimeout(execmascara(),1)
}
function execmascara(){
    input_telefone.value=validedPhone_Aux(input_telefone.value)
}

