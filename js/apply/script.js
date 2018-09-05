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
    access('../../../php/apply/script.php');

});

/**
 * Предоставляет доступ к навигационному меню в соответствии с правами досткпа
 * @type {AccessLeftNav}
 */
let leftAccess = new AccessLeftNav('#box', '../../../php/apply/script.php?privilegeAccess');
//----------------------------------------------------------------------------------------

/**
 * отправка данных на сервер
 * @type {Element}
 */
let form = document.querySelector('#form-apply');
form.addEventListener('submit', function () {
    event.preventDefault();
    sendData(function (data) {
        removeForm();
        if(data === '1'){
            $('#apply-true').collapse()
        }
        else {
            $('#apply-false').collapse()
        }
    });
    
});






/**
 * Проверка доступа
 */
function access (server){
    let ajax = new Ajax();
    ajax.POST(`${server}?access` , function(data){
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
 * Добавляет Новую заявку
 * @param callback
 */
function sendData(callback) {
    let ajax = new Ajax();
    ajax.parserForm('.apply-data');
    ajax.POST('../../../php/apply/script.php?addApply', callback);
}
//------------------------------------------------------------------------------

/**
 * Удаляет содержимое ко
 */
function removeForm() {
    let box = document.querySelectorAll('.contentt .row');
    let r = box[0].remove();
    let e = box[1].remove();
}