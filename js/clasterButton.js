// получаем ссылки на элементы управления
var firstCanvas = document.getElementById('firstCanvas');
var clusterCountInput = document.getElementById('cluster-count');
var clearButtonC = document.getElementById('clear-buttonC');
var clusterButton = document.getElementById('cluster-button');

// создаем объект контекста для рисования на холсте
var ctxC = firstCanvas.getContext('2d');

// массив для хранения точек
var pointsC = [];

// функция для отрисовки точек
function drawPointsC() {
    // очищаем плоскость
    clearCanvasC();
    
    // отрисовываем каждую точку
    pointsC.forEach(function(point) {
        ctxC.beginPath();
        ctxC.fillStyle = point.color;
        ctxC.strokeStyle = 'black';
        ctxC.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctxC.fill();
        ctxC.stroke(); // рисуем границу точки
    });
}

// функция для очистки плоскости
function clearCanvasC() {
    ctxC.clearRect(0, 0, firstCanvas.width, firstCanvas.height);
}

// добавляем обработчик клика по холсту
firstCanvas.addEventListener("click", function(event) {
    // получаем координаты клика относительно плоскости
    var rect = firstCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // создаем новую точку и добавляем ее в список точек
    var point = {
        x: x,
        y: y,
        color: 'black' // задаем цвет точки
    };
    pointsC.push(point);
    // отрисовываем точки
    drawPointsC();
});

// добавляем обработчик клика по кнопке "Clear"
clearButtonC.addEventListener("click", function() {
    pointsC = [];
    clearCanvasC();
});

// обработчик клика на кнопке "Cluster"
clusterButton.addEventListener('click', function() {
    var clusterCount = parseInt(clusterCountInput.value);
    clusterPoints(clusterCount);
});