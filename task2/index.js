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
    let j = string.length-1;
    while (string[i] === " ") {
        i++;
    }
    while (string[j] === " ") {
        j--;
    }
    return string.slice(i,j+1)
}


