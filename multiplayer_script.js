var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var hmax=window.innerHeight;    
var wmax=window.innerWidth;
var c=canvas.getContext('2d');
var paused=false;
var high_score=[];
var attempts=0;
var player_no=1;
var player_score1=[];
var player_score2=[];
var p1_no=0,p2_no=0;
var switch_player=false;
var exit_value=false;
var final_exit=false;
var packet_life=false;
var powerup_counter=0;

function exit()
{
    var p1_total=0,p2_total=0;
    c.clearRect(0,0,wmax,hmax);
    c.font = "80px comic-sans-ms";
    c.strokeStyle='gold';
    c.strokeText("Scores", 600, 100);
    c.font = "50px sans-serif";
    c.fillStyle = "white";
    c.fillText("Player 1: ",50, 200);
    for(var i=0;i<p1_no;i++)
    {c.fillText(player_score1[i],300+50*i, 200);
    p1_total+=player_score1[i];
    }
    c.fillText("Player 2: ",50, 400);
    for(var i=0;i<p2_no;i++)
    {c.fillText(player_score2[i],300+50*i, 400);
        p2_total+=player_score2[i];
    }
    c.font = "75px sans-serif";
    c.fillStyle = "gold";
    c.fillText("Winner: ",400, 550);
    if(p1_total>p2_total)
    {
    c.fillStyle = "white";
    c.fillText("Player 1",700, 550);

    }
    else{
        c.fillStyle = "white";
        c.fillText("Player 2",700, 550);
    }
    c.font = "30px sans-serif";
    c.fillStyle = "gold";
    c.fillText("Click to exit ",700, 700);
    final_exit=true;

}
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
    c.fillText("Main Menu",650, 500);
    c.fillText("Exit",650, 600);

    

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
        this.speed=0.13;
        this.action=0;
        this.score=0;
        this.ball_size=20;
        this.radius=80;
        this.game=0;
        this.obstacle_speed=5;


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
class powerups{
    constructor()
    { this.x=wmax/2-90+Math.random()*140;
      this.y=0;
      this.type=1;
      this.initial_radius;
      this.initial_speed;
      
  }
  draw_powerup()
  {
      var img = new Image();
      img.width='20px';
      img.height='20px';
   if(this.type==1)
    {img.src = 'energy_drink.png';
    c.drawImage(img,this.x,this.y,50,50);
  }
    else if(this.type==2)
   { img.src='jetpack.png';
   c.drawImage(img,this.x,this.y,50,50);
  }
  //   document.body.appendChild(img);
     this.y+=5;


  }
  collision()
  {
      var closestX = clamp(p.x, this.x, this.x+this.width);
var closestY = clamp(p.x,this.y, this.y+this.height);

// Calculate the distance between the circle's center and this closest point
var distanceX = p.x - closestX;
var distanceY = p.y - closestY;

// If the distance is less than the circle's radius, an intersection occurs
var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
if (distanceSquared < (20 * 20)&&packet_life==true)
{   if(this.type==1)    
  {   this.initial_radius=p.radius;
      p.radius*=1.5;
      p.invincible=true;
      packet_life=false;
  }
  if(this.type==2)    
  {   this.initial_speed=p.speed;
      p.speed*=1.5;
      packet_life=false;
      
  }
  
  
}

  }
  destroy()
  {
      if(this.type==1)    
  {   p.radius=this.initial_radius;
      p.invincible=false;
      
  }
  if(this.type==1)    
  {  p.speed=this.initial_speed;
      
      
  }
  }
}
  

var packet=new powerups();
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
        exit_value=true;
        c.fillStyle = "gold";
        c.font = "100pt comic-sans-ms";
        c.strokeStyle='gold';
        c.strokeText("Game Over", 450, 250);
        c.font = "50pt sans-serif";
        
        c.fillText("Your Score is: "+p.score,550, 400);
        if(player_no==1)
        {
            player_score1[p1_no]=p.score;
            p1_no++;
            player_no=2;
        }
        else{
            player_score2[p2_no]=p.score;
            p2_no++;
            player_no=1;
        }
        setTimeout(function() {
            c.clearRect(0,0,wmax,hmax);
            c.font = "50pt sans-serif";
            c.fillStyle = "gold";
            c.fillText("Player "+player_no+"'s Turn",550,250);
            c.font = "20pt sans-serif";
            c.fillText("Click to Start",700, 350);
            c.fillText("Exit",50,50);
          }, 5000);
          switch_player=true;
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
    
    if(event.x>wmax/2&&switch_player==false)
      p.action=1;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mouseup',
function onclick(event)
{
    
    if(event.x>wmax/2&&switch_player==false)
   
  p.action=0;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mousedown',
function onclick(event)
{
    
    if(event.x<wmax/2&&switch_player==false)
   
    p.action=2;
    // mouse.x=event.x;
    // mouse.y=event.y;

});

document.addEventListener('mouseup',
function onclick(event)
{
    
    if(event.x<wmax/2&&switch_player==false)
   
    p.action=0;
    // mouse.x=event.x;
    // mouse.y=event.y;

});
// document.addEventListener('keydown',
// function (event)
// {
//     if(event.keyCode==13||event.which==13)
//    {    c.font = "100pt comic-sans-ms";
//         c.strokeStyle='gold';
//         c.strokeText("Over", 450, 250);
// }
// });

document.addEventListener('mousedown',
function onclick(event)
{
    if(final_exit)
    window.location.href="index.html";
    if(switch_player&&exit_value==false)
    {   
        
        p=new player();
        o[0]=new obstacle();
        o[1]=new obstacle();
        o[2]=new obstacle();
        var first=new Date().getTime();
        paused=false;
        switch_player=false;
        
        

    }
    if(event.x>20&&event.y>20&&event.x<80&&event.y<80&&switch_player&&exit_value&&final_exit==false)
        {  
            exit();
        }
      
    if(event.x<50&&event.y<50&&switch_player==false)
    {
        if(paused==false)
        togglePause();
        // else
        // paused=false;
    }
    if(event.x>630&&event.x<900&&event.y>330&&event.y<410&&paused==true&&switch_player==false)
    paused=false;
   
   
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
        
    // if(o[0].collision_count==1)
    // return;
    var second=new Date().getTime();
    if(second-first>=2000)
    {   p.score+=1;
        first=new Date().getTime();
        p.increment_obs_speed(0.5);
        p.upward_motion(0.5);
        var random_no=Math.random()*100;
        if(random_no>50&&random_no<55&&packet_life==false)
        {
            packet_life=true;
            packet.type=1;
        }
        else if(random_no>5&&random_no<10&&packet_life==false)
        {
            packet_life=true;
            packet.type=2;
        }
        if(packet_life)
        {   
            powerup_counter++;
        }

    }
    if(powerup_counter>=6)
    {
        packet.destroy();
        powerup_counter=0;
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
    if(packet_life)
    {packet.draw_powerup();
        packet.collision();
    }
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
    if(packet.y>=hmax)
    packet_life=false;
   
    
    
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
    c.font = "36px sans-serif";
    c.fillStyle = "gold";
    c.fillText("Player "+player_no,canvas.width-200,50);
c.fillStyle='gols';
c.font = "bold 36px Arial";
c.fillText("Score : "+p.score, canvas.width-200, 120);
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