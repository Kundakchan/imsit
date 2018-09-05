class Left_nav {
    constructor(params){

        this._dom = document;

        this.box = params['box'];

        this.item = params['item'];

        this.logo = params['logo'];

        this.footer = params['footer'];

        this._create_left_nav();
        this._button_behavior();
    }

    _create_left_nav(){
        let container = this._dom.getElementById(this.box);
        let left_box = document.createElement('div');
        left_box.className = 'left-box';
        left_box.appendChild(this._create_header());
        left_box.appendChild(this._create_body());
        left_box.appendChild(this._create_footer());
        container.appendChild(left_box);
    }

    _create_header(){
        let head = document.createElement('div');
        let logo = document.createElement('div');
        head.className = 'row header';
        logo.className = 'col logo text-center';
        logo.innerText = this.logo;
        head.appendChild(logo);
        return head;
    }

    _create_body(){
        let body = document.createElement("div");
        body.className = 'list-group body';

        for (let key in this.item){
            if(typeof this.item[key] === 'object'){
                let row = document.createElement('a');
                let icon  = document.createElement('i');
                icon.className = 'fas fa-times';
                row.className = 'list-group-item list-group-item-action group-1';
                row.innerText = key;
                row.href = '#';
                row.appendChild(icon);
                body.appendChild(row);

                for (let key_2 in this.item[key]){
                    let row = document.createElement('a');
                    row.className = 'list-group-item list-group-item-action group-2';
                    row.innerText = key_2;
                    row.href = this.item[key][key_2];
                    body.appendChild(row);
                }
            }
            else {
                let row = document.createElement('a');
                row.className = 'list-group-item list-group-item-action group-1';
                row.innerText = key;
                row.href = this.item[key];
                body.appendChild(row);
            }
        }
        return body;
    }

    _create_footer(){
        let foot = document.createElement('div');
        let row = document.createElement('a');
        foot.className = 'list-group footer';
        row.className = 'list-group-item list-group-item-action group-1';
        row.innerText = this.footer;
        row.href = '#';
        foot.appendChild(row);
        row.addEventListener('click', function (e) {
            location.href = this.origin;
        });

        return foot;
    }

    _button_behavior(){
        let button = this._dom.querySelectorAll('.body .group-1');
        for(let i = 0; i < button.length; i++){
            if(button[i].children.length > 0){
                button[i].addEventListener('click', function (e) {
                    let element = e.target.nextElementSibling;
                    let icon = e.target.children;
                    if(element.style.display === 'none' || element.style.display === ''){
                        e.preventDefault();
                        open(element);
                        icon[0].classList.add('icon');
                    }
                    else {
                        e.preventDefault();
                        icon[0].classList.remove('icon');
                        close(element);
                    }

                    function open(element) {
                        for(; true ;){
                            if(element.classList.contains('group-2')){
                                element.style.display = 'initial';
                                if(element.nextElementSibling !== null){
                                    element = element.nextElementSibling;
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }

                    function close(element) {
                        for(; true ;){
                            if(element.classList.contains('group-2')){
                                element.style.display = 'none';
                                if(element.nextElementSibling !== null){
                                    element = element.nextElementSibling;
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }
                });
            }
        }
    }
}

class AccessLeftNav {
    /**
     *
     * @param selector
     * @param server
     */
    constructor(selector, server){
        this.selector = selector;
        this.server = server;
        this._event();
    }

    /**
     *
     * @private
     */
    _event(){
        let _this = this;
        let element = this._query();
        element.addEventListener('click', function (event) {
            event.preventDefault();
            let target = event.target;
            if(target.tagName !== 'A'){
                return;
            }
            _this._privilegeAccess(target);
        })

    }

    /**
     *
     * @returns {Element}
     * @private
     */
    _query(){
        return document.querySelector(this.selector);
    }

    /**
     *
     * @param node
     * @private
     */
    _privilegeAccess(node){
        let ajax = new Ajax();
        let url = {
            "href": node.href
        };
        ajax.jsonLine = JSON.stringify(url);
        ajax.POST(this.server, function (data) {
            if(data === '1'){
                window.location = url.href;
            }
        });
    }
}