// initial setup
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//variables
var mouse = {
    x:innerWidth/2,
    y:innerHeight/2
};

var colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66',
    '#FF526C',
    '#B8B2E8',
    '#E8A663'
];
 
var gravity = 1;
var friction = 0.995;
//event listeners
addEventListener("mouseover", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", function(){
    canvas.width = innerWidth;
    // canvas.height = innerHeight;

    init();
});

addEventListener('click', function(){
    // init();
});

//utility functions
function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

//objects
function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.update = function(){
      
        if(this.y + this.radius + this.dy > canvas.height)
        {
        
           this.dy = -this.dy * friction;
        }
        else
        {
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius  <= 0)
        {
            this.dx = -this.dx;

        }
      
        this.y += this.dy;     
        this.x += this.dx;  
        this.draw();
    };

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        
        c.closePath();
    };
}

//implementation
var ball;
var ballArray = [];
function init(){
    ballArray = [];
    for(var i = 0; i < 300; i++)
    {
        var radius = randomIntFromRange(8, 20);

        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors);

        ballArray.push(new Ball(x, y, dx, dy, radius, color ));

    }

    addEventListener("click", function(){
        console.log("ball clicked");
    });
    console.log(ballArray);
    // ball = new Ball(canvas.width / 2, canvas.height / 2, 15, 30, "red");
    // ball2 = new Ball(canvas.width / 3, canvas.height / 2, 3, 40, "green");

    // ball3 = new Ball(canvas.width / 10, canvas.height / 2, 1, 80, "green");

}

//animation logo
function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0,0, canvas.width, canvas.height);
    // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    // ball.update();
    // ball2.update();
    // ball3.update();
    for(var i = 0; i<ballArray.length; i++)
    {
        ballArray[i].update();

    }
}

init();
animate();
