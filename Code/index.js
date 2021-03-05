class Control {
    constructor(element, opts) {
        this._container = element; //Основной блок, в который вписываются элементы Меню
        this._opts = opts; //Все опции (Все пункты меню)
        this.render(); // ?
        this.afterRender(); // ?
    }
    render() {
        const _container = this._container || document.createElement('div'); // Если существует this._container, то левая часть выражения, иначе - правая (Создание нового дива)

        _container.innerHTML = this._template(); // Откуда _template(), если метод не описан в классе?

        this._container = _container.childNodes[0]; // Не совсем понял, зачем это?
    }
    afterRender() {
    }
}

class List extends Control { // Наследутеся от Control
    constructor(element, opts) {
        super.this._items = opts.items; //Получение массива опций
        this._container = document.querySelector('List'); // ? На странице ведь нет такого элемента? (  Дописать || document.createElement('div').classList.add('List')  )
        super.constructor.call(this, element, opts); //Вызов родительского конструктора, в который передаётся объект List
    }

    _template() {
        return '<div class="' + this._classList + ' list"></div>'; // _classList нигде не указан? this._classList = undefined
    }

    _itemTemplate(item) {
        return '<div data-id="' + item.id + '>' + item.title + '</div>'; //Возвращение эелементов меню с их id и title
    }

    render() {
        super.render.call(this); // Вызов родительского метода render(), в который передаётся объект класса List
        this._container.innerHTML = this._items.map(this._itemTemplate.bind(this)).join(''); //Добавление в _container всех опций методом создания массива из div'ов, в которых находятся id и title опции, в конце массив объединяется в одну строку
    }
}

class Popup extends Control { // Наследутся от Control

    constructor(element, opts) {
        this._childConstructor = opts.control; // При создании объекта класса Popup указывается родительский элемент
        this._childOpts = opts.controlOpts; // А так же указвается конфигурация родителького элемента
        super.constructor.call(this, element, opts); // Вызов родительского конструктора, в который предаётся объект класса Popup
    }

    _template() {
        return '<div style="max-width: 300px; max-height: 100px"></div>';
    }

    render() {
        super.render.call(this); // Вызов родительского метода render(), в который передаётся объект класса Popup
        this._container.innerHTML = '<div></div>'; // Добавление пустого div'а в контейнер
        new this._childConstructor(this._container.childNodes[0], this._childOpts); // Не понял. Создаётся новый метод _cildConstructor()? Но где его описание?
    }

    show(position) { // Показать доп. меню
        this._container.style.position = 'absolute';
        this._container.style.top = position.top + 'px';
        this._container.style.left = position.left + 'px';
        document.body.append(this._container);
    }

    hide() { // Скрыть доп. меню
        document.body.removeChild(this._container);
    }
}

class Menu extends List { // Наследутеся от List

    _itemTemplate(item) { // Свой метод _itemTemplate()
        return this._opts.isChild || !item.parent ? ( // Если в объекте _opts значение ключа isChild = true ИЛИ у опции нет родителя
              '<div data-id="' + item.id + '">' + item.title + (item.isParent ? '<span class="arrow">></span>' : '') + '</div>' // Дополнительное условие: Проверка родительсва опции 
           )
           : ''; // Выполнится, если у опции есть родитель ИЛИ в объекте _opts значени ключа isChild = false
    }

    afterRender() { // Свой метод afterRender()
        [].forEach.call(this._container.querySelectorAll('.arrow'), (node) => { // Что за пустой массив в начале строки? ( [] ) | В массив заносятся все элементы страницы с классом arrow,
            //Затем, для каждого элемента выполняется следующее:
            node.onmouseenter = (event) => { // Считывание события наведеня мыши на элемент
                const target = event.target; // Считывание элемента, на которйы навели курсор
                if (target.classList.contains('arrow')) { // Проверка начилия класса arrow у эелмента. Но зачем она нужна, если в массив мы заносили ТОЛЬКО элементы с таким классом?
                    const id = target.parentNode.getAttribute('data-id'); // Получает значение data-id родительского элемента
                    this._popup = this._popup || new Popup(null, { // Создание нового объекта класса Popup
                        control: Menu, // Родитель - Класс Menu
                        controlOpts: {
                            isChild: true,
                            items: this._items.filter((item) => { // Сбор опций, у которых id родителя = const id (5 строк выше)
                                return item.parent === id;
                            })
                        }
                    });
                    const _client = target.getBoundingClientRect(); //Считывание размеров и позиции таргета
                    this._popup.show({ // Выполнение метода show() объекта класса Popup
                        top: _client.top,
                        left: _client.right
                    });
                }
            };
        });
    }
}

const _menu = document.createElement('div');
document.body.appendChild(_menu);
new Menu(_menu, {
    items: [
        {
            id: '1',
            title: 'first',
            isParent: true,
            parent: null
        },
        {
            id: '2',
            title: 'second',
            isParent: true,
            parent: '1'
        },
        {
            id: '3',
            title: 'third',
            isParent: false,
            parent: '2'
        },
        {
            id: '4',
            title: 'aaaa',
            isParent: false,
            parent: '1'
        },
        {
            id: '5',
            title: 'bbb',
            isParent: false,
            parent: null
        },
        {
            id: '6',
            title: 'ccc',
            isParent: false,
            parent: null
        }
    ]
});
