export let attrs = {
    accept: 'accept',
    acceptCharset: 'accept-charset',
    accessKey: 'accessKey',
    action: 'action',
    allowFullScreen: 'allowFullScreen',
    allowTransparency: 'allowTransparency',
    alt: 'alt',
    async: 'async',
    autoComplete: 'autoComplete',
    autoPlay: 'autoPlay',
    capture: 'capture',
    cellPadding: 'cellPadding',
    cellSpacing: 'cellSpacing',
    charSet: 'charSet',
    challenge: 'challenge',
    classID: 'classID',
    cols: 'cols',
    colSpan: 'colSpan',
    content: 'content',
    contentEditable: 'contentEditable',
    contextMenu: 'contextMenu',
    coords: 'coords',
    crossOrigin: 'crossOrigin',
    data: 'data',
    dateTime: 'dateTime',
    defer: 'defer',
    dir: 'dir',
    disabled: 'disabled',
    download: 'download',
    draggable: 'draggable',
    encType: 'encType',
    form: 'form',
    formAction: 'formAction',
    formEncType: 'formEncType',
    formMethod: 'formMethod',
    formNoValidate: 'formNoValidate',
    formTarget: 'formTarget',
    frameBorder: 'frameBorder',
    headers: 'headers',
    height: 'height',
    hidden: 'hidden',
    high: 'high',
    href: 'href',
    hrefLang: 'hrefLang',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    icon: 'icon',
    inputMode: 'inputMode',
    is: 'is',
    keyParams: 'keyParams',
    keyType: 'keyType',
    label: 'label',
    lang: 'lang',
    list: 'list',
    low: 'low',
    manifest: 'manifest',
    marginHeight: 'marginHeight',
    marginWidth: 'marginWidth',
    max: 'max',
    maxLength: 'maxLength',
    media: 'media',
    mediaGroup: 'mediaGroup',
    method: 'method',
    min: 'min',
    minLength: 'minLength',
    name: 'name',
    noValidate: 'noValidate',
    open: 'open',
    optimum: 'optimum',
    pattern: 'pattern',
    placeholder: 'placeholder',
    poster: 'poster',
    preload: 'preload',
    radioGroup: 'radioGroup',
    rel: 'rel',
    required: 'required',
    role: 'role',
    rows: 'rows',
    rowSpan: 'rowSpan',
    sandbox: 'sandbox',
    scope: 'scope',
    scoped: 'scoped',
    scrolling: 'scrolling',
    seamless: 'seamless',
    shape: 'shape',
    size: 'size',
    sizes: 'sizes',
    span: 'span',
    spellCheck: 'spellCheck',
    src: 'src',
    srcSet: 'srcSet',
    start: 'start',
    step: 'step',
    style: 'style',
    tabIndex: 'tabIndex',
    target: 'target',
    title: 'title',
    type: 'type',
    useMap: 'useMap',
    width: 'width',
    wmode: 'wmode',
    autoCapitalize: 'autoCapitalize',
    autoCorrect: 'autoCorrect',
    itemProp: 'itemProp',
    itemScope: 'itemScope',
    itemType: 'itemType',
    itemID: 'itemID',
    itemRef: 'itemRef',
    property: 'property',
    security: 'security',
    unselectable: 'unselectable',
};

export let props = {
    checked: 'checked',
    className: 'className',
    controls: 'controls',
    id: 'id',
    loop: 'loop',
    multiple: 'multiple',
    muted: 'muted',
    readOnly: 'readOnly',
    selected: 'selected',
    srcDoc: 'srcdoc',
    value: 'value'
};

export let notPx = {
    boxFlex: true,
    boxFlexGroup: true,
    columnCount: true,
    fillOpacity: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    strokeOpacity: true,
    widows: true,
    zIndex: true,
    zoom: true
};

export let events = {
    onRender: "render",
    onClick: (('ontouchend' in window)) ? 'touchend' : 'click',
    onDblClick: 'dblclick',

    onMouseDown: 'mousedown',
    onMouseUp: 'mouseup',
    onMouseMove: 'mousemove',
    onMouseEnter: 'mouseenter',
    onMouseLeave: 'mouseleave',
    onMouseOver: 'mouseover',
    onMouseOut: 'mouseout',

    onTouchStart: 'touchstart',
    onTouchEnd: 'touchend',
    onTouchMove: 'touchmove',
    onTouchCancel: 'touchcancel',
    onTouchLeave: 'touchleave',

    onContextMenu: 'contextmenu',

    onInput: 'input',
    onFocus: 'focus',
    onChange: 'change',

    onKeyDown: 'keydown',
    onKeyPress: 'keypress',
    onKeyUp: 'keyup'
};
