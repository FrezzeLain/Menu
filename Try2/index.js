let Config = {
    CurrentWidth: null,
    CurrentHeight: null,
    CurrentX: null,
    CurrentY: null
}

let Menu = document.querySelector('.navigation .container')
let Options = Menu.querySelectorAll('.Option')

Options.forEach(el => {
    if(el.classList.contains('call')){
        el.addEventListener('mouseover', Show)
        el.addEventListener('mouseout', (CurrentEvent) => Hide(CurrentEvent))
    }
})

let PodMenuMassiv = document.querySelectorAll('.PodMenu')
PodMenuMassiv.forEach(el => {
    let MassCall = el.querySelectorAll('.call')
    MassCall.forEach(element => {
        element.addEventListener('mouseover', (Ev) => Show2(Ev))
    })
    MassCall.forEach(element => {
        element.addEventListener('mouseout', (Ev) => Hide2(Ev))
    })
})

function Show(){
    let CurrentBlock = this.id
    Config.CurrentX = this.offsetLeft
    Config.CurrentY = this.offsetTop
    Config.CurrentWidth = this.clientWidth
    Config.CurrentHeight = this.clientHeight
    if(CurrentBlock == 'Option1'){
        let CurrentShow = document.querySelector('.PMO1')
        CurrentShow.style.left = `${Config.CurrentX}px`
        CurrentShow.style.top = `${CurrentShow.CurrentY}px`
        CurrentShow.classList.remove('hidden')
        CurrentShow.classList.add('flex')
    }
}

function Hide(e){
    let CurrentBlock = e.target.id
    if(CurrentBlock == 'Option1'){
        let BlockMenu = document.querySelector('.PMO1')
        let CurrentTargets = document.querySelectorAll('.PMO1 .Option')
        let CurrentTargetsMassiv = Array.prototype.slice.call(CurrentTargets)

        let MoreVariantTargets = Array.prototype.slice.call(document.querySelectorAll('.PMO3 .Option'))
        let Target = CurrentTargets[0]
        if(e.relatedTarget == Target){
            CurrentTargetsMassiv.forEach(elem => {
                elem.addEventListener('mouseout', (CurEv) =>{
                    if(CurrentTargetsMassiv.indexOf(CurEv.relatedTarget) == -1 && MoreVariantTargets.indexOf(CurEv.relatedTarget) == -1){
                        BlockMenu.classList.add('hidden')
                        BlockMenu.classList.remove('flex')
                    }
                })
            })
        } else{
            BlockMenu.classList.add('hidden')
            BlockMenu.classList.remove('flex')
        }
    }
}

function Show2(e){
    let CurrentBlock = e.target
    if(CurrentBlock.id == 'PodOption3'){
        let ShowBlock = document.querySelector('.PMO3')
        let PreBlock = document.querySelector('.PMO1')
        ShowBlock.classList.add('flex')
        ShowBlock.classList.remove('hidden')
        ShowBlock.style.left  = `${Config.CurrentWidth + Config.CurrentX}px`
        ShowBlock.style.top = `${CurrentBlock.offsetTop + CurrentBlock.clientHeight}px`

        let Targets = Array.prototype.slice.call(document.querySelectorAll('.PMO3 .Option'))
        Targets.forEach(el => {
            el.addEventListener('mouseout', (Ev) => {
                if(Targets.indexOf(Ev.relatedTarget) == -1 && Ev.relatedTarget != CurrentBlock){
                    ShowBlock.classList.add('hidden')
                    ShowBlock.classList.remove('flex')
                    PreBlock.classList.add('hidden')
                    PreBlock.classList.remove('flex')
                }
            })
        })
    }
}

function Hide2(e){
    let CurrentBlock = e.target
    if(CurrentBlock.id == 'PodOption3'){
        let ShowBlock = document.querySelector('.PMO3')
        let PreBlock = document.querySelector('.PMO1')
        let MassTargets = ShowBlock.querySelectorAll('.Option')
        let MassTargetsArray = Array.prototype.slice.call(MassTargets)
        if(MassTargetsArray.indexOf(e.relatedTarget) == -1){
            ShowBlock.classList.remove('flex')
            ShowBlock.classList.add('hidden')
        } else{
            PreBlock.classList.add('flex')
            PreBlock.classList.remove('hidden')
        }

    }
}