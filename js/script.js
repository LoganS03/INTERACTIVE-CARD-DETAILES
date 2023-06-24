let form = document.querySelectorAll("input")
let defaultColor = form[0].style.borderColor
let emptyError =  document.querySelectorAll(".empty")
let formatError =  document.querySelector(".wrong_form")
let error = document.querySelectorAll(".error")
let modalPage = document.querySelector(".modal_page")
let inputArea = document.querySelector(".input_area")
let reload = document.querySelector(".reloadbtn")
let allRight = [true, true, true, true, true]
let button = form[5]

for(let i = 0; i < form.length - 1; i++){
    let input = form[i]

    if(input !== form[5]){
        input.setAttribute("onmouseover", "hover(this)")
    }

    input.addEventListener('keypress', () => {
        if(input == form[2] || input == form[3]){
            valueLength(input, 2)
        }
        else if(input == form[4]){
            valueLength(input, 3)
        }
    })

    if(i == 0){
        input.addEventListener('keypress', function(event) {
            if (!/[a-z ]/i.test(event.key)) {
                event.preventDefault();
            }
        })
    }
    else if(i == 1){
        input.addEventListener('keypress', function(event) {
            if(!/[a-z0-9]/i.test(event.key)) {
                event.preventDefault();
            }
        
            if(input.value.split(" ").join("").length % 4 == 0 && form[1].value.length > 0) {
                if(input.value.split(" ").join("").length == 16) {
                    event.preventDefault();
                }
                else{
                    input.value += " "
                }
            }
        })
    }
}

function hover(input){
    input.style.background = "linear-gradient(white, white) padding-box, linear-gradient(#6348FE, #610595) border-box"
}

function valueLength(input, value){
    if (input.value.length == value) {
        event.preventDefault();
    }
}

form[1].addEventListener('keyup', () => {
    if(Boolean(form[1].value.match(/^[0-9 ]*$/)) !== true && form[1].value.length > 0){
        formatError.style.display = "block"
    }
    else{
        formatError.style.display = "none"
    }
})

function submit(input, index){
    if(input.value.length == 0){
        input.style.borderColor = "#FF5050";
        emptyError[index].style.display = "block"
        allRight[index] = false
    }
    else{
        emptyError[index].style.display = "none"
        allRight[index] = true
    }
}

button.addEventListener("click", () => {
    for(let i = 0; i < form.length - 1; i++){
        submit(form[i], i)

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

                if(i == 2){
                    if(form[i].value > 12 || form[i].value < 1){
                        error[0].style.display = "block"
                    }
                    else{
                        error[0].style.display = "none"
                    }
                }
                else if(i == 3){
                    if(form[i].value < 23){
                        error[1].style.display = "block"
                    }
                    else{
                        error[1].style.display = "none"
                    }
                }
                else if(i == 4){
                    if(form[i].value.length < 3){
                        error[2].style.display = "block"
                    }
                    else{
                        error[2].style.display = "none"
                    }
                }
                else{
                    allRight[i] = true
                }
            }
            else{
                emptyError[i].style.display = "block"
                allRight[i] = false
            }
        })
    }

    if(formatError.style.display == "none"){
        allRight[1] = true
    }
    else{
        allRight[1] = false
    }

    
    if(error[0].style.display == "none"){
        allRight[2] = true
    }
    else{
        allRight[2] = false
    }

    if(error[1].style.display == "none"){
        allRight[3] = true
    }
    else{
        allRight[3] = false
    }

    if(error[2].style.display == "none"){
        allRight[4] = true
    }
    else{
        allRight[4] = false
    }
    
    console.log(allRight);
    if(!allRight.includes(false)){
        modalPage.style.display = "flex"
        inputArea.style.display = "none"
    }
})

reload.addEventListener("click", () => {
    location.reload()
})