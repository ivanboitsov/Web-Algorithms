// функция для генерации случайного цвета
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// функция для кластеризации точек
function clusterPoints(clusterCount) {
    // генерируем случайные центры кластеров
    var centers = [];
    for (var i = 0; i < clusterCount; i++) {
        centers.push({
            x: Math.floor(Math.random() * firstCanvas.width),
            y: Math.floor(Math.random() * firstCanvas.height),
            color: getRandomColor()
        });
    }
    // создаем массив для хранения точек в каждом кластере
    var clusters = [];
    for (var j = 0; j < clusterCount; j++) {
        clusters.push([]);
    }
    var iterations = 10;
    for (var i = 0; i < iterations; i++) {
        // добавляем каждую точку в ближайший кластер
        pointsC.forEach(function(point) {
            var closestCenter = null;
            var closestDistance = Infinity;
            centers.forEach(function(center) {
                var distance = Math.sqrt(
                    Math.pow(point.x - center.x, 2) +
                    Math.pow(point.y - center.y, 2)
                );
                if (distance < closestDistance) {
                    closestCenter = center;
                    closestDistance = distance;
                }
            });
            if (closestCenter !== null) { // проверяем, что closestCenter существует
                clusters[centers.indexOf(closestCenter)].push(point);
            }
        });
        // перемещаем центры кластеров в центр масс точек
        centers.forEach(function(center, index) {
            if (clusters[index].length > 0) {
                var sumX = 0;
                var sumY = 0;
                clusters[index].forEach(function(point) {
                    sumX += point.x;
                    sumY += point.y;
                });
                center.x = sumX / clusters[index].length;
                center.y = sumY / clusters[index].length;
            }
        });
    }
    // закрашиваем точки цветами кластеров
    pointsC.forEach(function(point) {
        var closestCenter = null;
        var closestDistance = Infinity;
        centers.forEach(function(center) {
            var distance = Math.sqrt(
                Math.pow(point.x - center.x, 2) +
                Math.pow(point.y - center.y, 2)
            );
            if (distance < closestDistance) {
                closestCenter = center;
                closestDistance = distance;
            }
        });
        point.color = closestCenter.color;
    });
    drawPointsC();
}