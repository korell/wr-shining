import {Player} from "./main/Player";
const playerContainer = document.getElementById('player')
const player = new Player(playerContainer)

const axe = document.getElementById('axe')
const content = document.querySelector('.Content')

let hoverAxe = false

const btnAction = document.getElementById('trigger')

document.addEventListener('pointermove', ev => {
    const axeCoords = axe.getBoundingClientRect()
    if(ev.clientX > axeCoords.left && ev.clientX < axeCoords.right && ev.clientY > axeCoords.top && ev.clientY < axeCoords.bottom) {
        if(!hoverAxe) {
            hoverAxe = true
            //player.playVideo()
        }
    } else {
        hoverAxe = false
    }
})

document.body.addEventListener('click', () => {
    player.video.muted = false
})

const images = [
    'eric', 'matthieu', 'jack', 'overlook'
]
let availableImages = [...images]
let currentImage = null
btnAction.addEventListener('click', ev => {
    ev.preventDefault()
    content.style.visibility = 'hidden'
    if(currentImage) {
        currentImage.classList.remove('visible')
    }
    currentImage = null
    const index = Math.min(availableImages.length - 1, Math.floor(Math.random() * availableImages.length)),
        key = availableImages[index]
    availableImages.splice(index, 1)
    if(availableImages.length === 0) {
        availableImages = [...images]
    }

    if(key === 'jack') {
        player.video.addEventListener('ended', (ev) => {
            content.style.visibility = null
        })
        player.playVideo()
    } else {
        currentImage = document.getElementById(key)
        currentImage.classList.add('visible')
        currentImage.addEventListener('click', () => {
            currentImage.classList.remove('visible')
            content.style.visibility = null
        })
    }
})
