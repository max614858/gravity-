document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.querySelector('canvas');
  let c = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stuckSound = document.getElementById('ballstuck')
  let unstuckSound = document.getElementById('unstuck')
  let hit = document.getElementById('hit')

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    blob = new createBlob
    
    blobbyArray = []
    starArray = []

    for (let i = 0; i < 1; i ++) {
      blobbyArray.push(new createBlob)
    }
    for (let i = 0; i < 20; i ++) {
      starArray.push(new createStar)
    }
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
        unstuckSound.play()
        break;
      case false:
        mouse.down = true
        stuckSound.play()
        console.log(mouse.down)
        break;
    }
  })

  let keylogs = []
  let sendUp = true
  window.addEventListener("keydown", function(event) {
    keylogs.push(event.key)
    console.log(event.key)
    if ((keylogs[keylogs.length - 2] == 'Shift') && (keylogs[keylogs.length-1] == '*')) {
      sendUp = true
      console.log('ready?')
    }
    if (event.key == 'Backspace' || event.key == 'Alt') {
      window.location = 'index.html'
    }
  })

  window.addEventListener('wheel', function(event) {
    switch(event.deltaY < 0) {
      case true:
        for (let i of blobbyArray) {
          i.gravity -= 0.1
        }
        break;
      case false:
        for (let i of blobbyArray) {
          i.gravity += 0.1
        }
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

  function createStar() {
    this.radius = 3
    this.x = canvas.width * Math.random();
    this.y = canvas.height/1.1 * Math.random();
    this.opacity = 0

    this.rand = (Math.random() * 2) + 0.1
    this.spawn = function() {
      c.beginPath()
      c.arc(this.x,this.y,this.radius,0, Math.PI*2, false)
      c.fillStyle = 'rgba(255,255,255,' +`${this.opacity}` + ")"
      c.strokeStyle = 'rgba(255,255,255,' +`${this.opacity}` + ")"
      c.shadowBlur = 70;
      c.shadowColor = "white";
  
      c.fill()
      c.stroke()
    }
    this.move = function() {
      this.x += this.rand
      if ((this.x - this.radius) > canvas.width) {
        this.x = 0 - this.radius
        this.rand = (Math.random() * 2) + 0.1
      }
    }
  }

  function createBlob() {
    this.radius = 50;
    this.x = canvas.width * Math.random();
    this.y = -this.radius
    this.gravity = 2
    this.vel = 0
    this.velx = 0
    this.vely = 0
    this.stick = false
    this.still = false
    this.opacity = 0
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
      c.fillStyle = 'rgba(255,255,255,' +`${this.opacity}` + ")"
      c.strokeStyle = 'rgba(255,255,255,' +`${this.opacity}` + ")"

      c.shadowBlur = 90;
      c.shadowColor = "white";
      
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
          if (this.velx > 0.5) {
            this.velx -= 0.15}
          else if (this.velx < -0.5) {
            this.velx += 0.15
          } else {
            this.velx = 0
          }}

      }

      if ((((this.x - this.radius) < mouse.x) && ((this.x + this.radius) > mouse.x)
      && ((this.y - this.radius) < mouse.y) && (this.y + this.radius) > mouse.y)
      && (mouse.down)) {
        this.stick = true;

      } 
      if (!this.stick) {
      // this x vel is fine
      if (!sendUp) {
        this.x += this.velx
        this.y += this.vely
        this.vely += this.gravity
      } else {
        this.x = innerWidth * 0.8
        this.y = innerHeight * 0.2
      }
      if ((0.1 < Math.abs(this.vely)) && (this.y + this.radius < window.innerHeight)){
        this.repeatBounce.push(this.y) 
      }
      // seems like vely is getting set equal to gravity somewhere
  
      if (this.y > window.innerHeight - this.radius) {
        this.vely *= -0.67
        //external to class (careful!)
        if (!this.still) {
          hit.play()
        }
        this.y = window.innerHeight - this.radius
        this.stopBounce = window.innerHeight - this.repeatBounce[this.repeatBounce.length - 1]
        this.countBounce.push(this.stopBounce)
        if (this.countBounce.length > (this.bounceLim)) {
          this.vely *= 0.85
        }
        if (this.countBounce.length > (this.bounceLim + 1)) {
          this.vely *= 0.8
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
        this.still = false
        sendUp = false
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
  let starArray = []

  for (let i = 0; i < 1; i ++) {
    blobbyArray.push(new createBlob)
  }
  for (let i = 0; i < 30; i ++) {
    starArray.push(new createStar)
  }



  let blobX = []
  function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, window.innerWidth,window.innerHeight)
    
    for (let blob of blobbyArray) {
      blob.spawn()
      blob.update()
      if (blob.opacity < 1) {
        blob.opacity += 0.006
      }
      
    }
    for (let str of starArray) {
      str.spawn()
      str.move()
      if (str.opacity < 1) {
        str.opacity += 0.006
      }
    }

    
    
  }


  animate()
})