//Projct Set up
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

let parsedCollisions 
let collisionBlocks

let background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './Img/backgroundLevel1.png',
})

let level = 1
let levels = {
    1: {
        init: ()=>{
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            background = new Sprite({
            position: {
            x: 0,
            y: 0,
            },
    imageSrc: './Img/backgroundLevel1.png',
})
        }
    }
}

const player = new Player({
    collisionBlocks,
    imageSrc: './Img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './Img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './Img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './Img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './Img/king/runLeft.png',
        },    
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './Img/king/enterDoor.png',
            onComplete: ()=>{
                console.log('completed')
                overlay.opacity
                gsap.to(overlay, {
                    opacity: 1
                })
            }
        },     
    },
})

const doors = [
    new Sprite({
        position: {
            x: 767,
            y: 270
        },
        imageSrc: './Img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 6,
        loop: false,
        autoplay: false
    }),
]

//create player / animate player

//setting the pressed action to false by defualt
const keys = {
    ' ':{
        pressed: false
    },
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    }
}

const overlay = {
    opacity: 0
}

//annimates the player movement
function animate(){
    window.requestAnimationFrame(animate)

    background.draw()
    collisionBlocks.forEach((collisionBlocks) => {
        collisionBlocks.draw()
    })

    doors.forEach((door) => {
        door.draw()
    })

//re-draws player each frame to simulate movement 

    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.restore()

}

animate()

