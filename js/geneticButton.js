// получаем ссылки на элементы управления
var secondCanvas = document.getElementById('secondCanvas');
var populationSizeInput = document.getElementById('population-size');
var geneticSizeInput = document.getElementById('genetic-count');
var clearButtonG = document.getElementById('clear-buttonG');
var geneticButton = document.getElementById('genetic-button');

// создаем объект контекста для рисования на холсте
var ctxG = secondCanvas.getContext('2d');

// массив для хранения точек
var pointsG = [];

// функция для очистки плоскости
function clearCanvasG() {
    ctxG.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
}

// добавляем обработчик клика по холсту
secondCanvas.addEventListener("click", function(event) {
    // проверяем количество точек
    if (pointsG.length >= populationSizeInput.value) {
        alert("Maximum number of points reached!");
        return;
    }
    
    // получаем координаты клика относительно плоскости
    var rect = secondCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // создаем новую точку и добавляем ее в список точек
    var point = {
        x: x,
        y: y,
        color: 'grey' // задаем цвет точки
    };
    pointsG.push(point);
    // отрисовываем точки
    drawPointsG();
});

// добавляем обработчик клика по кнопке "Clear"
clearButtonG.addEventListener("click", function() {
    pointsG = [];
    clearCanvasG();
});

// добавляем обработчик клика по кнопке "Start"
geneticButton.addEventListener("click", function(){
    // проверяем количество точек
    if (pointsG.length < 2){
        alert("Need at least 2 points to start!");
        return;
    }

    // параметры генетического алгоритма
    var populationSize = parseInt(populationSizeInput.value);
    var maxGenerations = parseInt(geneticSizeInput.value);
    var mutationRate = 0.01;

    const distances = calculateDistances(pointsG);
    const bestRoute = solveTSP(distances, populationSize, mutationRate, maxGenerations);
    drawRouteB(bestRoute, pointsG);
});