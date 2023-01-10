//player movement

//listens for what key is pressed to move the player
window.addEventListener('keydown', (event)=>{
    if (player.preventInput) return
    switch (event.key){
        case ' ':
            if (player.velocity.y === 0){
            player.velocity.y = -25
            }
            break;
        case 'w':
            for ( let i = 0; i < doors.length; i++){
                const door = doors[i]
                if (
                player.hitBox.position.x + player.hitBox.width <= door.position.x + door.width && 
                player.hitBox.position.x >= door.position.x && 
                player.hitBox.position.y + player.hitBox.height >= door.position.y &&
                player.hitBox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    door.play()
                } return
            }
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
    }
})

//stops movement when key is no longer pressed
window.addEventListener('keyup', (event)=>{
    switch (event.key){
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
    }
})