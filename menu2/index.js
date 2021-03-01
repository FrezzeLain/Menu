let MenuOpen = document.querySelector('#MenuOpen')
let MenuClose = document.querySelector('#closeMenu')
let Menu = document.querySelector('.menu')
let MenuOptions = document.querySelectorAll('.outside')

MenuOpen.addEventListener('click', openMenu)
MenuOptions.forEach(element => {
    element.addEventListener('click', secondMenu)
});
MenuClose.addEventListener('click', closeM)

function openMenu(){
    MenuOpen.style.left = `-20%`
    Menu.style.left = `0px`
}

function secondMenu(){
    if(this.children[1].style.left === '' || this.children[1].style.left === `-650%`){
        this.children[0].style.fontSize = `36px`
        this.children[1].style.left = `20%`
    } else{
        this.children[0].style.fontSize = `22px`
        this.children[1].style.left = `-650%`
    }
}

function closeM(){
    MenuOpen.style.left = `0`
    Menu.style.left = `-20%`

    let MassOpt = document.querySelectorAll('.inside')
    MassOpt.forEach(element => {
        element.style.left = `-650%`
        element.parentNode.children[0].style.fontSize = `22px`
    });
}