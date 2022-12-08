var christmas_image, presents, santa, bells, present_slider, x;

let snowflakes = [];

function preload(){
  //loading in images and sound
  christmas_image = loadImage("xmas.jpg");
  presents = loadImage("p.png");
  santa = loadImage("santa.png");
  bells = loadSound("bells.mp3");
}

function setup() {
  createCanvas(500, 400);
  noStroke();
  
  x = 0;
  
  //creating a slider
  present_slider = createSlider(0, 400, 0);
  present_slider.position(0, 400);
  present_slider.style('width', '500px');
  
  //sound
  bells.setVolume(0.5);
  bells.play();
}

function draw() {
  background(christmas_image);
  
  //text
  textSize(40);
  fill("red");
  stroke("green");
  strokeWeight(4);
  text("Merry Christmas!", 110, 150);
  textSize(22);
  text("Slide the Present to Santa Claus!!", 100, 185);
  
  //interactivity with present
  image(santa, 400, 300, 100, 100)
  if (present_slider.value() > x){
    x += 1
    image(presents, x, 330, 70, 70)
  } else {
    x -= 1
    image(presents, x, 330, 70, 70)
  }
 
  //snow fall, found on reference page but changed
  fill("white")
  stroke("white")
  strokeWeight(1)
  let snowtime = frameCount / 60;
    // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(snowtime); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}