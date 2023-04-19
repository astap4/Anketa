const formDef1 =
    [
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
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

const formDef2 =
    [
        { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
        { label: 'Имя:', kind: 'longtext', name: 'firstname' },
        { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
        { label: 'Возраст:', kind: 'number', name: 'age' },
        { caption: 'Зарегистрироваться', kind: 'submit' },
    ];

const form1 = document.forms.Form1;
const form2 = document.forms.Form2;

function createForm(form, arr) {
    for (var elem of arr) {
        const newElement = document.createElement('div');
        newElement.classList.add('form-element')
        form.append(newElement)
        if (elem.label) {
            const labelElement = document.createElement('label');
            labelElement.textContent = elem.label;
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
                newElement.append(longtextInput)
                break;
            case 'number':
                const numberInput = document.createElement('input');
                numberInput.type = 'number';
                numberInput.name = elem.name;
                newElement.append(numberInput)
                break;
            case 'shorttext':
                const shorttextInput = document.createElement('input');
                shorttextInput.type = 'email';
                shorttextInput.name = elem.name;
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
                newElement.append(comboInput)
                break;
            case 'radio':
                const radioElements = document.createElement('div');
                radioElements.classList.add('radio-elem')
                elem.variants.forEach(element => {
                    const newRadio= document.createElement('input');
                    newRadio.type = 'radio';
                    newRadio.name = 'public';
                    newRadio.value = element.value;
                    const newRadioText= document.createElement('span');
                    newRadioText.textContent = element.text;
                    radioElements.append(newRadio)
                    radioElements.append(newRadioText)
                })
                newElement.append(radioElements)
                break;
            case 'check':
                const checkInput = document.createElement('input');
                checkInput.type = 'checkbox';
                checkInput.name = elem.name;
                checkInput.checked = true;
                newElement.append(checkInput)
                break;
            case 'memo':
                const descrInput = document.createElement('textarea');
                descrInput.name = elem.name;
                newElement.append(descrInput)
                break;
        }
    }
}

createForm(form1, formDef1)
createForm(form2, formDef2)