const diaSemana = document.getElementById("dia-semana")
const dataAtual = document.getElementById("data-atual")
const horaAtual = document.getElementById("hora-atual")


function updateContent() {
    diaSemana.textContent = getCurrentDay();
    dataAtual.textContent = getCurrentDate();
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
    return daynames[day]
}

//Retorna o numero colocado garantindo que tem duas casas decimais
function twoHouses(number) {
    if (number < 10) {
        return "0" + number
    } else {
        return number
    }
}


setInterval(updateContent, 1000)

console.log(getCurrentDate());
console.log(getCurrentTime());
console.log(getCurrentDay());