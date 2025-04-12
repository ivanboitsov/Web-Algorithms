// получаем ссылки на элементы управления
var thirdCanvas = document.getElementById('thirdCanvas');
var antPopulationInput = document.getElementById('ant-population');
var itarateCnt = document.getElementById('iterate-count');
var clearButtonA = document.getElementById('clear-buttonA');
var startButton = document.getElementById('antAlgoritm-button');

// создаем объект контекста для рисования на холсте
var ctxA = thirdCanvas.getContext('2d');

// массив для хранения точек
var points = [];
// функция для очистки плоскости
function clearCanvasA() {
    ctxA.clearRect(0, 0, thirdCanvas.width, thirdCanvas.height);
}

// добавляем обработчик клика по холсту
thirdCanvas.addEventListener("click", function(event) {
    // проверяем количество точек
    if (points.length >= antPopulationInput.value) {
        alert("Maximum number of points reached!");
        return;
    }
    
    // получаем координаты клика относительно плоскости
    var rect = thirdCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // создаем новую точку и добавляем ее в список точек
    var point = {
        x: x,
        y: y,
        color: 'grey' // задаем цвет точки
    };
    points.push(point);
    // отрисовываем точки
    drawPointsA();
});

// добавляем обработчик клика по кнопке "Clear"
clearButtonA.addEventListener("click", function() {
    points = [];
    clearCanvasA();
});

// добавляем обработчик клика по кнопке "Start"
startButton.addEventListener("click", function(){
    // проверяем количество точек
    if (points.length < 2){
        alert("Need at least 2 points to start!");
        return;
    }

    // параметры генетического алгоритма
    var antPopulation = parseInt(antPopulationInput.value);
    var maxIterateCnt = parseInt(itarateCnt.value);
    // Коэффициенты для расчета вероятностей
    const alpha = 1;
    const beta = 2;
    
    // Коэффициенты для расчета количества феромонов
    const evaporationRate = 0.5;
    const pheromoneDeposit = 1;

    // Начальное количество феромонов
    const initialPheromoneLevel = 1;

    const distances = calculateDistances(points);
    
    // Расчет длины пути
    function calculatePathLength(path) {
      let length = 0;
    
      for (let i = 1; i < path.length; i++) {
        const from = path[i - 1];
        const to = path[i];
        length += distances[from][to];
      }
    
      const from = path[path.length - 1];
      const to = path[0];
      length += distances[from][to];
    
      return length;
    }
    
    // Инициализация феромонов
    let pheromones = [];
    
    for (let i = 0; i < distances.length; i++) {
      const row = [];
      for (let j = 0; j < distances.length; j++) {
        row.push(initialPheromoneLevel);
      }
      pheromones.push(row);
    }
    
    // Запуск алгоритма
    let bestPath = null;
    let bestPathLength = Number.MAX_SAFE_INTEGER;
    
    for (let iteration = 0; iteration < maxIterateCnt; iteration++) {
      const paths = [];
    
      // Генерация путей муравьев
      for (let ant = 0; ant < antPopulation; ant++) {
        let currentCity = Math.floor(Math.random() * distances.length);
        const path = [currentCity];
        
    
        for (let step = 0; step < distances.length - 1; step++) {
          const probabilities = [];
    
          for (let i = 0; i < distances.length; i++) {
            if (path.includes(i)) {
              probabilities.push(0);
            } else {
              const pheromoneLevel = pheromones[currentCity][i];
              const distance = distances[currentCity][i];
              const probability = Math.pow(pheromoneLevel, alpha) * Math.pow(1 / distance, beta);
              probabilities.push(probability);
            }
          }
        
          const sum = probabilities.reduce((acc, val) => acc + val, 0);
          const random = Math.random() * sum;
          let probabilitySum = 0;
          let nextCity = null;
        
          for (let i = 0; i < distances.length; i++) {
            if (path.includes(i)) {
              continue;
            }
        
            const probability = probabilities[i];
            probabilitySum += probability;
        
            if (probabilitySum >= random) {
              nextCity = i;
              break;
            }
          }
        
          path.push(nextCity);
          currentCity = nextCity;
        }
        
        paths.push(path);
      }
      // Расчет длины путей и поиск лучшего
      let localBestPath = null;
      let localBestPathLength = Number.MAX_SAFE_INTEGER;

      for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const length = calculatePathLength(path);
          if (length < localBestPathLength) {
              localBestPath = path;
              localBestPathLength = length;
            }
      }
      // Обновление феромонов
      for (let i = 0; i < pheromones.length; i++) {
          for (let j = 0; j < pheromones.length; j++) {
              pheromones[i][j] *= evaporationRate;
          }
      }
      
      for (let i = 1; i < localBestPath.length; i++) {
          const from = localBestPath[i - 1];
          const to = localBestPath[i];
          pheromones[from][to] += pheromoneDeposit / localBestPathLength;
      }
      
      const pathLength = calculatePathLength(localBestPath);
      
      if (pathLength < bestPathLength) {
          bestPath = localBestPath;
          bestPathLength = pathLength;
      }
      drawRouteA(bestPath, points);
  }
});