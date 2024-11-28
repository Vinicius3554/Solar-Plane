// Variáveis para controlar o valor acumulado
let accumulatedShadowCoverage = 0; // Valor inicial para manter consistência
let accumulatedEconomy = 0;
let chanceOfCloudAppearance = 0;
let cloudComming = false;

// Função para gerar dados dentro de um intervalo
function generateRandomData(min, max, fixed = 2) {
    return (Math.random() * (max - min) + min).toFixed(fixed);
}

// Atualiza os dados de forma mais controlada
function updateData() {
    // Geração Instantanea (varia suavemente entre 0 e 0.3kwhs)
    const instantGeneration = generateRandomData(0, 0.3);
    document.getElementById('instant-generation').textContent = `${instantGeneration} kwhs`;

    // Economia monetária (sempre crescente)
    accumulatedEconomy += parseFloat(instantGeneration) * 0.01; // Incrementa com base na geração instantanea
    document.getElementById('economy').textContent = `R$ ${accumulatedEconomy.toFixed(3).toString().replace('.', ',')}`;

    // Irradiância Solar (variação menor entre 700 e 900 W/m²)
    const irradiance = generateRandomData(((100 - accumulatedShadowCoverage) + 10) * 10, ((100 - accumulatedShadowCoverage) + 50) * 10);
    document.getElementById('irradiance').textContent = `${irradiance} W/m²`;

    // Cobertura de sombra. 
    // Caso a chance de uma nuvem aparecer seja maior ou igual a 95%, ela aparece. 
    // Caso uma nuvem apareça, a cobertura de sombra aumenta de 10% em 10% até atingir 100%
    // E depois diminui de 10% em 10% até 0%. 
    // Esse efeito simula uma nuvem passando por cima do painel solar.
    chanceOfCloudAppearance = generateRandomData(0, 100);

    if (chanceOfCloudAppearance >= 95 && accumulatedShadowCoverage == 0) {
        cloudComming = true;
    }
    
    if (cloudComming && accumulatedShadowCoverage <= 99) {
        accumulatedShadowCoverage += 10;
    }

    document.getElementById('shadow-coverage').textContent = `${accumulatedShadowCoverage}%`;

    if (cloudComming && accumulatedShadowCoverage == 100) {
        cloudComming = false;
    }

    if (!cloudComming && accumulatedShadowCoverage > 0) {
        accumulatedShadowCoverage -= 10;
    }

    // Temperatura (varia entre 30 e 70);
    const temperature = generateRandomData(30, 70);
    document.getElementById('temperature').textContent = `${temperature}°C`;

    // Eficiência do sistema (variação entre 85% e 100%)
    const efficiency = generateRandomData(85, 100);
    document.getElementById('efficiency').textContent = `${efficiency}%`;
}

// Atualiza os dados a cada 2 segundos
setInterval(updateData, 2000);

// Timer do sistema
const timerElement = document.getElementById('uptime');

// Variáveis para armazenar horas, minutos e segundos
let hours = 0;
let minutes = 0;
let seconds = 0;

// Função para atualizar o contador
function updateTimer() {
    // Incrementar os segundos
    seconds++;
    if (seconds === 60) {
    seconds = 0;
    minutes++;
    }
    if (minutes === 60) {
    minutes = 0;
    hours++;
    }

    // Formatar o tempo como HH:MM:SS
    const formattedTime = 
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');

    // Atualizar o elemento na página
    timerElement.textContent = formattedTime;
}

 // Iniciar o contador
 setInterval(updateTimer, 1000);

window.onload = populateReport;
