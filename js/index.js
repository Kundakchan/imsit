let aut = document.getElementById('authorization');
aut.addEventListener('click', function () {
    let form_reg = document.getElementById('form-registration');
    let form_aut = document.getElementById('form-authorization');
    aut.previousElementSibling.className = 'btn btn-outline-dark';
    aut.className = 'btn btn-outline-dark active';
    form_reg.style.display = 'none';
    form_aut.style.display = 'initial';
    let message = document.querySelector('#error-message');
    message.innerText = '';
    message.style.color = 'red';
    let ajax = new Ajax();
    ajax.formClear('.reg-form');
});

let reg = document.getElementById('registration');
reg.addEventListener('click', function(){
    let form_reg = document.getElementById('form-registration');
    let form_aut = document.getElementById('form-authorization');
    reg.nextElementSibling.className = 'btn btn-outline-dark';
    reg.className = 'btn btn-outline-dark active';
    form_aut.style.display = 'none';
    form_reg.style.display = 'initial';
    let message = document.querySelector('#error-message');
    message.innerText = '';
    message.style.color = 'red';
    let ajax = new Ajax();
    ajax.formClear('.aut-form');
});

let icon = document.querySelectorAll('i');
for(let i = 0; i < icon.length; i++){
    icon[i].addEventListener('click', function (e) {
        let pass = e.path[1].previousElementSibling;
        if(this.className === 'far fa-eye-slash'){
            this.className = 'far fa-eye';
            pass.type = 'text';
        }
        else{
            this.className = 'far fa-eye-slash';
            pass.type = 'password';
        }
    });
}

//--------------------Регистрация-----------------------------------------//

let form_registration = document.getElementById('form-registration');
form_registration.addEventListener('submit',function (e) {
    e.preventDefault();
    let ajax = new Ajax();
    ajax.parserForm('.reg-form');
    ajax.POST('php/index.php?button=registration', function (data) {
        if(data === '0'){
            let message = document.querySelector('#error-message');
            message.innerText = 'Пароль не совпадает!';
        }
        else if(data === '1'){
            let message = document.querySelector('#error-message');
            message.innerText = 'Такой логин уже существует!';
        }
        else if(data === '2'){
            let form_reg = document.getElementById('form-registration');
            let form_aut = document.getElementById('form-authorization');
            aut.previousElementSibling.className = 'btn btn-outline-dark';
            aut.className = 'btn btn-outline-dark active';
            form_reg.style.display = 'none';
            form_aut.style.display = 'initial';
            let message = document.querySelector('#error-message');
            message.innerText = 'Вы успешно зарегистрировались, пожалуйста авторизуйтесь';
            message.style.color = 'blue'
        }
        else {
            alert('Не предвиденная ошибка регистрации!');
            console.log(data);
        }
    });
    ajax.formClear();
});

//--------------------------Авторизация-------------------------//

let form_authorization = document.querySelector('#form-authorization');
form_authorization.addEventListener('submit', function (e) {
    e.preventDefault();
    let ajax = new Ajax();
    ajax.parserForm('.aut-form');
    ajax.POST('php/index.php?button=authorization', function (data) {
        if(data === '0'){
            let message = document.querySelector('#error-message');
            message.style.color = 'red';
            message.innerText = 'Неверный логин или парол';
        }
        else if(data === '1'){
            location.href = 'html/home.html';
        }
        else {
            alert('Не предвиденная ошибка авторизации!');
        }
    });
    ajax.formClear();
});