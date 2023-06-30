let cardNumber = document.querySelector("p.card_number")
let cardHolder = document.querySelector("p.card_holder")
let cardDate = document.querySelector("p.card_date")
let cvc = document.querySelector("p.cvc")

let form = document.querySelector("form")
let input = document.querySelectorAll("input")

let formatError = document.querySelector(".wrong_format")
let emptyError = document.querySelectorAll(".empty")
let error = document.querySelectorAll(".error")

let modalPage = document.querySelector(".modal_page")
let refreshbtn = document.querySelector(".reloadbtn")

let defaultColor = form[0].style.color
let allRight = [true, true, true, true, true]
let button = input[5]

form[0].addEventListener('input', function(event) {
    if (!/[a-z ]/i.test(event.key)) {
        event.preventDefault();
    }
})

form[1].addEventListener('keyup', () => {
    if(Boolean(form[1].value.match(/^[0-9 ]*$/)) !== true && form[1].value.length > 0){
        formatError.style.display = "block"
    }
    else{
        formatError.style.display = "none"
    }
})

for(let i = 0; i < form.length - 1; i++){
    form[i].addEventListener('keyup', () => {
        if(form[0].value.length !== 0){
            cardHolder.innerText = form[0].value
            cardHolder.style.textTransform = "uppercase"         
        }
        else{
            cardHolder.innerText = "JANE APPLESEED"
        }

        if(form[1].value.length !== 0){
            cardNumber.innerText = form[1].value
        }
        else{
            cardNumber.innerText = "0000 0000 0000 0000"
        }

        if(form[2].value.length !== 0 && form[3].value.length == 0){
            cardDate.innerText = form[2].value + "/00"
        }
        else if(form[3].value.length !== 0 && form[2].value.length == 0){
            cardDate.innerText = "00/" + form[3].value
        }
        else if(form[2].value.length !== 0 && form[3].value.length !== 0){
            cardDate.innerText = form[2].value + "/" + form[3].value
        }
        else{
            cardDate.innerText = "00/00"
        }

        if(form[4].value.length !== 0){
            cvc.innerText = form[4].value
        }
        else{
            cvc.innerText = "000"
        }
    })
    form[i].addEventListener('keypress', (event) => {
        if(i == 1){
            if(!/[0-9]/i.test(event.key)) {
                event.preventDefault();
            }
        
            if(form[1].value.split(" ").join("").length % 4 == 0 && form[1].value.length > 0) {
                if(form[1].value.split(" ").join("").length == 16) {
                    event.preventDefault();
                }
                else{
                    form[1].value += " "
                }
            }
        }
        else if(i == 2 || i == 3){
            if(form[i].value.length == 2){
                event.preventDefault();
            }
        }
        else if(i == 4){
            if(form[i].value.length == 3){
                event.preventDefault();
            }
        }
    })
}

function valueLength(index){
    if(index == 1){
        if(form[1].value.split(" ").join("").length !== 16){
            error[0].style.display = "block"
        }
        else{
            error[0].style.display = "none"
        }
    }
    else if(index == 2){
        if(form[2].value > 12 || form[2].value < 1){
            error[1].style.display = "block"
        }
        else{
            error[1].style.display = "none"
        }
    }
    else if(index == 3){
        if(form[3].value < 23){
            error[2].style.display = "block"
        }
        else{
            error[2].style.display = "none"
        }
    }
    else if(index == 4){
        if(form[4].value.length < 3){
            error[3].style.display = "block"
        }
        else{
            error[3].style.display = "none"
        }
    }
}

button.addEventListener("click", () => {
    for(let i = 0; i < form.length - 1; i++){
        if(form[i].value.length == 0){
            form[i].style.borderColor = "#FF5050";
            emptyError[i].style.display = "block"
        }
        else{
            emptyError[i].style.display = "none"
            valueLength(i)
        }

        form[i].addEventListener('focusin', () => {
            form[i].style.borderColor = defaultColor;
        })

        form[i].addEventListener('focusout', () => {
            if(form[i].value.length == 0){
                form[i].style.borderColor = "#FF5050";
            }
        })

        form[i].addEventListener('keyup', () => {
            if(form[i].value.length !== 0){
                emptyError[i].style.display = "none"
                valueLength(i)
            }
            else{
                emptyError[i].style.display = "block"
            }
        })
        
        if(emptyError[i].style.display == "block"){
            allRight[i] = false
        }
        else{
            allRight[i] = true

            if(error[0].style.display == "block"){
                allRight[2] = false
            }
            else if(error[1].style.display == "block"){
                allRight[3] = false
            }
            else if(error[2].style.display == "block"){
                allRight[4] = false
            }
        }
    }

    if(!allRight.includes(false)){
        form.style.display = "none"
        modalPage.style.display = "flex"
    }
    else{
        console.log(allRight);
    }
})

refreshbtn.addEventListener("click", () => {
    location.reload()
})