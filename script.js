const canvas = document.querySelector('.canvas');
const ctx= canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale; // 25 rows
const columns = canvas.width / scale;// 25 columns

let snake=[];
snake[0]={
    x :0,
    y : (Math.floor(Math.random()*rows))*scale
}

let food = {
    x :(Math.floor(Math.random()*columns))*scale,
    y : (Math.floor(Math.random()*rows))*scale
}

let d = 'right';

document.onkeydown = direction;

function direction(e){

    let key = e.keyCode;

    if(key==37 && d!='right')
        d='left';
    else if(key==38 && d!='down')
        d='up';
    else if(key==39 && d!='left')
        d='right';
    else if(key==40 && d!='up')
        d='down';

}

//call the playgame function every 100ms
// this will redraw the snake every 100ms 
let playGame = setInterval(drawGame,100);

function drawGame(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
    }

    // draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x,food.y,scale,scale);


    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    // Depending upon the direction, update the snake position
    if (d == 'right') snakeX += scale;
    if (d == 'left') snakeX -= scale; 
    if (d == 'up') snakeY -= scale;
    if (d == 'down') snakeY += scale;

   
    if(snakeX>canvas.width)
       snakeX=0;
    if(snakeY>canvas.height)
       snakeY=0;
    if(snakeX<0)
       snakeX=canvas.width;
    if(snakeY<0)
       snakeY=canvas.height;


       // if the snake eats the food
    if(snake[0].x==food.x && snake[0].y==food.y){
        food={
            x:(Math.floor(Math.random()*columns))*scale,
            y:(Math.floor(Math.random()*rows))*scale
        }
    }
    else{
       snake.pop();// remove the last element
    }

    // create new head
    let newHead = {
        x:snakeX,
        y:snakeY
    }
    if(eatsSnake(newHead,snake)){
        clearInterval(playGame);
        alert('Game Over');
    }
    snake.unshift(newHead);// add the new head element

    }

    function eatsSnake(head,array){
        for(let i=0;i<array.length;i++){
            if(head.x==array[i].x && head.y==array[i].y)
                    return true;
            }
        return false;
    }

