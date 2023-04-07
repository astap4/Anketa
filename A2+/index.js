while (true) {
    yourString = prompt('Введите строку');
    if (yourString) {
        break
    } else {
        alert("Строка не может быть пустая!");
    }
}
alert(`%${removeWhitespaces(yourString)}%`)

function removeWhitespaces(string) {
    let i = 0;
    let j = string.length - 1;
    if (string[0] === ' ') {    //Если нет пробела в начале - пропускаем цикл
        while (string[i] === " ") {
            i++;
        }
    }
    if (i === string.length) {   //Если строка состоит только из пробелов - возвращаем пустую строку после первого цикла
        return '';
    } else {
        if (string[j] === ' ') {   //Если нет пробела в конце - пропускаем цикл
            while (string[j] === " ") {
                j--;
            }
        }
        return string.slice(i, j + 1)
    }
}


