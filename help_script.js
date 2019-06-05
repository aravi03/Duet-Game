var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var hmax=window.innerHeight;    
var wmax=window.innerWidth;
var c=canvas.getContext('2d');
var paused=false;
var ascent = 20;
var limit = 5000;
var start = null;
var no=0;

class player{
    constructor()
    {   this.angle=1.57;
        this.height=600;
        this.x=wmax/2+70*Math.sin(this.angle);
        this.y=this.height+70*Math.cos(this.angle);
        this.x1=wmax/2-70*Math.sin(this.angle);
        this.y1=this.height-70*Math.cos(this.angle);
        this.speed=0.1;
        this.action=0;
        this.score=0;
        this.ball_size=20;
        this.radius=70;
        this.game=0;
        this.obstacle_speed=3;


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
var paused=false;

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
    if(event.x>20&&event.y>20&&event.x<80&&event.y<80&&paused==false)
        {  
            window.location.href="index.html";
        }
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
    // if(paused){first=new Date().getTime(); }
    if(paused==false)
    {
        
        
        
     
        // var second=new Date().getTime();
    // if(second-first>=2000)
    // {   p.score+=1;
    //     first=new Date().getTime();
    //     p.increment_obs_speed(0.01);
    //     p.upward_motion(0.05);
    // }
    
    c.clearRect(0,0,canvas.width,canvas.height);

    // c.beginPath();
    // c.arc(x,y,20,0,Math.PI*2,true);
    // c.strokeStyle='red';
    // c.stroke();

    // c.beginPath();
    // c.arc(x1,y1,20,0,Math.PI*2,true);
    // c.strokeStyle='red';
    // c.stroke();
    c.fillStyle='white';
    c.font = "bold 20px Arial";
    c.fillText("Press on the left side of the screen for anti-clockwise rotation",50, 200);
    c.fillText("Press on the right side of the screen for clockwise rotation",wmax/2, 200);
    c.fillText("Avoid obstacles coming from the top",600, 400);
    c.fillStyle='gold';
    c.fillText("All the best",700, 500);
    c.fillStyle='gold';
    c.fillText("Exit",50,50);
    p.drawplayer();
    p.movement();

   
    // c.beginPath();
    // c.rect(o[0].x,o[0].y,o[0].width,o[0].height);
    // c.strokeStyle='red';
    // c.stroke();
    // var max_obstacles=3;
   
    // o[0].drawobstacle();
    // o[0].movement();
    // o[0].collision();
    //    if(o[0].y>=hmax)
    // o[0]=new obstacle();
   
    
    
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


    }


    if (true) {
        requestAnimationFrame(fly);
    }
}
    
requestAnimationFrame(fly);