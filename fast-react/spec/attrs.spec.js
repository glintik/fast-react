import {Test} from './helper';
import React,{findDOMNode, Component} from 'react';


describe("Attrs", () => {
    var onClick = ()=>null;
    var onClick2 = ()=>null;
    var onMouseDown = ()=>null;
    var onMouseDown2 = ()=>null;
    var Class1 = 'Class1';
    var Class2 = 'Class2';
    var Id1 = 'Id1';
    var Id2 = 'Id2';
    var Name1 = 'Name1';
    var Name2 = 'Name2';
    var Title1 = 'Title1';
    var Title2 = 'Title2';
    var Rel1 = 'Rel1';
    var Rel2 = 'Rel2';

    var Null = null;

    it('simple', () => {
        new Test()
            .create(<div id={Id1} className={Class1} title={Null} data-name={Null}
                         onClick={Null} onmousedown={Null}></div>,
            `<div id="Id1" class="Class1"></div>`, {onclick: null, onmousedown: null})

            .update(<div id={Id1} className={Class1} title={Title1} data-name={Name1}
                         onClick={onClick} onmousedown={onMouseDown}></div>,
            `<div id="Id1" class="Class1" title="Title1" data-name="Name1"></div>`, {})

            .update(<div id={Id2} className={Class2} title={Title2} data-name={Name2}
                         onClick={onClick2} onmousedown={onMouseDown2}></div>,
            `<div id="Id2" class="Class2" title="Title2" data-name="Name2"></div>`, {})

            .update(<div id={Id2} className={Class2} title={Null} data-name={Null}
                         onClick={Null} onmousedown={Null}></div>,
            `<div id="Id2" class="Class2"></div>`, {onclick: null, onmousedown: null})
    });

    it('simple with const', () => {
        new Test()
            .create(<div title={Null} id="Id1" className="Class1" data-name={Null}
                         onClick={Null} onmousedown={Null}></div>,
            `<div id="Id1" class="Class1"></div>`, {onclick: null, onmousedown: null})

            .update(<div title={Title1} id="Id1" className="Class1" data-name={Name1}
                         onClick={onClick} onmousedown={onMouseDown}></div>,
            `<div id="Id1" class="Class1" title="Title1" data-name="Name1"></div>`, {})

            .update(<div title={Title2} id="Id1" className="Class1" data-name={Name2}
                         onClick={onClick2} onmousedown={onMouseDown2}></div>,
            `<div id="Id1" class="Class1" title="Title2" data-name="Name2"></div>`, {})

            .update(<div title={Null} id="Id1" className="Class1" data-name={Null}
                         onClick={Null} onmousedown={Null}></div>,
            `<div id="Id1" class="Class1"></div>`, {})
    });

    it('spread', () => {
        var spread1 = {};
        var spread2 = {id: Id1, title: Title2, rel: Rel1, "data-name": Name1};
        var spread3 = {className: Class1, id: Id2};
        var spread4 = {className: Class2, rel: Rel2, title: Title2, "data-name": Name2};
        new Test()
            .create(<div title={Title1} {...spread1} id={Id1}></div>,
            `<div title="Title1" id="Id1"></div>`)

            .update(<div title={Title1} {...spread2} id={Id1}></div>,
            `<div title="Title2" id="Id1" rel="Rel1" data-name="Name1"></div>`)

            .update(<div title={Title1} {...spread3} id={Id1}></div>,
            `<div title="Title1" id="Id1" class="Class1"></div>`, {})

            .update(<div title={Title1} {...spread4} id={Id1}></div>,
            `<div title="Title2" id="Id1" class="Class2" rel="Rel2" data-name="Name2"></div>`, {})
    });

    it('spread to const', () => {
        var spread1 = {id: Id1, title: Title2, rel: Rel1, "data-name": Name1};
        new Test()
            .create(<div title={Title1} {...spread1} id={Id1}></div>,
            `<div title="Title2" id="Id1" rel="Rel1" data-name="Name1"></div>`)

            .update(<div title={Title1} id={Id1}></div>,
            `<div title="Title1" id="Id1"></div>`)
    });
    it('const to spread', () => {
        var spread1 = {id: Id1, title: Title2, rel: Rel1, "data-name": Name1};
        new Test()
            .create(<div title={Title1} id={Id1}></div>,
            `<div title="Title1" id="Id1"></div>`)

            .update(<div title={Title1} {...spread1} id={Id1}></div>,
            `<div title="Title2" id="Id1" rel="Rel1" data-name="Name1"></div>`)
    });
    it('const to const', () => {
        new Test()
            .create(<div title={Title1} id={Id1}></div>,
            `<div title="Title1" id="Id1"></div>`)

            .update(<div title={Title2} id={Id1} data-name="Name1"></div>,
            `<div title="Title2" id="Id1" data-name="Name1"></div>`)
    });

    //todo: style


    /*
        it('update const', () => {
            new Test()
                .create(<div id="Id" className="Class" title="Title" data-name="Name"></div>, `<div id="Id" class="Class" title="Title" data-name="Name"></div>`)
                .update(<div id="Id2" className="Class2" title="Title2" data-name="Name2"></div>, `<div id="Id2" class="Class2" title="Title2" data-name="Name2"></div>`)
        });

        it('update const', () => {
            new Test()
                .create(<div id="Id" className="Class" title="Title" data-name="Name"></div>, `<div id="Id" class="Class" title="Title" data-name="Name"></div>`)
                .update(<div id="Id2" className="Class2" title="Title2" data-name="Name2"></div>, `<div id="Id2" class="Class2" title="Title2" data-name="Name2"></div>`)
        });
    */


});