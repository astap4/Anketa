// Разработать класс HashStorageFunc в функциональном стиле
function HashStorageFunc() {
    const storage = {};
    this.addValue = function (key, value) {
        storage[key] = value;
    }
    this.getValue = function (key) {
        if (key in storage) {
            return storage[key];
        }
        return undefined;
    }
    this.deleteValue = function (key) {
        if (key in storage) {
            return delete storage[key]
        }
        return false;
    }
    this.getKeys = function () {
        return Object.keys(storage);
    }
}

// класс HashStorageClass описать в ES6-стиле (ключевым словом class);
class HashStorageClass {
    #storage = {};
    storage = {};
    constructor() {
        this.#storage = {};
        this.storage = {};
    }
    addValue(key, value) {
        this.#storage[key] = value; 
    }
    getValue() {
        if (key in this.#storage) {
            return this.#storage[key];
        }
        return false;
    }
    deleteValue() {
        if (key in this.#storage) {
            return delete this.#storage[key]
        }
        return false;
    }
    getKeys() {
        return Object.keys(this.#storage);
    }   
}

// Создать объект drinkStorage класса HashStorageFunc
const drinkStorage = new HashStorageFunc();
drinkStorage.addValue('viskey', { price: 30, volume: 750, strength: 40 });
drinkStorage.addValue('martini', { price: 20, volume: 1000, strength: 20 });
drinkStorage.addValue('rom', { price: 25, volume: 500, strength: 40 });

// Функции кнопки
function saveDrink() {
    while (true) {
        var drinkName = prompt('Введите название напитка');
        if (drinkName) {
            break;
        } else {
            alert('Поле "название напитка" не может быть пустым!');
        }
    }
    const drinkPrice = prompt('Цена напитка, $');
    const drinkVolume = prompt('Объем, мл');
    const drinkStrength = prompt('Крепость, %');
    drinkStorage.addValue(drinkName, { price: drinkPrice, volume: drinkVolume, strength: drinkStrength });
}

function getDrink() {
    const drinkName = prompt('Введите название напитка');
    const getInfo = drinkStorage.getValue(drinkName)
    if (!getInfo) {
        alert('Такого напитка нет')
    } else {
        const info = document.querySelector('.info')
        info.innerHTML = `<li>Название: ${drinkName}</li>
        <li>Цена: ${getInfo.price} $</li>
        <li>Объем: ${getInfo.volume} мл</li>
        <li>Крепость: ${getInfo.strength} %</li>`
    }
}

function deleteDrink() {
    const drinkName = prompt('Введите название напитка');
    const deleted = drinkStorage.deleteValue(drinkName)
    if (!deleted) {
        alert('Такого напитка нет')
    } else {
        alert('Напиток удален')
    }
}

function getAllDrinks() {
    const keys = drinkStorage.getKeys();
    const info = document.querySelector('.info')
    info.innerHTML = '';
    keys.forEach(element => {
        info.innerHTML += `<li>Название: ${element}</li>`
    });
}

