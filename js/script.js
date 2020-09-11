// 2день 36 мин

const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    //добавляем элемент и его класс
    car = document.createElement('div');
    car.classList.add('car');

    //обработчик событий onclick стырый 
// start.onclick = function(){
//     start.classList.add('hide');
// };

start.addEventListener('click', startGame);
//нажатие на любую клавишу вызывает функции
document.addEventListener('keydown', startRun);//нажатие
document.addEventListener('keyup', stopRun);//отпускание

//нужные клавиши
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
//параметры игры
const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}
//ф-я кол-во елементов в зависимости от высоты экрана
function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;

}

function startGame() {
    start.classList.add('hide');
//делаем линии дороги
//getQuantityElements(100) = кол-во линий в 100px
for (let i = 0; i < getQuantityElements(100); i++){
    //добавляем див
    const line = document.createElement('div');
    //доб стили
    line.classList.add('line');
    //расстояние между линиями
    line.style.top = (i*75) +'px';
    //доб свойство у
    line.y = i*100;
    //добавляем на экран
    gameArea.appendChild(line);
}
 
//добавляем авто соперники
for (let i = 0; i < getQuantityElements(100*setting.traffic); i++){
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    //расстояние между авто
    enemy.y = -150*setting.traffic*(i+1);
    //расстояние по горизонтали случайное целое от ширины дороги минус ширина машины
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    //расстояние от верха
    enemy.style.top = enemy.y + 'px';
    //меняем картинку соперников
    enemy.style.background = 'transparent url(../img/enemy2.png) center / cover no-repeat';
    //распологаем на арене
    gameArea.appendChild(enemy);

}

    setting.start = true;
    //добавляем дочерний элемент 'car' в 'gameArea'
    gameArea.appendChild(car);
    //свойство left по горизонтали и вертикали
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    //анимация современная 
    requestAnimationFrame(playGame);
}
//игра
function playGame(){

    
    if (setting.start /*=== true*/){
        moveRoad();//ф-я движения дороги
        moveEnemy();//ф-я движение машин
        //управление машиной по кнопкам влево и вправо плюс скорость
       // и услови не выхода за края дороги '&& setting.x > 0'
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
//при этом меняем параметр стилей left
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        //пока условие true функция перезапускается
        //перезапуск самой функции(рекурсия - функция запускает сама себя)
    requestAnimationFrame(playGame);
    }
    
}

//нажатие клавиши
function startRun(event) {
    event.preventDefault();//отключаем стандартное поведение кнопок
    // console.log(event.key);//key - клавиша нажата
//обращаемся к обьекту keys через[] тк возвращается строка из event
    keys[event.key] = true;
}
//отпускание клавиши
function stopRun(event) {
    event.preventDefault();//отключаем стандартное поведение кнопок
    // console.log(event.key);//key - клавиша нажата
    keys[event.key] = false;
}
//функция движение дороги
function moveRoad (){
    //получаем все линии
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        //позиция линии
    line.y += setting.speed;
    //меняем top
    line.style.top = line.y + 'px';
    //возврат линии
    if(line.y >= document.documentElement.clientHeight){
        line.y = -100;
    }
    });
}

function moveEnemy (){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if(item.y >= document.documentElement.clientHeight){
            item.y = -250 * setting.traffic;
            //меняем значение по горизонтали
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

    
}