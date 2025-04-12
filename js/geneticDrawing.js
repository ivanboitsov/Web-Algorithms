// функция для отрисовки точек
function drawPointsG() {
    // очищаем плоскость
    clearCanvasG();
    
    // отрисовываем каждую точку
    pointsG.forEach(function(point) {
        ctxG.beginPath();
        ctxG.fillStyle = point.color;
        ctxG.strokeStyle = 'black';
        ctxG.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctxG.fill();
        ctxG.stroke(); // рисуем границу точки
    });
}

function drawRouteB(route, points) {
    // Получаем элемент canvas и создаем 2D-контекст для рисования
    const secondCanvas = document.getElementById('secondCanvas');
    const ctxG = secondCanvas.getContext('2d');

    // Начинаем новый путь (маршрут)
    ctxG.beginPath();

    // Перемещаем перо в начальную точку маршрута
    ctxG.moveTo(points[route[0]].x, points[route[0]].y);

    // Добавляем линию от текущей точки к каждой следующей точке маршрута
    for (let i = 1; i < route.length; i++) {
        ctxG.lineTo(points[route[i]].x, points[route[i]].y);
    }

    // Закрываем контур пути, соединяя последнюю точку маршрута с первой
    ctxG.lineTo(points[route[0]].x, points[route[0]].y);

    // Наносим маршрут на canvas
    ctxG.stroke();
}


function drawGenerationRouteB(route, points, color) {
    // Получаем элемент canvas и создаем 2D-контекст для рисования
    const secondCanvas = document.getElementById('secondCanvas');
    const ctxG = secondCanvas.getContext('2d');
    
    // Начинаем новый путь (маршрут)
    ctxG.beginPath();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Перемещаем перо в начальную точку маршрута
    ctxG.moveTo(points[route[0]].x, points[route[0]].y);

    // Инициализируем переменную distance и устанавливаем ее значение равным 0
    let distance = 0;

    // Функция анимации отрисовки линии от точки до точки
    function animateLine() {
        // Устанавливаем цвет линии
        ctxG.strokeStyle = color;

        // Если расстояние, на которое была отрисована линия, меньше длины маршрута,
        // то продолжаем анимацию отрисовки линии
        if (distance < route.length - 1) {
        // Добавляем линию от текущей точки к следующей точке маршрута
        ctxG.lineTo(points[route[distance + 1]].x, points[route[distance + 1]].y);

        // Увеличиваем значение distance на 1
        distance++;

        // Наносим маршрут на canvas
        ctxG.stroke();

        // Запускаем следующий кадр анимации
        requestAnimationFrame(animateLine);
        }
    }

    // Запускаем анимацию отрисовки линии от точки до точки
    animateLine();
}


function drawGenerationB(population, distances) {
    const secondCanvas = document.getElementById('secondCanvas');
    const ctxG = secondCanvas.getContext('2d');
    const delay = 300; // задержка между отрисовкой линий, в миллисекундах

    // Draw routes
    for (let i = 0; i < population.length; i++) {
        setTimeout(() => { 
            drawGenerationRouteB(population[i], pointsG, 'rgba(128, 128, 128, 0.005)'); 
        }, delay * i); // задержка перед отрисовкой каждой линии
    }
}