// Elementos do DOM
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const dialogPonto = document.getElementById("dialog-ponto");
const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const btnRegistrarPonto = document.getElementById("btn-registrar");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const selectRegisterType = document.getElementById("register-type");
const btnDialogRegistrar = document.getElementById("btn-dialog-registrar");

// Variáveis globais
let locationUser = {};
let registersLocalStorage = getRegisterLocalStorage("register");

// Funções
function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        locationUser.lat = position.coords.latitude;
        locationUser.long = position.coords.longitude;
    });
}

function updateTime() {
    horaAtual.textContent = getCurrentTime();
    dialogHora.textContent = getCurrentTime();
}

function getCurrentTime() {
    const date = new Date();
    return twoHouses(date.getHours()) + ":" + twoHouses(date.getMinutes()) + ":" + twoHouses(date.getSeconds());
}

function getCurrentDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    return twoHouses(date.getDate()) + "/" + twoHouses(month) + "/" + date.getFullYear();
}

function getCurrentDay() {
    const date = new Date();
    const day = date.getDay();
    const dayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return dayNames[day];
}

function getObjectRegister(registerType) {
    return {
        date: getCurrentDate(),
        time: getCurrentTime(),
        location: locationUser,
        id: registersLocalStorage.length + 1,
        type: registerType,
    };
}

function twoHouses(x) {
    return String(x).padStart(2, '0');
}

function saveRegisterLocalStorage(key) {
    registersLocalStorage.push(key);
    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
}

function getRegisterLocalStorage(key) {
    const registers = localStorage.getItem(key);
    if(!registers) {
        return [];
    }
    return JSON.parse(registers);
}

function setRegisterType() {
    const lastType = localStorage.getItem("lastRegisterType") || "entrada";
    const nextType = {
        "entrada": "intervalo",
        "intervalo": "volta-intervalo",
        "volta-intervalo": "saida",
        "saida": "entrada"
    };
    selectRegisterType.value = nextType[lastType];
}

// Inicialização da página
diaSemana.textContent = getCurrentDay();
dataAtual.textContent = getCurrentDate();
dialogData.textContent = getCurrentDate();
dialogHora.textContent = getCurrentTime();
setRegisterType();
getUserLocation();

// Eventos
btnRegistrarPonto.addEventListener("click", () => {
    dialogPonto.showModal();
});

btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

btnDialogRegistrar.addEventListener("click", () => {
    const register = getObjectRegister(selectRegisterType.value);
    saveRegisterLocalStorage(register);
    localStorage.setItem("lastRegisterType", selectRegisterType.value);
    dialogPonto.close();
});

// Atualiza o tempo a cada segundo
updateTime();
setInterval(updateTime, 1000);

// Log de dados atuais
console.log(getCurrentDate());
console.log(getCurrentTime());
console.log(getCurrentDay());
