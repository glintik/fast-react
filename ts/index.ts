import {render, createElement, Component, findDOMNode, updater, createElementFast} from './top-level';
export {render, createElement, Component, findDOMNode, createElementFast};
(<any>window).FastReact = {
    render, createElement, Component, findDOMNode, update: updater, createElementFast
};