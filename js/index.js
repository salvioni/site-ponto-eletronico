const diaSemana = document.getElementById("dia-semana")
const dataAtual = document.getElementById("data-atual")
const horaAtual = document.getElementById("hora-atual")
const btnRegistrarPonto = document.getElementById("btn-registrar")

btnRegistrarPonto.addEventListener("click", register);

diaSemana.textContent = getCurrentDay();
dataAtual.textContent = getCurrentDate();

function register() {
    alert("Bateu Ponto.");
}

function updateTime() {
    horaAtual.textContent = getCurrentTime();
}

//Retorna a hora atual (hora:minuto:segundo)
function getCurrentTime() {
    const date = new Date()
    return twoHouses(date.getHours()) + ":" + twoHouses(date.getMinutes()) + ":" + twoHouses(date.getSeconds());
}

//Retorna a data atual (dia/mês/ano)
function getCurrentDate() {
    const date = new Date()
    let month = date.getMonth() + 1
    return twoHouses(date.getDate()) + "/" + twoHouses(month) + "/" + date.getFullYear();
}

//Retorna o dia da semana atual (Domingo)
function getCurrentDay() {
    const date = new Date()
    const day = date.getDay()
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"]
    return daynames[day];
}

//Retorna a função colocada como string garantindo que tem duas casas decimais
function twoHouses(x) {
   return String(x).padStart(2, '0');
}

updateTime();
setInterval(updateTime, 1000)

console.log(getCurrentDate());
console.log(getCurrentTime());
console.log(getCurrentDay());

