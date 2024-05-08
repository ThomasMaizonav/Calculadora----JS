let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.slice(0, -1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '/':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);
    
    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    switch(previousOperator){
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer; // Operação de subtração corrigida
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '/':
            if(intBuffer === 0){
                alert("Divisão por zero!");
            } else {
                runningTotal /= intBuffer;
            }
            break;
    }
}


function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
       buttonClick(event.target.innerText); 
    });
}

init();

function changeTheme(theme) {
    const wrapper = document.querySelector('.wrapper');

    // Remova as classes de tema atual
    wrapper.classList.remove('theme-light', 'theme-dark');

    // Adicione a classe do novo tema
    wrapper.classList.add(`theme-${theme}`);
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
       buttonClick(event.target.innerText); 
    });

    // Adicione eventos para os botões de tema
    document.querySelector('.theme-buttons').addEventListener('click', function(event) {
        const theme = event.target.innerText.toLowerCase().split(' ')[0]; // Obtém o texto do botão e converte para lowercase
        changeTheme(theme);
    });
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
       buttonClick(event.target.innerText); 
    });

    // Adicione eventos para os botões de tema
    document.querySelector('.theme-buttons').addEventListener('click', function(event) {
        const theme = event.target.innerText.toLowerCase().split(' ')[0]; // Obtém o texto do botão e converte para lowercase
        changeTheme(theme);
    });

    // Adicione eventos para os botões de número
    const numberButtons = document.querySelectorAll('.calc-button:not(.theme-buttons)'); // Selecione todos os botões de número, excluindo os botões de tema
    numberButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            handleNumber(event.target.innerText); // Chama a função handleNumber com o texto do botão como argumento
            screen.innerText = buffer; // Atualiza a tela após clicar no botão de número
        });
    });
}
