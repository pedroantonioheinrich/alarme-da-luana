const button = document.querySelector('#button-start-stop')
const timer40 = document.querySelector('#timer-40')
const timer15 = document.querySelector('#timer-15')
const timer5 = document.querySelector('#timer-5')
const minute = document.querySelector('#minute')
const second = document.querySelector('#second')
const msgFooter = document.querySelector('footer')

let timerMinute = 1;
let timerSecond = 1;
let isClicked = false;
let timerActive = false;
let timer40Active = false;
let timer15Active = false;
let timer5Active = false;

timer40.addEventListener('click', ()=>{
    isClicked = true;
    timerMinute = 39;
    timerSecond = 59;
    timer40Active = true;
    timer15Active = false;
    timer5Active = false;
    minute.textContent = 40;
    timer40.style.border = '2px solid #fff'
    timer15.style.border = 'none'
    timer5.style.border = 'none'
    msgFooter.textContent = 'Dica: Desligue o celular e qualquer distração!'
})
timer15.addEventListener('click', ()=>{
    isClicked = true;
    timerMinute = 14;
    timerSecond = 59;
    timer40Active = false;
    timer15Active = true;
    timer5Active = false;
    minute.textContent = 15;
    timer40.style.border = 'none'
    timer15.style.border = '2px solid #fff'
    timer5.style.border = 'none'
})
timer5.addEventListener('click', ()=>{
    isClicked = true;
    timerMinute = 4;
    timerSecond = 59;
    timer40Active = false;
    timer15Active = false;
    timer5Active = true;
    minute.textContent = 5;
    timer40.style.border = 'none'
    timer15.style.border = 'none'
    timer5.style.border = '2px solid #fff'
    
})

button.addEventListener('click',(event)=>{
    event.preventDefault()
    if (!isClicked){
        Swal.fire({
            title: 'Erro!',
            text: 'Selecione uma opção',
            icon: 'error',
            confirmButtonText: 'Ok!'
        })
        return
    }
    if(timerActive) return;

    let click = new Audio('./click.mp3')
    click.play()
    timerActive  = true;
    minute.textContent = timerMinute;
    second.textContent = timerSecond;
    if(timer40Active){
        button.textContent = 'Luana estudando afu!'
        msgFooter.textContent = 'Bons estudos!'
    }
    if(timer15Active){
        button.textContent = 'No intervalo!'
    }
    if(timer5Active){
        button.textContent = 'No banheiro...'
    }
    setInterval(()=>{
        if(timerMinute === 0 && timerSecond > 0){
            if(timer15Active || timer5Active){
                button.textContent = 'Voltar em 1min'
            }
            if(timer40Active){
                button.textContent = 'Intervalo em 1min'
            }
        }
        if(timerMinute === 0 && timerSecond === 0){
            let alarm = new Audio('./alarm1.mp3');
            button.textContent = 'Alarme tocando!'
            return alarm.play()
        }
        if(timerSecond > 0){
            timerSecond--
            if(timerSecond > 9){
                second.textContent = timerSecond;
            }else{
                second.textContent = `0${timerSecond}`;
            }
        }else{
            timerSecond = 59;
            timerMinute--;
            minute.textContent = timerMinute;
            second.textContent = timerSecond;
        }
    },1000)

})