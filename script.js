// const input = prompt('Enter a text');
// const messageEl = document.createElement('p');
// const messagebox = document.querySelector('.testdiv');
// const inputEl = document.querySelector('.textInput');
const Button = document.querySelector('.btn');
const paragraph = document.querySelectorAll('p');
Button.addEventListener('click', buttonClick);

function buttonClick() {
    const text = getInputText();
    const paragraph = document.querySelectorAll('p');
    const paragraphElement = document.querySelector('p');
        if( paragraph.length >= 5) {
            paragraphElement.remove;
            clearInput();
         }    
         else if (text === '' ) {
            Button.hidden = true;
        } else {
            addText(text); 
            clearInput();
        }
    // Button.removeEventListener('click', buttonClick);
    // Button.addEventListener('click', clearInput);
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

function clearInput() {
    const input = document.querySelector('.textInput');
    input.value = '';

    const Button = document.querySelector('.btn');
    // Button.removeEventListener('click', clearInput);
    Button.addEventListener('click', buttonClick);
}

// function showButton() {
//     const text = getInputText();
//     const Button = document.querySelector('.btn');
   
//         Button.hidden = false;
          
    
//     Button.removeEventListener('click', showButton);
//     Button.addEventListener('click', removeParagraph);
// }
    // function hidden() {
    // const text = getInputText();
    // const Button = document.querySelector('.btn');
        
    //     Button.hidden = true;

    //     // Button.removeEventListener('click', hidden);
    //     Button.addEventListener('click', buttonClick);
    // }

    // function removeParagraph() {
    // const paragraph = document.querySelectorAll('p');
    // const paragraphElement = document.querySelector('p');
    // if( paragraph.length > 5) {
    //         paragraphElement.remove;
    // }
    //     const Button = document.querySelector('.btn');
    //     // Button.removeEventListener('click', removeParagraph);
    //     Button.addEventListener('click', buttonClick);
    // }

