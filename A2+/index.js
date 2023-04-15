yourString = prompt('Введите строку');

alert(`%${removeWhitespaces(yourString)}%`)

function removeWhitespaces(string) {
    let i = 0;
    let j = string.length - 1;
    if (i != ' ' && j != ' ') { //Если нет пробела ни в начале, нив  конце - позвращаем исходную строку
        return string;
    }
    if (string[0] === ' ') {    //Если нет пробела в начале - пропускаем цикл
        while (string[i] === " ") {
            i++;
        }
        if (i === string.length) {
            return '';                //Если строка состоит только из пробелов - возвращаем пустую строку после первого цикла
        }
    }
    if (string[j] === ' ') {   //Если нет пробела в конце - пропускаем цикл
        while (string[j] === " ") {
            j--;
        }    
    }
    return string.slice(i, j + 1)
}


