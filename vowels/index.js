while (true) {
    yourString = prompt('Введите строку');
    if (yourString) {
        break
    } else {
        alert("Строка не может быть пустая!");
    }
}

function getNumberOfVowels(string) {
    const vowels = ['а', 'о', 'у', 'е', 'ё', 'ы', 'и', 'э', 'ю', 'я'];
    let number = 0;
    string = string.toLowerCase();
    for (let i = 0; i < string.length; i++) {
        if (vowels.includes(string[i])){     
            number++;
        }
    }
    return number;
}

console.log(getNumberOfVowels(yourString))