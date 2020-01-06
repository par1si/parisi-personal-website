/* Styling the textarea animations */

const textarea = document.getElementById('textarea');
const button = document.getElementById('button')

function expandViewPort() {
    textarea.style.width = '85%'
    textarea.style.height = '15rem';
}

function collapseViewPort() {
    textarea.style.width = '40%'
    textarea.style.height = '3rem';
}

textarea.addEventListener("click", expandViewPort);
button.addEventListener("click", collapseViewPort);
textarea.addEventListener("blur", collapseViewPort);