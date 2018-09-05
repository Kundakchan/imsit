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
 * Предоставляет доступ к навигационному меню в соответствии с правами досткпа
 * @type {AccessLeftNav}
 */
let leftAccess = new AccessLeftNav('#box', '../../../php/apply/script.php?privilegeAccess');
//----------------------------------------------------------------------------------------


/**
 * Авто загрузка содержимого страници
 */
window.addEventListener('load', function () {
    access('../../../php/apply/script.php');

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