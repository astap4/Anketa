const formDef1 =
    [
        { label: 'Разработчики:', kind: 'longtext', name: 'developers' },
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
        { label: 'Дата запуска сайта:', kind: 'date', name: 'launchdate' },
        { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
        { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
        },
        { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
        { label: 'Описание сайта:', kind: 'memo', name: 'description' },
        { caption: 'Опубликовать', kind: 'submit' },
    ];

const formTag = document.forms.Form1;
createForm(formTag, formDef1)
formTag.addEventListener('submit', validateInfoForm, false);

function createForm(form, arr) {
    for (var elem of arr) {
        const newElement = document.createElement('div');
        newElement.classList.add('form-element')
        form.append(newElement)
        if (elem.label) {
            const labelElement = document.createElement('label');
            labelElement.textContent = elem.label;
            labelElement.classList.add(elem.name)
            newElement.append(labelElement)
        }
        if (elem.caption) {
            const BtnSubmit = document.createElement('input');
            BtnSubmit.type = elem.kind;
            BtnSubmit.value = elem.caption;
            newElement.append(BtnSubmit)
        }
        switch (elem.kind) {
            case 'longtext':
                const longtextInput = document.createElement('input');
                longtextInput.type = 'text';
                longtextInput.name = elem.name;
                longtextInput.required = true;
                longtextInput.addEventListener('blur', () => {
                    validateTextInput(longtextInput)
                });
                if (longtextInput.name === 'siteurl') {
                    longtextInput.addEventListener('blur', () => {
                        validateURL(longtextInput)
                    });
                }
                newElement.append(longtextInput)

                break;
            case 'number':
                const numberInput = document.createElement('input');
                numberInput.type = 'number';
                numberInput.name = elem.name;
                numberInput.required = true;
                numberInput.addEventListener('blur', () => {
                    validateNumInput(numberInput)
                });
                newElement.append(numberInput)
                break;
            case 'date':
                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.name = elem.name;
                dateInput.required = true;
                dateInput.addEventListener('blur', () => {
                    validateDate(dateInput)
                });
                newElement.append(dateInput)
                break;
            case 'shorttext':
                const shorttextInput = document.createElement('input');
                shorttextInput.type = 'email';
                shorttextInput.name = elem.name;
                shorttextInput.required = true;
                shorttextInput.addEventListener('blur', () => {
                    validateEmail(shorttextInput)
                });
                newElement.append(shorttextInput)
                break;
            case 'combo':
                const comboInput = document.createElement('select');
                comboInput.name = elem.name;
                elem.variants.forEach(element => {
                    const newOption = document.createElement('option');
                    newOption.value = element.value;
                    newOption.textContent = element.text;
                    comboInput.append(newOption)
                });
                comboInput.addEventListener('change', () => {
                    validateCombo(comboInput)
                });
                comboInput.required = true;
                newElement.append(comboInput)
                break;
            case 'radio':
                const radioElements = document.createElement('div');
                radioElements.classList.add('radio-elem')
                elem.variants.forEach(element => {
                    const newRadio = document.createElement('input');
                    newRadio.type = 'radio';
                    newRadio.name = 'radioName';
                    newRadio.value = element.value;
                    const newRadioText = document.createElement('span');
                    newRadioText.textContent = element.text;
                    newRadio.addEventListener('change', () => {
                        validateRadio(newRadio.value)
                    });
                    radioElements.append(newRadio)
                    radioElements.append(newRadioText)
                })
                newElement.append(radioElements)
                break;
            case 'check':
                const checkInput = document.createElement('input');
                checkInput.type = 'checkbox';
                checkInput.name = elem.name;
                checkInput.addEventListener('change', () => {
                    validateCheckInput(checkInput)
                });
                newElement.append(checkInput)
                break;
            case 'memo':
                const descrInput = document.createElement('textarea');
                descrInput.name = elem.name;
                descrInput.addEventListener('blur', () => {
                    validateDescription(descrInput)
                });
                newElement.append(descrInput)
                break;
        }
    }
    const allElements = document.querySelectorAll('.form-element')
    allElements.forEach((element) => {
        const inputError = document.createElement('span');
        inputError.classList.add('error');
        element.append(inputError)
    })
}

function validateTextInput(inputElem) {
    //если поле пустое или содержит более 30 символов
    const inputError = inputElem.nextSibling
    const inputValue = inputElem.value.trim();
    if (inputValue === '' || inputValue.length > 30) {
        (inputValue.length > 30) ? inputError.textContent = 'Слишком длинное имя' : inputError.textContent = 'Поле должно быть заполнено'
        inputElem.classList.add('input-error')
        return false;
    } else {
        inputError.textContent = '';
        inputElem.classList.remove('input-error');
        return true;
    }
}

function validateURL(inputElem) {
    //если поле не начинается с протокола, такого как http:// или https:// или пустое
    const inputError = inputElem.nextSibling;
    const inputValue = inputElem.value.trim();
    if (inputValue === '') {
        inputError.textContent = 'Поле должно быть заполнено'
        return false;
    } else if (!inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
        inputError.textContent = 'Должен начинаться с http:// или https://'
        inputElem.classList.add('input-error')
        return false;
    } else {
        inputError.textContent = '';
        inputElem.classList.remove('input-error')
        return true;
    }
}

function validateDate(inputElem) {
    //год указан не в промежутке 1980-2023 или пустое поле
    const inputError = inputElem.nextSibling;
    const inputValue = inputElem.value.trim();
    if (inputElem.checkValidity()) {
        const year = inputElem.valueAsDate.getFullYear();
        if (year < 1980 || year > 2023) {
            inputError.textContent = 'Неверно указан год'
            inputElem.classList.add('input-error')
            return false;
        } else {
            inputError.textContent = '';
            inputElem.classList.remove('input-error')
            return true;
        }
    } else {
        inputError.textContent = 'Поле должно быть заполнено'
        return false;
    }
}

function validateNumInput(inputElem) {
    //число меньше 1 или пустое поле
    const inputError = inputElem.nextSibling;
    if (!inputElem.checkValidity()) {
        inputError.textContent = 'Поле должно быть заполнено'
        return false;
    } else if (inputElem.value < 1) {
        inputError.textContent = 'Неверно указано количество'
        inputElem.classList.add('input-error')
        return false;
    } else {
        inputError.textContent = '';
        inputElem.classList.remove('input-error')
        return true;
    }
}

function validateEmail(inputElem) {
    //email не содержит @ или пустое поле
    const inputError = inputElem.nextSibling;
    const email = inputElem.value.trim();
    if (email === '') {
        inputError.textContent = 'Поле должно быть заполнено';
        inputElem.classList.add('input-error');
        return false;
    } else if (!email.includes('@')) {
        inputError.textContent = 'Неверно указан email';
        inputElem.classList.add('input-error');
        return false;
    } else if (!inputElem.checkValidity()) {
        inputError.textContent = 'Неверно указан email';
        inputElem.classList.add('input-error');
        return false;
    } else {
        inputError.textContent = '';
        inputElem.classList.remove('input-error');
        return true;
    }
}

function validateCombo(inputElem) {
    //нельзя выбрать значение здоровье
    const inputError = inputElem.nextSibling;
    if (inputElem.value === '1') {
        inputError.textContent = 'Нельзя выбрать здоровье';
        return false;
    } else {
        inputError.textContent = '';
        return true;
    }
}

function validateRadio(inputValue) {
    //нельзя выбрать значение бесплатное
    const radioElements = document.querySelector('.radio-elem')
    const inputError = radioElements.nextSibling;
    if (inputValue === '') {
        inputError.textContent = 'Нужно что-то выбрать';
        return false;
    } else if (inputValue === '1') {
        inputError.textContent = 'Нельзя выбрать бесплатное';
        return false;
    } else {
        inputError.textContent = '';
        return true;
    }
}

function validateCheckInput(inputElem) {
    //должно быть выбрано разрешить отзывы
    const inputError = inputElem.nextSibling;
    if (!inputElem.checked) {
        inputError.textContent = 'Нужно разрешить отзывы';
        return false;
    } else {
        inputError.textContent = '';
        return true;
    }
}

function validateDescription(inputElem) {
    //поле должно содержать более 20 символов
    const inputError = inputElem.nextSibling
    const inputValue = inputElem.value.trim();
    if (inputValue === '') {
        inputError.textContent = 'Поле должно быть заполнено';
        inputElem.classList.add('input-error')
        return false;
    } else if (inputValue.length < 20) {
        inputError.textContent = 'Слишком короткое описание';
        inputElem.classList.add('input-error')
        return false;
    } else {
        inputError.textContent = '';
        inputElem.classList.remove('input-error')
        return true;
    }
}


function validateInfoForm(eo) {
    eo = eo || window.event;
    try {
        const formTag = document.forms.Form1;

        const devField = formTag.elements.developers;
        const siteNameField = formTag.elements.sitename;
        const siteURLField = formTag.elements.siteurl;
        const dateField = formTag.elements.launchdate;
        const numField = formTag.elements.visitors;
        const emailField = formTag.elements.email;
        const comboField = formTag.elements.division;
        const radioField = formTag.elements.radioName;
        const radioValue = radioField.value;
        const checkField = formTag.elements.votes;
        const descrField = formTag.elements.description;

        validateTextInput(devField);
        validateTextInput(siteNameField);
        validateURL(siteURLField);
        validateDate(dateField);
        validateNumInput(numField);
        validateEmail(emailField);
        validateCombo(comboField);
        validateRadio(radioValue);
        validateDescription(descrField)
        validateCheckInput(checkField)

        if (!validateTextInput(devField)) {
            devField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateTextInput(siteNameField)) {
            siteNameField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateURL(siteURLField)) {
            siteURLField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateDate(dateField)) {
            dateField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateNumInput(numField)) {
            numField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateEmail(emailField)) {
            emailField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateCombo(comboField)) {
            comboField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateRadio(radioValue)) {
            radioField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateCheckInput(checkField)) {
            checkField.focus();
            eo.preventDefault();
            return;
        }
        if (!validateDescription(descrField)) {
            descrField.focus();
            eo.preventDefault();
            return;
        }
        // валидация успешная - форма будет отправлена на сервер
    }
    catch (ex) {
        console.log(ex);
        alert('Извините, что-то пошло не так, неожиданный сбой! Пересмотрите заполнение формы, возможно, это всё из-за вас!');
        eo.preventDefault(); // что-то пошло не так - считаем что валидация не прошла
    }
}