// const input = prompt('Enter a text');
// const messageEl = document.createElement('p');
// const messagebox = document.querySelector('.testdiv');
// const inputEl = document.querySelector('.textInput');

Button.addEventListener('click', hidden);
    function hidden() {
    const text = getInputText();
    const Button = document.querySelector('.btn');
        if( text === '' ) {
            Button.hidden = true;
        }
        Button.removeEventListener('click', hidden);
        Button.addEventListener('click', showButton);
    }

    function showButton() {
        const Button = document.querySelector('.btn');
        Button.hidden = false;

        Button.removeEventListener('click', showButton);
        Button.addEventListener('click', hidden);
    }

Button.addEventListener('click', buttonClick);
    function buttonClick() {
        const text = getInputText();
        addText(text);
        clearInput();
    }


Button.addEventListener('click', removeParagraph);
    function removeParagraph() {
    const paragraph = document.querySelectorAll('p');
    const paragraphElement = document.querySelector('p');
        if (paragraph.length > 5) {
            paragraphElement.remove;
        }
         else (Button.removeEventListener('click', removeParagraph))
    }

function getInputText() {
    const input = document.querySelector('.textInput');
    return input.value;
}

function addText(input) {
    const messageElement = document.createElement('p');
    messageElement.innerText = input;

    const messagebox = document.querySelector('.testdiv');
    messagebox.append(messageElement);
}

Button.addEventListener('click', clearInput);
function clearInput() {
    const input = document.querySelector('.textInput');
    input.value = '';
    Button.removeEventListener('click', clearInput);
}