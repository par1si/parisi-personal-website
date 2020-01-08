const body = document.getElementById('body');
const hero = document.getElementById('hero');

function changeOpacity(element) {
    element.style.opacity = 1.0;
}

hero.addEventListener('onload', changeOpacity(body, hero));