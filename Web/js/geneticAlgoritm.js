function calculateDistances(points) {
    const distances = [];
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        row.push(distance);
        }
        distances.push(row);
    }
    return distances;
}

// Генерация случайной хромосомы
function generateRandomChromosome(length) {
    const chromosome = [];
    for (let i = 0; i < length; i++) {
        chromosome.push(i);
    }
    for (let i = length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chromosome[i], chromosome[j]] = [chromosome[j], chromosome[i]];
    }
    return chromosome;
}

// Вычисление длины маршрута для хромосомы
function calculateRouteLength(chromosome, distances) {
    let length = 0;
    const chromosomeLength = chromosome.length;
    for (let i = 0; i < chromosomeLength; i++) {
        const fromCity = chromosome[i];
        const toCity = chromosome[(i + 1) % chromosomeLength];
        length += distances[fromCity][toCity];
    }
    return length;
}

// Создание начальной популяции
function createInitialPopulation(populationSize, chromosomeLength) {
    const population = [];
    for (let i = 0; i < populationSize; i++) {
        const chromosome = generateRandomChromosome(chromosomeLength);
        population.push(chromosome);
    }
    return population;
}

// Выбор родителей с помощью турнира
function selectParent(population, distances) {
    const populationSize = population.length;
    const tournamentSize = 10;
    let bestFitness = Infinity;
    let bestChromosome = null;
    for (let i = 0; i < tournamentSize; i++) {
        const randomIndex = Math.floor(Math.random() * populationSize);
        const chromosome = population[randomIndex];
        const fitness = calculateRouteLength(chromosome, distances);
        if (fitness < bestFitness) {
            bestFitness = fitness;
            bestChromosome = chromosome;
        }
    }
    return bestChromosome;
}
// Оператор кроссинговера (одноточечный)
function crossover(parent1, parent2) {
    const chromosomeLength = parent1.length;
    const crossoverPoint = Math.floor(Math.random() * chromosomeLength);
    const child = Array(chromosomeLength).fill(-1);
    for (let i = crossoverPoint; i < crossoverPoint + chromosomeLength; i++) {
        const j = i % chromosomeLength;
        child[j] = parent1[j];
    }
    for (let i = 0; i < chromosomeLength; i++) {
        if (child[i] === -1) {
            const usedCities = {};
            for (let j = 0; j < chromosomeLength; j++) {
                const city = parent2[j];
                if (!usedCities[city]) {
                    child[i] = city;
                    usedCities[city] = true;
                    break;
                }
            }
        }
    }
    return child;
}

// Оператор мутации (обмен двух генов)
function mutate(chromosome, mutationRate) {
    if (Math.random() < mutationRate) {
        const chromosomeLength = chromosome.length;
        const i = Math.floor(Math.random() * chromosomeLength);
        let j = Math.floor(Math.random() * chromosomeLength);
        // Проверка, что j не равно i
        while (j === i) {
                j = Math.floor(Math.random() * chromosomeLength);
        }
        [chromosome[i], chromosome[j]] = [chromosome[j], chromosome[i]];
    }
    return chromosome;
}
// Генетический алгоритм для решения задачи коммивояжера
function solveTSP(distances, populationSize, mutationRate, maxGenerations) {
    const chromosomeLength = distances.length;
    let population = createInitialPopulation(populationSize, chromosomeLength);
    let bestFitness = Infinity;
    let bestChromosome = null;
    for (let generation = 0; generation < maxGenerations; generation++) {
        drawGenerationB(population, distances);
        const newPopulation = [];
        for (let i = 0; i < populationSize; i++) {
            const parent1 = selectParent(population, distances);
            const parent2 = selectParent(population, distances);
            const child = crossover(parent1, parent2);
            mutate(child, mutationRate);
            const fitness = calculateRouteLength(child, distances);
            newPopulation.push(child);
            if (fitness < bestFitness) {
                bestFitness = fitness;
                bestChromosome = child.slice();
            }
        }
        population = newPopulation;
    }   
return bestChromosome;
}