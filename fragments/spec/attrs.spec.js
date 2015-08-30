import {Test} from './helper';


fdescribe("Attrs", () => {
    var onClick = ()=>null;
    var onClick2 = ()=>null;
    var onMouseDown = ()=>null;
    var onMouseDown2 = ()=>null;
    it('simple', () => {
        var Class1 = 'Class1';
        var Class2 = 'Class2';
        var Id1 = 'Id1';
        var Id2 = 'Id2';
        var Name1 = 'Name1';
        var Name2 = 'Name2';
        var Title1 = 'Title1';
        var Title2 = 'Title2';
        var Null = null;

        new Test()
            .create(<div id={Id1} className={Class1} title={Null} data-name={Null}
                         onClick={Null} onmousedown={Null}></div>, `<div id="Id1" class="Class1"></div>`, {onclick: null, onmousedown: null})

            .update(<div id={Id1} className={Class1} title={Title1} data-name={Name1}
                         onClick={onClick} onmousedown={onMouseDown}></div>, `<div id="Id1" class="Class1" title="Title1" data-name="Name1"></div>`, {onclick: onClick, onmousedown: onMouseDown})

            .update(<div id={Id2} className={Class2} title={Title2} data-name={Name2}
                         onClick={onClick2} onmousedown={onMouseDown2}></div>, `<div id="Id2" class="Class2" title="Title2" data-name="Name2"></div>`, {onclick: onClick2, onmousedown: onMouseDown2})

            .update(<div id={Id2} className={Class2} title={Null} data-name={Null}
                         onClick={Null} onmousedown={Null}></div>, `<div id="Id2" class="Class2"></div>`, {onclick: null, onmousedown: null})
    });
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