const canvas = document.querySelector("canvas")

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const center = {
    x: innerWidth/2,
    y: innerHeight/2
}

addEventListener('resize', ()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
})

const colorSet = ['#FFEA20', '#39B5E0', '#FF0032', '#CFFDE1']

let mouseDown = false
addEventListener('mousedown', ()=>{
    mouseDown = true
})

addEventListener('mouseup', ()=>{
    mouseDown = false
})

class Particle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true)
        c.shadowColor = this.color
        c.shadowBlur = 10
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

let particlesArr = []
function init() {
    for (let i = 0; i < 700; i++) {
        let x = (Math.round(Math.random()) * 2 - 1)*Math.random()*canvas.width
        let y = (Math.round(Math.random()) * 2 - 1)*Math.random()*canvas.height
        let r = 0.5+ Math.random()*1.5
        let color = colorSet[Math.round(Math.random()*4)]
        particlesArr.push(new Particle(x, y, r, color))
    }
}

let angle = 0
let alpha = 1
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = `rgba(10, 10, 10, ${alpha})`
    c.fillRect(0, 0 , canvas.width, canvas.height)
    c.save()
    c.translate(canvas.width/2, canvas.height/2)
    c.rotate(angle)
    for (let i = 0; i < 700; i++) {
        particlesArr[i].draw()
    }
    c.restore()
    angle += 0.003;

    if(mouseDown && alpha >= 0.03) {
        alpha -= 0.01
    }
    else if(!mouseDown && alpha <1) {
        alpha += 0.01
    }
}

init()
animate()