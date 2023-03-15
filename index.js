let firstName,
    lastName,
    middleName,
    age,
    ageInDays,
    futureAge,
    sex,
    isRetired;


while (true) {
    firstName = prompt('Введите ваше имя');
    if (isNaN(firstName)) {
        break
    } else {
        alert("Имя введено неверно!");
    }
}

while (true) {
    lastName = prompt('Введите вашу фамилию');
    if (isNaN(lastName)) {
        break
    } else {
        alert("Фамилия введена неверно!");
    }
}

while (true) {
    middleName = prompt('Введите ваше отчество');
    if (isNaN(middleName)) {
        break
    } else {
        alert("Отчество введено неверно!");
    }
}

while (true) {
    age = prompt('Введите ваш возраст');
    if (Number(age) && Number(age) > 0 && Number(age) < 100) {
        ageInDays = age * 365;
        futureAge = Number(age) + 5;
        break
    } else {
        alert("Возраст введен неверный!");
    }
}

sex = confirm("Ваш пол мужской?");
yourSex = (sex) ? 'мужской' : 'женский'; // мужской true, женский false

if (sex) {
    isRetired = (age >= 63) ? 'да' : 'нет';
} else {
    isRetired = (age >= 58) ? 'да' : 'нет';
}


alert(`ваше ФИО: ${lastName} ${firstName} ${middleName}
ваш возраст в годах: ${age}
ваш возраст в днях: ${ageInDays}
через 5 лет вам будет: ${futureAge}
ваш пол: ${yourSex}
вы на пенсии: ${isRetired}`); 