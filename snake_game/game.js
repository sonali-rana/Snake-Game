let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

//displaying ground on canvas

let ground = new Image();
ground.src="./Images/ground.jpg";

//size of box in pixel

let box = 32;

// snake object 

let snake = [];
snake[0]={
	x : 4*box,
	y : 7*box
}
// food image

let Apple = new Image();
Apple.src = "./Images/food.png";

let gameover =new Image();
gameover.src = "./Images/gameover.png";

//for score

let score=0;

//Highscore

let HighScore = localStorage.getItem("HighScore");

//Adding audio

let dead = new Audio();
dead.src="./audio/dead.mp3";

let eat = new Audio();
eat.src = "./audio/eat.mp3";

let l = new Audio();
l.src = "./audio/left.mp3";

let t = new Audio();
t.src = "./audio/up.mp3";

let r = new Audio();
r.src = "./audio/right.mp3";

let d = new Audio();
d.src = "./audio/down.mp3";

/*food object 
floor rounds of to no-1
random generates no bw 0-1*/

let foodo = {
	x : Math.floor(Math.random()*17 + 1)*box,
	y : Math.floor(Math.random()*15 + 3)*box 
}; 

let move;

//event listener

document.addEventListener("keydown",function(event)
{
	if(event.keyCode==37 && move !="right")
	{
		move = "left";
	}
	else if(event.keyCode==38 && move !="down")
	{
		move = "top";
	}
	else if(event.keyCode==39  && move !="left")
	{
		move = "right";
	}
	else if(event.keyCode==40 && move !="top")
	{
		move = "down";
	}
})

function draw(){
    for(let i=0;i<snake.length;i++){
    
        ctx.fillStyle = (i%2==0)?"#006400":"yellow";
    	ctx.fillRect(snake[i].x,snake[i].y, box,box);
    	ctx.strokeStyle="#000000";
    	ctx.strokeRect(snake[i].x,snake[i].y, box,box);
     } 

     //old position of snake

     let snakeX = snake[0].x;
     let snakeY = snake[0].y;

     if(move=="left")
     {  
     	l.play();
     	snakeX-=box;
     	
     }
     else if(move=="top")
     {
     	t.play();
     	snakeY-=box;

     }
     else if(move=="right")
     {
     	r.play();
        snakeX+=box;
     }
     else if(move=="down")
     {
     	d.play();
     	snakeY+=box;
     }
     
    //snake new head

     let newHead={
     	x : snakeX,
     	y : snakeY
     }
     if(snakeX==foodo.x && snakeY==foodo.y)
     {  eat.play(); 
     	score+=3;
     	foodo.x = Math.floor(Math.random()*17 + 1)*box;
	    foodo.y = Math.floor(Math.random()*15 + 3)*box; 
     }
     else
     {
     	snake.pop();
     }

     //collision detection

     function collision(head,array)
     {
     	for(let j=0 ; j<array.length ; j++)
     	{
     		if(head.x==array[j].x && head.y==array[j].y)
     		{
     			return true;
     		}
     	}
     	return false;
     }

     //Gameover logic

     if(snakeX < box || snakeX > box*17 || snakeY < box*3 || snakeY > box*17 || collision(newHead , snake))
     {
     	dead.play();
     	if(HighScore !== null){
            if (score > HighScore) {
                localStorage.setItem("HighScore", score);      
            }
        }
        else{
            localStorage.setItem("Highscore", 0);
        }
        clearInterval(game);
        ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200);
     }

     snake.unshift(newHead);
     ctx.fillStyle = "#ffffff";
     ctx.font = "40px impact";
     ctx.fillText(score,box*2.2,box*1.6);
     ctx.fillText(HighScore,box*16.2,box*1.6);
     ctx.font = "30px impact";
     ctx.fillText("HighScore :",box*10.2,box*1.6);
     ctx.drawImage(Apple,0,0,box,box,foodo.x,foodo.y,box,box);
} 
function loop(){

    ctx.drawImage(ground,0,0,608,608,0,0,608,608);
	draw();
 
}
let game = setInterval(loop,150);