document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.querySelector('canvas');
  let title = document.getElementById('title');
  let startBut = document.getElementById('startbut')
  let titleElements = title.innerHTML.split("");
  let buttonSoundEffect = document.getElementById('butSoundEf')
  let shortcuts = document.getElementById('hotkeys')
  let starting = false
  let firstClick = false
  let shortCanvas;
  let s;

  console.log('ready!')

  shortcuts.addEventListener('click', function() {
    window.location = "shortcuts.html"



  })

  startBut.addEventListener('click', function() {
    buttonSoundEffect.play()
    const fade = [
      { opacity: 1, easing: "ease-out" },
      { opacity: 0.1, easing: "ease-in" },
      { opacity: 0 },
    ]
    const options = {
      duration: 3000,
      iterations: 1,
      fill: 'forwards'
    };
    

    let titleAnim = title.animate(fade, options)
    shortcuts.animate(fade, options)
    let startAnim = startBut.animate(fade, options)

    starting=true
    console.log(starting)
    startBut.disabled = true
    titleAnim.addEventListener('finish', function() {
      setTimeout(() => {
        window.location = 'grabthemoon.html'
      }, 500);
    })
    

  })


  let c = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function createStar() {
    this.radius = 3
    this.x = canvas.width * Math.random();
    this.y = canvas.height/1.1 * Math.random();
    this.opacity = 1

    this.rand = (Math.random() * 2) + 0.1
    this.spawn = function() {
      c.beginPath()
      c.arc(this.x,this.y,this.radius,0, Math.PI*2, false)
      c.fillStyle = 'rgba(255,255,255,' +`${this.opacity}` + ")"
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

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    starArray = []
    for (let i = 0; i < 25; i++) {
      starArray.push(new createStar)
    }
  })

  let starArray = []
  for (let i = 0; i < 25; i++) {
    starArray.push(new createStar)
  }

  function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    
    for (let i of starArray) {
      i.spawn()
      i.move()
      if (starting) {
        i.opacity -= 0.006
      }
    }
    

  }
  animate()
})