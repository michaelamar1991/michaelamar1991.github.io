//////////////////////////////////////
// --------------PONG-------------- //
//   PONG GAME BUILD EXAMPLE IN JS  //
//          Michael Amar            //
//      mik.amar91@gmail.com        //
//////////////////////////////////////

function gameOn()
{
// The canvas defenition
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
// The ball position defenition
    var x = canvas.width/2;
    var y = canvas.height-30;
// Ball step in each interval
    var dx = 2;
    var dy = -2;
// Ball radius
    var ballRadius = 7;
// Paddle defenitions
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
// Bricks defenitions
    var brickRowCount = 6;
    var brickColumnCount = 4;
    var brickWidth = 65;
    var brickHeight = 20;
    var brickPadding = 5;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
// Score & Lives variables set
    var score = 0;
    var lives = 3;
// Defines the bricks array and set them to "Live" status
    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
    }

// Movement handlers for key presses / mouse paddle control
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("touchmove" , touchMoveHandler, false);
    
    function keyDownHandler(e) // Detect when key is pressed
    {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) // Detect when key is released
    {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) // Detect mouse movements
    {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth/2;
        }
    }

    function touchMoveHandler(e) // Detect touch movements
    {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth/2;
        }
    }

    function collisionDetection() // Detect ball and brick collision
    {
        for(var c=0; c<brickColumnCount; c++) 
        {
            for(var r=0; r<brickRowCount; r++) 
            {
                var b = bricks[c][r];
                if(b.status == 1) 
                {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) 
                    {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                        }
                    }
                }
            }
        }
    }
      

    function drawBall() // Drawing the ball object
    {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() // Drawing the paddle object
    {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    function drawBricks() // Drawing the bricks objects
    {
        for(var c=0; c<brickColumnCount; c++) 
        {
            for(var r=0; r<brickRowCount; r++) 
            {
                if(bricks[c][r].status == 1) 
                {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawScore() // Drawing the score counter
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Score: "+score, 8, 20);
    }

    function drawLives() // Drawing the player lives amount
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    function draw() // Draw game board and clac the movements (Run in 10ms intervals)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

        if(y + dy < ballRadius) 
        {
            dy = -dy;
        }

        else if(y + dy > canvas.height-ballRadius) 
        {
            if(x > paddleX && x < paddleX + paddleWidth) 
            {
            dy = -dy;
            }
            else 
            {
                lives--;
                if(!lives) 
                {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else 
                {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) 
        {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) 
        {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    draw(); // Calling Draw() function to drawing the board and start the game!
}

