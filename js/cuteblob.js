document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.querySelector('canvas');
  let c = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    blob = new createBlob
  })

  window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
  })


  window.addEventListener('mousedown', function(event) {
    switch(mouse.down) {
      case true:
        mouse.down = false
        console.log(mouse.down)
        break;
      case false:
        mouse.down = true
        console.log(mouse.down)
        break;
    }
  })



  let mouse = {
  }

  mouse.down = false
  let mouseArray = []
  let mouseArrX = [0]
  let mouseXCount = []
  let mouseAvg = 0
  let poppedMouse = 0
  let direction = false
  let detDir = []

  function createBlob() {
    this.radius = 50;
    this.x = canvas.width/2;
    this.y = -this.radius
    this.gravity = 2
    this.vel = 0
    this.velx = 0
    this.stick = false
    this.mouseArray = []
    this.direction = false
    this.spawn = function() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
      c.fillStyle = 'rgb(255,255,255)'
      c.fill()
      c.stroke()
    }
    this.update = function() {
      // if ball goes of border
      if ((this.x - this.radius) > window.innerWidth) {
        this.x = 0 - this.radius;
      }
      if ((this.x + this.radius) < 0) {
        this.x = innerWidth + this.radius
      }

      if (!mouse.down) {
        this.stick = false;
        // if this is not bracketed
        this.velx = (mouseArrX[mouseArrX.length - 1] / 10) * (this.direction ? 1 : -1);
    
        console.log(mouseArrX[mouseArrX.length - 1])
        
      }
      if ((((this.x - this.radius) < mouse.x) && ((this.x + this.radius) > mouse.x)
      && ((this.y - this.radius) < mouse.y) && (this.y + this.radius) > mouse.y)
      && (mouse.down)) {
        this.stick = true;
      }
      if (!this.stick) {
      this.vel += this.gravity
      this.y += this.vel
      this.x += this.velx
      if (this.y > window.innerHeight - this.radius) {
        this.y = window.innerHeight - this.radius
        this.vel *= -0.8
      }}
      if (this.stick) {
        // sets direction
        mouseXCount.push('');
        if (mouseXCount.length >= 3) {
          if (mouse.x < this.x) {
            this.direction = false
          } else {this.direction = true}
        }
        mouseAvg += Math.abs(mouse.x - this.x)
        this.x = mouse.x
        this.y = mouse.y
        if (mouseXCount.length >= 5) {
          mouseArrX.push(mouseAvg)
          console.log(mouseArrX)
          mouseAvg = 0;
          mouseXCount = []
        }
        }

    }
  }

  let blob = new createBlob
  function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, window.innerWidth,window.innerHeight)
    blob.spawn()
    blob.update()
  }


  animate()
})