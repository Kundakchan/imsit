class Ajax {
    constructor(){
        /**
         * Свойства содкржит данные ответа сервера
         * @type {null}
         */
        this.response = null;
        /**
         * Свойства содержит строку формата JSON
         * @type {null}
         */
        this.jsonLine = null;
    }

    /**
     * Метод отправляет POST запрос на сервер методом Ajax
     * @param url
     * @param collback
     * @constructor
     */
    POST(url, collback){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.addEventListener('readystatechange', function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                collback(xhr.responseText);
            }
        });
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(this.jsonLine)
    }

    /**
     * Метод input с указанным именем класса и создает JSON строку с именем и значением
     * @param classForm
     */
    parserForm(classForm){
        let input = document.querySelectorAll(classForm);
        let object = {};
        for(let i = 0; i < input.length; i++){
            object[input[i].name] = input[i].value;
        }
        this.jsonLine = JSON.stringify(object);
    }

    formClear(classForm){
        let form = document.querySelectorAll(classForm);
        for(let i = 0; i < form.length; i++){
            form[i].value = '';
        }
    }

}