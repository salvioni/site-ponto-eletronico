navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
})

const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const dialogPonto = document.getElementById("dialog-ponto");

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = getCurrentTime();

const btnRegistrarPonto = document.getElementById("btn-registrar")
btnRegistrarPonto.addEventListener("click", () => {
    dialogPonto.showModal();
})

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
})

const btnDialogEntrada = document.getElementById("btn-dialog-entrada");
btnDialogFechar.addEventListener("click", () => {
    console.log(getObjectRegister("entrada"));
});

const btnDialogSaida = document.getElementById("btn-dialog-saida");
btnDialogFechar.addEventListener("click", () => {
    console.log(getObjectRegister("saida"));
});

function updateTime() {
    horaAtual.textContent = getCurrentTime();
    dialogHora.textContent = getCurrentTime();
}

//Pega o dia e a data quando abre o site
diaSemana.textContent = getCurrentDay();
dataAtual.textContent = getCurrentDate();

let locationUser = {};

function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        let userLocation = {
            "lat": position.coords.latitude,
            "long": position.coords.longitude
        }
        locationUser = userLocation;
        console.log(locationUser);
    });
}

function getObjectRegister(registerType) {
    getUserLocation();

    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": locationUser,
        "id": 1,
        "type": registerType
    }
    return ponto;
}

//Retorna a hora atual formatada (hora:minuto:segundo)
function getCurrentTime() {
    const date = new Date()
    return twoHouses(date.getHours()) + ":" + twoHouses(date.getMinutes()) + ":" + twoHouses(date.getSeconds());
}

//Retorna a data atual formatada (dia/mês/ano)
function getCurrentDate() {
    const date = new Date()
    let month = date.getMonth() + 1
    return twoHouses(date.getDate()) + "/" + twoHouses(month) + "/" + date.getFullYear();
}

//Retorna o dia da semana atual formatada (Domingo)
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