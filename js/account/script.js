
//Добавления левлго бокавого меню
let nav = new Left_nav({
    box: 'box',
    logo: 'IMSIT',
    footer: 'Выход',
    item:  {
        'Мой аккаунт': 'http://imsit/html/account/index.html',
        'Пользователи': 'http://imsit/html/users/index.html',
        'Назначенные мне заявки': 'http://imsit/html/assigned_request/index.html',
        'Актуальные заявки': 'http://imsit/html/actual_request/index.html',
        'Заявки': {
            'Подать заявку': 'http://imsit/html/request/request/index.html',
            'Мои заявки': 'http://imsit/html/request/my_request/index.html',
        }
    }
});
//---------------------------------------------------------------------------------------------

//Проверка доступа
function access (){
    let ajax = new Ajax();
    ajax.POST('../../php/account/script.php?access', function(data){
        switch (data) {
            case 'a':{
                location.href = `${this.origin}/html/error/access.html`;
                break;
            }
            case 'b':{
                location.href = `${this.origin}/html/error/access.html`;
                break;
            }
            case 's':{
                location.href = `${this.origin}/html/error/access.html`;
                break;
            }
            case 'd': {
                location.href = `${this.origin}/html/error/access.html`;
                break;
            }
        }
    });

}
//----------------------------------------------------------------------------------------------

//Кнопка редоктирования личных данных пользователя
let userDataUpdate = document.getElementById('userDataUpdate');
userDataUpdate.addEventListener('submit', function (e) {
    e.preventDefault();
    let ajax = new Ajax();
    ajax.parserForm('.udu');
    let formData = JSON.parse(ajax.jsonLine);
    if(formData.new_password_1 !== formData.new_password_2){
        showMessege('Введённые пароли не соответствуют друг другу')
    }else {
        ajax.POST('../../php/account/script.php?userDataUpdate', function (data) {
            let info = JSON.parse(data);
            let userData = document.querySelectorAll('.user-data tr');
            let infoArray = array(info);

            for(let i = 0; i < userData.length; i++){
                userData[i].lastElementChild.textContent = infoArray[i];
            }
        });
        let close = document.getElementById('close-modal-user-data').click();
    }
});
//---------------------------------------------------------------------------------------

//Авто загрузка личных данных пользователя
window.addEventListener('load', function (e) {
    let ajax = new Ajax();
    ajax.POST('../../php/account/script.php?load', function (data) {
        access();

        let info = JSON.parse(data);
        let userData = document.querySelectorAll('.user-data tr');
        let infoArray = array(info);

        for(let i = 0; i < userData.length; i++){
            userData[i].lastElementChild.textContent = infoArray[i];
        }
    });
    loadPhone();


});
//-------------------------------------------------------------------------------------

//Начальные данные модального окна
let openModalUserData = document.getElementById('open-modal-user-data');
openModalUserData.addEventListener('click', function () {
    let arr_1 = ['fio', 'email', 'login', 'newPassword_1', 'newPassword_2', 'message-box'];
    for (let i = 0; i < arr_1.length; i++) {
        let element = document.getElementById(arr_1[i]);
        if(element.id === 'message-box'){
            element.innerText = '';
        }
        else {
            element.value = null;
        }
    }

    let ajax = new Ajax();
    ajax.POST('../../php/account/script.php?modalInformationUser', function (data) {
        let dataInfo = JSON.parse(data)[0];
        let arr = ['fio', 'email', 'login'];
        for(let i = 0; i < arr.length; i++){
            let element = document.getElementById(arr[i]);
            switch (element.id) {
                case 'fio':
                    element.value = dataInfo['fio'];
                    break;
                case 'email':
                    element.value = dataInfo['email'];
                    break;
                case 'login':
                    element.value = dataInfo['login'];
                    break;
            }
        }
    });
});
//-----------------------------------------------------------------------------------

//Добавления нового контактного номера телефона
let createPhone = document.querySelector('#createPhone');
createPhone.addEventListener('submit', function (e) {
    e.preventDefault();
    let ajax = new Ajax();
    ajax.parserForm('.input-phone');
    ajax.POST('../../php/account/script.php?insertPhone', function (data) {
        let menu = document.querySelector('.dropdown-menu');
        while (menu.firstElementChild.classList.contains('item-phone')) {
            menu.removeChild(menu.firstElementChild);
        }
        loadPhone();
        let close = document.getElementById('close-create-phone').click();
    });
    let input = this.getElementsByTagName('input')[0].value = null;
});
//-----------------------------------------------------------------------------

//Удаления контактного номера телефона
let buttonPhone = document.querySelector('.delPhone');
buttonPhone.addEventListener('click', function () {
    if(this.value === 'default'){
        this.removeAttribute('data-target');
    }
    else {
        this.setAttribute('data-target', '#modalDeletePhone')
    }
});

let deletePhone = document.getElementById('okDeletePhone');
deletePhone.addEventListener('click', function () {
    let ajax = new Ajax();
    ajax.parserForm('.delPhone');
    ajax.POST('../../php/account/script.php?deletePhone', function () {
        let text = document.querySelector('.delPhone');
        let menu = document.querySelector('.dropdown-menu');
        while (menu.firstElementChild.classList.contains('item-phone')) {
            menu.removeChild(menu.firstElementChild);
        }
        loadPhone();
        text.innerText = 'Контактный номер телефона';
        text.value = 'default';
    })
});
//------------------------------------------------------------------------------

//Шаблон ввода номера телефона
let phone = document.querySelector('#createPhone #phone');
phone.addEventListener('keypress', function (e) {
    if(e.key >= 0 || e.key <= 9){
        if(this.value.length === 1){
            this.value += '(';
        }
        else if(this.value.length === 5){
            this.value += ')';
        }
        else if(this.value.length === 9){
            this.value += '-';
        }
        else if(this.value.length === 12){
            this.value += '-';
        }
        else if(this.value.length >= 15){
            e.preventDefault();
        }
    }
    else {
        e.preventDefault();
    }
});
//--------------------------------------------------------------------------------

/**
 * Предоставляет доступ к навигационному меню в соответствии с правами досткпа
 * @type {AccessLeftNav}
 */
let leftAccess = new AccessLeftNav('#box', '../../php/account/script.php?privilegeAccess');
//----------------------------------------------------------------------------------------

/**
 * @param data
 */
function showPhone(data) {
    let box = document.querySelector('#box-phone').children[0];
    box.innerText = data.innerText;
    box.value = data.value;
}
//---------------------------------------------------------------------------------

/**
 * Функция принимает обект и приобразовывает в масив
 * @param data
 * @returns {Array}
 */
function array(data) {
    if(data['privilege'] === 1){
        data['privilege'] = 'Клиент';
    }
    else if(data['privilege'] === 2){
        data['privilege'] = 'Тех. Специалист';
    }
    else if(data['privilege'] === 3){
        data['privilege'] = 'Администратор'
    }
    else {
        data['privilege'] = 'Проблемы с правами доступа';
    }
    let array = [];
    for (let item in data) {
        array[array.length] = data[item];
    }
    return array;
}
//---------------------------------------------------------------------------------------

/**
 * Отображения уведомления
 * @param text
 */
function showMessege(text) {
    let box = document.querySelector('#modalUserData .message-box');
    box.innerText = text;
    box.style.color = 'red';
}
//-----------------------------------------------------------------------------------------

/**
 * Загрузка номеров иелефона
 */
function loadPhone() {
    let loadPhone = new Ajax();
    loadPhone.POST('../../php/account/script.php?loadPhone', function (data) {
        let phone = JSON.parse(data);
        let box = document.querySelector('#box-phone .dropdown-menu');
        for (let i = 0; i < phone.length; i++) {
            let element = document.createElement('a');
            element.href = '#';
            element.className = 'dropdown-item item-phone';
            element.innerText = phone[i]['phone'];
            element.value = phone[i]['id'];
            box.insertBefore(element, box.children[0]);
            element.addEventListener('click', function () {
                showPhone(this);
            });
        }
    });
}
//----------------------------------------------------------------------------------------