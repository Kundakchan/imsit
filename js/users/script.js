let nav = new Left_nav({
    box: 'box',
    logo: 'IMSIT',
    footer: 'Выход',
    item: {
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


/**
 * Авто загрузка содержимого страници
 */
window.addEventListener('load', function () {
    access();
    loadUserData();
});
//----------------------------------------------------------------------------------------

/**
 * Предоставляет доступ к навигационному меню в соответствии с правами досткпа
 * @type {AccessLeftNav}
 */
let leftAccess = new AccessLeftNav('#box', '../../php/users/script.php?privilegeAccess');
//----------------------------------------------------------------------------------------

//Вызов окна модификации данных пользователей
let tbody = document.querySelector('.users-information tbody');
tbody.addEventListener('dblclick', function (event) {
    let td = event.target;
    let item = td.parentElement;
    if(item.tagName !== 'TR'){
        return;
    }
    $('#modalUsersUpdate').modal();

    loadEdit(item.children[0].textContent);
});
//----------------------------------------------------------------------------------------








function loadEdit(id) {
    let user = {
        'id':id
    };
    let ajax = new Ajax();
    ajax.jsonLine = JSON.stringify(user);
    ajax.POST('../../php/users/script.php?loadEdit', function (data) {
        console.log(data);
    })
}


function addInfo(data) {

}




/**
 * Проверка доступа
 */
function access (){
    let ajax = new Ajax();
    ajax.POST('../../php/users/script.php?access', function(data){
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
//------------------------------------------------------------------------------

/**
 * Загружает данные пользователей
 */
function loadUserData() {
    let ajax = new Ajax();
    ajax.POST('../../php/users/script.php?loadUserData', function (data) {
        let usersInformation = JSON.parse(data);
        createTableUsersInformation(usersInformation);
    });
}
//-----------------------------------------------------------------------------

/**
 * Создаёт таблицу с пользователями
 * @param data
 */
function createTableUsersInformation(data) {
    let tbody = document.querySelector('.users-information tbody');

    for (let i = 0; i < data.length; i++){
        let newElement = document.createElement('tr');

        let id = document.createElement('td');
        id.innerText = data[i]['id'];
        let fio = document.createElement('td');
        fio.innerText = data[i]['fio'];
        let email = document.createElement('td');
        email.innerText = data[i]['email'];
        let login = document.createElement('td');
        login.innerText = data[i]['login'];
        let date = document.createElement('td');
        date.innerText = data[i]['date'];
        let privilege = document.createElement('td');
        privilege.innerText = privileges(data[i]['privilege']);
        let status = document.createElement('td');
        status.innerText = statuss(data[i]['status']);

        newElement.appendChild(id);
        newElement.appendChild(fio);
        newElement.appendChild(email);
        newElement.appendChild(login);
        newElement.appendChild(date);
        newElement.appendChild(privilege);
        newElement.appendChild(status);

        tbody.appendChild(newElement);
    }
}
//---------------------------------------------------------------------------

/**
 * Подставляет названия прав пользователя вместо числового значения
 * @param data
 * @returns {string}
 */
function privileges(data) {
    switch (data) {
        case 1:{
            return 'Пользователь';
        }
        case 2:{
            return 'Тех. Специалист';
        }
        case 3:{
            return 'Администратор';
        }
        default:{
            return 'Проблемы с правами';
        }
    }
}
//---------------------------------------------------------------------------

/**
 * Подставляет названия статуса пользователя вместо числового значения
 * @param data
 * @returns {string}
 */
function statuss(data) {
    switch (data) {
        case 1:{
            return 'Активный'
        }
        case 0:{
            return 'Заблокирован';
        }
        default:{
            return 'Проблемы со статусом';
        }
    }
}
//----------------------------------------------------------------------------