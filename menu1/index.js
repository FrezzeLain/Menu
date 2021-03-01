let topLine = document.querySelector('.topLine')
let navItems = document.querySelectorAll('.nav-item')
navItems.forEach(element => {
    element.addEventListener('mouseover', animOn)
    element.addEventListener('mouseout', animOff)
});

function animOn(){
    let Left = this.offsetLeft
    let Width = this.clientWidth
    topLine.style.left = `${Left}px`
    topLine.style.width = `${Width}px`
}

function animOff(){
    topLine.style.left = `0px`
    topLine.style.width = `100%`
}