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
  let mouseArrY = [0]
  let mouseXCount = []
  let mouseAvg = 0

  let mouseAvgY = 0
  let poppedMouse = 0
  let direction = false
  let getDir = []

  function createBlob() {
    this.radius = 50;
    this.x = canvas.width * Math.random();
    this.y = -this.radius
    this.gravity = 2
    this.vel = 0
    this.velx = 0
    this.vely = 0
    this.stick = false
    this.still = true
    this.mouseArray = []
    this.direction = false
    this.directY = false
    this.stopBounce = 0
    this.repeatBounce = []
    this.countBounce = []
    this.bounceLim = 9
    this.spawn = function() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
      c.fillStyle = 'rgb(255,255,255)'
      c.shadowBlur = 70;
      c.shadowColor = "white";
      c.strokeStyle = 'rgb(255,255,255)'
      c.fill()
      c.stroke()
    }
    this.particulate = function() {
      c.beginPath()
      c.arc(this.x, this.y, 100, 0, Math.PI*2, false)
      c.fillStyle('red')
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
        if (this.still) {
          if (this.velx > 0) {
            this.velx -= 0.3
            if (Math.abs(this.velx < 0.31)) {
              this.still = false
            }
          } else if (this.velx < 0) {
            this.velx += 0.3
          }}

      }

      if ((((this.x - this.radius) < mouse.x) && ((this.x + this.radius) > mouse.x)
      && ((this.y - this.radius) < mouse.y) && (this.y + this.radius) > mouse.y)
      && (mouse.down)) {
        this.stick = true;

      } 
      if (!this.stick) {
      // this x vel is fine
      this.x += this.velx
      this.y += this.vely
      this.vely += this.gravity
      if ((0.1 < Math.abs(this.vely)) && (this.y + this.radius < window.innerHeight)){
        this.repeatBounce.push(this.y) 
      }
      // seems like vely is getting set equal to gravity somewhere
  
      if (this.y > window.innerHeight - this.radius) {
        this.vely *= -0.67
        this.y = window.innerHeight - this.radius
        this.stopBounce = window.innerHeight - this.repeatBounce[this.repeatBounce.length - 1]
        this.countBounce.push(this.stopBounce)
        if (this.countBounce.length > (this.bounceLim)) {
          this.vely *= 0.85
        }
        if (this.countBounce.length > (this.bounceLim + 1)) {
          this.vely *= 0.6
        }
        if (this.countBounce.length > (this.bounceLim + 2)) {
          this.vely = 0
          this.y = window.innerHeight - this.radius
          this.still = true
        
        } 
      }}
      if (this.stick) {
        // sets direction
        // problem function
        this.countBounce = []
        mouseXCount.push('');
        if (mouseXCount.length >= 3) {
          if (mouse.x < this.x) {
            this.direction = false
          } else {this.direction = true}
          if (mouse.y < this.y) {
            this.directY = true
          } else {this.directY = false}
        }
        mouseAvg += Math.abs(mouse.x - this.x)
        mouseAvgY += Math.abs(mouse.y - this.y)
    

        this.x = mouse.x
        this.y = mouse.y

        if (mouseXCount.length >= 5) {
          mouseArrX.push(mouseAvg)
          mouseArrY.push(mouseAvgY)
          mouseAvg = 0;
          mouseAvgY = 0;
          mouseXCount = []
          // if this is not bracketed
          this.velx = (mouseArrX[mouseArrX.length - 1] / 10) * (this.direction ? 1 : -1);
          // this is the problem, the array index is not really working
          this.vely = (mouseArrY[mouseArrY.length - 1] / 10) * (this.directY ? -1 : 1);
          
        }
        }
        
    }
  }

  let blobbyArray = []

  for (let i = 0; i < 1; i ++) {
    blobbyArray.push(new createBlob)
  }


  let blobX = []
  function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, window.innerWidth,window.innerHeight)
    
    for (let blob of blobbyArray) {
      blob.spawn()
      blob.update()
      
    }
    
  }


  animate()
})
