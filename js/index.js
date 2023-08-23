// constants and variables
let input_direction = { x: 0, y: 0 };
const food_sound = new Audio("music/food.mp3");
const gameover_sound = new Audio("music/gameover.mp3");
const move_sound = new Audio("music/move.mp3");
const music_sound = new Audio("music/music.mp3");
const board = document.getElementById("board");
let speed = 8;
let score = 0;
let last_painttime = 0;
let snake_array = [
    { x: 15, y: 13 }
]

food = { fx: 10, fy: 7 }



//functions
function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - last_painttime) / 1000 < 1 / speed) {
        return false;
    }
    else {
        last_painttime = ctime;
        game_engine();
    }
}

function collide(snake) {

    for (let i = 1; i < snake_array.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function game_engine() {
    // part 1: update snake and food
    // part 2: display snake and  food

    
    // game over logic
    if (collide(snake_array)) {
        // document.getElementById("heading").style.innerHTML = "Game Over!";
        gameover_sound.play();
        music_sound.pause();
        input_direction = { x: 0, y: 0 };
        alert("Game Over!");
        music_sound.play();
        snake_array = [{ x: 15, y: 13 }];
        score = 0;
    }

    //if you have eaten the food
    if (snake_array[0].y === food.fy && snake_array[0].x === food.fx) {
        score += 1;
        if(score > max_score_val)
        {
            max_score_value = score;
            localStorage.setItem("max_score", JSON.stringify(max_score_value));
            high_score.innerHTML = "high score: " + max_score_value;

        }
        score_container.innerHTML = "score:" + score;
        food_sound.play();
        snake_array.unshift({ x: snake_array[0].x + input_direction.x, y: snake_array[0].y + input_direction.y });
        food = { fx: Math.round(2 + (14) * Math.random()), fy: Math.round(2 + (14) * Math.random()) };
    }


    //moving snake
    for (let i = snake_array.length - 2; i >= 0; i--) {

        snake_array[i + 1] = { ...snake_array[i] };
    }
    snake_array[0].x += input_direction.x;
    snake_array[0].y += input_direction.y;



    board.innerHTML = "";

    //displaying snake
    snake_array.forEach((e, index) => {
        snake_element = document.createElement('div');
        snake_element.style.gridRowStart = e.y;
        snake_element.style.gridColumnStart = e.x;
        if (index == 0) {
            snake_element.classList.add("head");
        }
        else {
            snake_element.classList.add("snake");
        }

        board.appendChild(snake_element);
    });

    //displaying food
    food_element = document.createElement('div');
    food_element.style.gridRowStart = food.fy;
    food_element.style.gridColumnStart = food.fx;
    food_element.classList.add("food");
    board.appendChild(food_element);

}


//logic
window.requestAnimationFrame(main);



music_sound.play();
let max_score = localStorage.getItem("max_score");
if(max_score == null)
{
    max_score_val = 0;
    localStorage.setItem("max_score", JSON.stringify(max_score_val));

}
else
{
    max_score_val = JSON.parse(max_score);
    high_score.innerHTML = "high score: " + max_score;

}

window.addEventListener("keydown", e => {
    input_direction = { x: 0, y: 1 };
    move_sound.play();
    music_sound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            input_direction.y = -1;
            input_direction.x = 0;

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            input_direction.y = 1;
            input_direction.x = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            input_direction.y = 0;
            input_direction.x = -1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            input_direction.y = 0;
            input_direction.x = 1;
            break;

        default:
            break;
    }

})




