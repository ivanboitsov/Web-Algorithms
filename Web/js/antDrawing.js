// функция для отрисовки точек
function drawPointsA() {
    // очищаем плоскость
    clearCanvasA();
    
    // отрисовываем каждую точку
    points.forEach(function(point) {
        ctxA.beginPath();
        ctxA.fillStyle = point.color;
        ctxA.strokeStyle = 'black';
        ctxA.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctxA.fill();
        ctxA.stroke(); // рисуем границу точки
    });
}
function drawRouteA(route, points) {
    // Получаем элемент canvas и создаем 2D-контекст для рисования
    const thirdCanvas = document.getElementById('thirdCanvas');
    const ctxA = thirdCanvas.getContext('2d');

    // Начинаем новый путь (маршрут)
    ctxA.beginPath();

    // Перемещаем перо в начальную точку маршрута
    ctxA.moveTo(points[route[0]].x, points[route[0]].y);

    // Добавляем линию от текущей точки к каждой следующей точке маршрута
    for (let i = 1; i < route.length; i++) {
        ctxA.lineTo(points[route[i]].x, points[route[i]].y);
    }

    // Закрываем контур пути, соединяя последнюю точку маршрута с первой
    ctxA.lineTo(points[route[0]].x, points[route[0]].y);

    // Наносим маршрут на canvas
    ctxA.stroke();
}