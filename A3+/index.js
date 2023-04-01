// Написать чистую функцию, проверяющую, что переданная ей фраза является палиндромом.
// (Палиндром - это фраза, которая слева направо читается так же как справа налево)
// Массивы при решении не использовать.
// При проверке должны игнорироваться:
//  - регистр букв;
//  - пробелы;
//  - знаки препинания;
//  - мягкие и твёрдые знаки;
//  - разница между буквами "е" и "ё".
// Спросить у пользователя строку. Вывести через alert сообщение "это палиндром" или "это не палиндром".

while (true) {
    yourString = prompt('Введите строку');
    if (yourString) {
        break
    } else {
        alert("Строка не может быть пустая!");
    }
}
alert(palindrom(yourString))

function palindrom(str) {
    str = str.toLowerCase();
    let newStr = ''
    for (let i = 0; i<str.length; i++){
        if(str[i]>='a'&& str[i]<='z'|| str[i]>='а'&& str[i]<='я'|| str[i]==='ё'){
            if (str[i] === 'ё'){
                newStr+= 'е';
            } else if (str[i] === 'ь'||str[i] === 'ъ'){
                newStr+= '';
            } else {
                newStr+= str[i]
            }
        }
    }
    for (let i = 0, j = newStr.length-1; i<newStr.length; i++, j--){
        if (newStr[i] !== newStr[j]){
            return "Это не палиндром"
        } 
    }
    return "Это палиндром";
}
