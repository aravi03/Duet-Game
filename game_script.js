var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var hmax=window.innerHeight;    
var wmax=window.innerWidth;
var c=canvas.getContext('2d');
var paused=false;
var high_score=[];
var attempts=0;
var final_exit=false;

function togglePause()
{
    paused=!paused;
    // c.fillStyle='gold';
    // c.fillRect(600,200,400,400);
    // c.stroke();
    c.font = "100pt comic-sans-ms";
    c.strokeStyle='gold';
    c.strokeText("Paused", 600, 200);
    c.font = "50pt sans-serif";
    c.fillStyle = "white";
    c.fillText("Resume",650, 400);
    c.fillText("Restart",650, 500);
    c.fillText("Main Menu",650, 600);

    

}



clamp = function(value,min, max) {
    return Math.min(Math.max(value, min), max);
  }



class player{
    constructor()
    {   this.angle=1.57;
        this.height=600;
        this.x=wmax/2+70*Math.sin(this.angle);
        this.y=this.height+70*Math.cos(this.angle);
        this.x1=wmax/2-70*Math.sin(this.angle);
        this.y1=this.height-70*Math.cos(this.angle);
        this.speed=0.15;
        this.action=0;
        this.score=0;
        this.ball_size=20;
        this.radius=70;
        this.game=0;
        this.obstacle_speed=10;


    }
    movement()
    {
        if(this.action==1)
        this.angle-=this.speed;
        else if(this.action==2)
        this.angle+=this.speed;

        if(this.angle>6.28)
        this.angle=0;
        if(this.angle<0)
        this.angle=6.28;

        
    }
    upward_motion(up)
    {
        this.height-=up;
    }
    increment_obs_speed(s)
    {
        this.obstacle_speed+=s;
        }
    drawplayer()
    {
        this.x=wmax/2+70*Math.sin(this.angle);
        this.y=this.height+70*Math.cos(this.angle);
        this.x1=wmax/2-70*Math.sin(this.angle);
        this.y1=this.height-70*Math.cos(this.angle);
    c.beginPath();
    c.arc(this.x,this.y,20,0,Math.PI*2,true);
    c.strokeStyle='red';
    c.fillStyle='red';
    c.fill();
    
    c.stroke();

    c.beginPath();
    c.arc(this.x1,this.y1,20,0,Math.PI*2,true);
    c.strokeStyle='blue';
    c.fillStyle='blue';
    c.fill();
    c.stroke();


    }
    



}

var p=new player();

class obstacle{
    constructor()
    {   this.x=wmax/2-90+Math.random()*140;
        this.y=0;
        this.width=40+Math.random()*60;
        this.height=30+Math.random()*30;
        
        this.collision_count=0;
        
    }
        drawobstacle()
    {   c.beginPath();
        c.strokeStyle='white';
        c.rect(this.x,this.y,this.width,this.height);
        c.fillStyle='white';
        c.fill();
        c.stroke();
    }
    movement()
    {
        this.y+=p.obstacle_speed;
    }

   
    game_over()
    {           
        
        // c.strokeStyle='grey';
        // c.rect(400,200,800,400);
        // c.fillStyle='grey';
        // c.fill();
        // c.stroke();
        // c.fillStyle = "white";
        // c.fillRect(400,200,400,400);
        // // draw font in red
        // c.fillStyle = "red";
        // c.font = "20pt sans-serif";
        // c.fillText("Canvas Rocks!", 5, 100);
        // c.strokeStyle='red';
        paused=true;
        c.font = "100pt comic-sans-ms";
        c.strokeStyle='gold';
        c.strokeText("Game Over", 450, 250);
        c.font = "50pt sans-serif";
        c.fillStyle = "gold";
        c.fillText("Your Score is: "+p.score,550, 400);
        c.font = "30pt sans-serif";
        c.fillText("Click to exit",700, 600);
        final_exit=true;
        // c.font = "bold 70px Arial";
        // c.fillStyle='red';
        // c.fillText("Game Over", 500,200);
        // c.font = "bold 40px Arial";
        // c.fillStyle='white';
        // c.fillText("Your score is: "+p.score,500,400);
        
    }
    
    collision()
    {
        // clamp(value, min, max) - limits value to the range min..max

// Find the closest point to the circle within the rectangle
var closestX = clamp(p.x, this.x, this.x+this.width);
var closestY = clamp(p.x,this.y, this.y+this.height);

// Calculate the distance between the circle's center and this closest point
var distanceX = p.x - closestX;
var distanceY = p.y - closestY;

// If the distance is less than the circle's radius, an intersection occurs
var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
if (distanceSquared < (20 * 20)&&this.collision_count==0)
{   this.collision_count=1;
    this.game_over();
    
    
}



var closestX1 = clamp(p.x1, this.x, this.x+this.width);
var closestY1 = clamp(p.x1,this.y, this.y+this.height);

// Calculate the distance between the circle's center and this closest point
var distanceX1 = p.x1 - closestX1;
var distanceY1 = p.y1 - closestY1;

// If the distance is less than the circle's radius, an intersection occurs
var distanceSquared1 = (distanceX1 * distanceX1) + (distanceY1 * distanceY1);
if (distanceSquared1 < (20 * 20)&&this.collision_count==0)
{   this.collision_count=1;
    this.game_over();
   
   
    
}



    // var distX = Math.abs(p.x - this.x-this.width/2);
    // var distY = Math.abs(p.y - this.y-this.height/2);

    // if (distX > (this.width/2 + 20)) {  }
    // if (distY > (this.height/2 + 20)) { }

    // if (distX <= (this.width/2)) {console.log("Collision1") } 
    // if (distY <= (this.width/2)) { console.log("Collision2") }

    // var dx=distX-this.width/2;
    // var dy=distY-this.height/2;
    // if (dx*dx+dy*dy<=(20*20))
    // {
    //     console.log("Collision3")
    // }
}
    //     var circleDistancex = p.x - this.x;
    //     var circleDistancey = p.y - this.y;

    // if (circleDistancex > (this.width/2 + p.ball_size)) {  }
    // if (circleDistancey > (this.height/2 + p.ball_size)) {  }

    // if (circleDistancex <= (this.width/2)) { console.log("Collision by c1") } 
    // if (circleDistancey <= (this.height/2)) { console.log("Collision by c2") }

    // var cornerDistance_sq = (circleDistancex - this.width/2)* (circleDistancex - this.width/2)+
    //                         (circleDistancey - this.height/2)*(circleDistancey - this.height/2);

    // if(cornerDistance_sq <= (p.ball_size*p.ball_size))
    // {
    //     console.log("Collision by c3");
    //     cornerDistance_sq=-1;
    // }
        
    // if(this.x>=p.x-p.ball_size)
    //     if(p.y-p.ball_size<this.y+this.height&&p.y-p.ball_size>=this.y)
    //     console.log("Collision");
    
    }
    


var o=[];

// function animat() {
//     requestAnimationFrame(animat);
//     console.log("Hello");
    
// 
var ascent = 20;
var limit = 5000;
var start = null;
var no=0;

var theta=0,theta1=0;
var mouse={
    x:undefined,
    y:undefined
}
var rotation=false;
var clock_button=document.getElementById('clock');
var anticlock_button=document.getElementById('anticlock');



document.addEventListener('mousedown',
function onclick(event)
{
    
    if(event.x>wmax/2&&paused==false)
      p.action=1;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mouseup',
function onclick(event)
{
    
    if(event.x>wmax/2&&paused==false)
   
  p.action=0;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mousedown',
function onclick(event)
{
    
    if(event.x<wmax/2&&paused==false)
   
    p.action=2;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mouseup',
function onclick(event)
{
    
    if(event.x<wmax/2&&paused==false)
   
    p.action=0;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mousedown',
function onclick(event)
{
    if(final_exit)
    window.location.href="index.html";
    
    if(event.x<50&&event.y<50)
    {
        if(paused==false)
        togglePause();
        // else
        // paused=false;
    }
    if(event.x>630&&event.x<900&&event.y>330&&event.y<410&&paused==true&&final_exit==false)
    paused=false;
    
    if(event.x>630&&event.x<900&&event.y>430&&event.y<510&&paused==true&&final_exit==false)
    { 
        p=new player();
        o[0]=new obstacle();
        o[1]=new obstacle();
        o[2]=new obstacle();
        var first=new Date().getTime();
        paused=false;

    }
    if(event.x>630&&event.x<900&&event.y>530&&event.y<610&&paused==true&&final_exit==false)
    {
        window.location.href="index.html";

    }
   
    // mouse.x=event.x;
    // mouse.y=event.y;

});
// document.addEventListener('mousedown',
// function onclick(event)
// {
//     if(event.x>650&&event.x<700&&event.y>400&&event.y<450)
//     paused=false;
// });
// document.addEventListener('keydown', function (e) {
//     var key = e.keyCode;
//     if (key === 80)// p key
//     {
//         if (!paused)
//     {
//         paused = true;
//     } else if (paused)
//     {
//        paused= false;
//     }
        
//     }
//     });



// window.addEventListener('mousedown', function(event) { 
//     // simulating hold event
//     setTimeout(function() {
//         console.log("Hello");
//       // You are now in a `hold` state, you can do whatever you like!
//     }, 500);
//   }


// $('div').on('mousedown mouseup', function mouseState(e) {
//     if (e.type == "mousedown") {
//         //code triggers on hold
//         console.log("hold");
//     }
// });
o[0]=new obstacle();
o[1]=new obstacle();
o[2]=new obstacle();
var first=new Date().getTime();

function fly(timestamp) {
    
    if (start === null) {
        start = timestamp;
    }
    var progress = timestamp - start;
   
    // if(paused)
    // { return;}
    // var x=wmax/2+70*Math.sin(theta);
    // var y=600+70*Math.cos(theta);
    // var x1=wmax/2-70*Math.sin(theta);
    // var y1=600-70*Math.cos(theta);

   

    // var x2=800+50*Math.sin(theta1);
    // var y2=300+50*Math.cos(theta1);
    // var x3=800-50*Math.sin(theta1);
    // var y3=300-50*Math.cos(theta1);
    if(paused){first=new Date().getTime(); }
    if(paused==false)
    {
        
    
    var second=new Date().getTime();
    if(second-first>=2000)
    {   p.score+=1;
        first=new Date().getTime();
        p.increment_obs_speed(0.5);
        p.upward_motion(0.5);
    }
    
    c.clearRect(0,0,canvas.width,canvas.height);

    // c.beginPath();
    // c.arc(x,y,20,0,Math.PI*2,true);
    // c.strokeStyle='red';
    // c.stroke();

    // c.beginPath();
    // c.arc(x1,y1,20,0,Math.PI*2,true);
    // c.strokeStyle='red';
    // c.stroke();

    p.drawplayer();
    p.movement();

   
    // c.beginPath();
    // c.rect(o[0].x,o[0].y,o[0].width,o[0].height);
    // c.strokeStyle='red';
    // c.stroke();
    var max_obstacles=3;
   
    o[0].drawobstacle();
    o[0].movement();
    o[0].collision();
       if(o[0].y>=hmax)
    o[0]=new obstacle();
   
    
    
    // c.beginPath();
    // c.arc(x3,y3,20,0,Math.PI*2,true);
    // c.strokeStyle='red';
    // c.stroke();

  
//     if(p.action==1)
//    p.angle-=0.1;
//    else if(p.action==2)
//    p.angle+=0.1;
    

//    if(theta>=6.2) theta=0;
//    if(theta1<=0) theta=6.28;
c.fillStyle='gold';
c.font = "bold 36px Arial";
c.fillText("Score :"+p.score, canvas.width-200, 100);
c.beginPath();
c.moveTo(30,20);
c.lineTo(30,35);
c.moveTo(35,20);
c.lineTo(35,35);
c.strokeStyle='gold';
// c.rect(20,15,25,30);
c.stroke();

    }


    if (true) {
        requestAnimationFrame(fly);
    }
}
    
requestAnimationFrame(fly);




// function animate()
// {
//     requestAnimationFrame(animate);
   // c.beginPath();
//     c.arc(x,y,20,0,Math.PI*2,true);
//     console.log("Hello");
// c.strokeStyle='red';
// c.stroke();
// }