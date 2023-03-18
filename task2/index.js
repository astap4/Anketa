while (true) {
    yourString = prompt('Введите строку');
    if (yourString) {
        break
    } else {
        alert("Строка не может быть пустая!");
    }
}
alert(removeWhitespaces(yourString))

function removeWhitespaces(string) {
    let i = 0;
    let newString = '';
    do {
        newString = `#${string.slice(i+1)}`;
        i++;
    } while (string[i] === " ")

    i= newString.length;
    do {
        newString = `${newString.slice(0,i)}#`;
        i--;
    } while (newString[i] === " ")
    return newString
}


