do {
    yourString = prompt('Введите строку');
}
while (!yourString)

alert(getNumberOfVowels1(yourString) + ' гласных')
alert(getNumberOfVowels2(yourString) + ' гласных')
alert(getNumberOfVowels3(yourString) + ' гласных')

// С использованием forEach
function getNumberOfVowels1(string) {
    const vowels = ['а', 'о', 'у', 'е', 'ё', 'ы', 'и', 'э', 'ю', 'я'];
    let number = 0;
    string = string.toLowerCase().split('').forEach(element => {
        if (vowels.includes(element)) {
            number++;}
    });
    return number;
}
// С использованием filter
function getNumberOfVowels2(string) {
    const vowels = ['а', 'о', 'у', 'е', 'ё', 'ы', 'и', 'э', 'ю', 'я'];
    let arr = string.toLowerCase().split('').filter(item => vowels.includes(item))
    return arr.length;
}
// С использованием reduce
function getNumberOfVowels3(string) {
    const vowels = ['а', 'о', 'у', 'е', 'ё', 'ы', 'и', 'э', 'ю', 'я'];
    let arr = string.toLowerCase().split('').reduce((sum, current) => vowels.includes(current)? sum + 1 :sum, 0);
    return arr
}

