import {render, createElement, Component, findDOMNode, updater} from './top-level';
export {render, createElement, Component, findDOMNode};
(<any>window).FastReact = {
    render, createElement, Component, findDOMNode, update: updater
};