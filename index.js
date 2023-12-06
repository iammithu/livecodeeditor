// Catching commonly used elements to minimize DOM queries
const livePreviewFrame = document.getElementById('live-preview');
const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');
const jsEditor = document.getElementById('js');

// Function to set up the live preview iframe and include necessary scripts
function initializeLivePreview() {
    livePreviewFrame.contentWindow.document.body.innerHTML = '';
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'live-preview-style');
    livePreviewFrame.contentWindow.document.head.appendChild(styleElement);

    const pagedJsScript = document.createElement('script');
    pagedJsScript.src = 'https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js';
    livePreviewFrame.contentWindow.document.head.appendChild(pagedJsScript);
}

// Function to update the live preview iframe with the html code from editor
function updateLiveHTMLPreview(codeEditors) {
    livePreviewFrame.contentWindow.document.body.innerHTML = codeEditors.html.getValue();
}

// Function to update the live preview iframe with the css code from editor
function updateLiveCSSPreview(codeEditors) {
    const styleElement = livePreviewFrame.contentWindow.document.getElementById('live-preview-style');
    styleElement.innerHTML = codeEditors.css.getValue();
}

// Function to update the live preview iframe with the js code from editor
function updateLiveJSPreview(codeEditors) {
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = codeEditors.js.getValue();
    livePreviewFrame.contentWindow.document.body.appendChild(scriptElement);
}

// Function to initialize CodeMirror editors for html, css and javascript
function initializeCodeEditors() {
    function getDefaultOptions(object) {
        const defaultOptions = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        if (object) {
            const keys = Object.keys(object);
            for (const key of keys) {
                defaultOptions[key] = object[key];
            }
        }
        return defaultOptions;
    }

    const codeEditors = {
        html: CodeMirror(htmlEditor, getDefaultOptions({
            mode: 'text/html',
            value: '',
        })),
        css: CodeMirror(cssEditor, getDefaultOptions({
            mode: 'css',
            value: '',
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: {
                completeSingle: false,
                closeOnUnfocus: false
            }
        })),
        js: CodeMirror(jsEditor, getDefaultOptions({
            mode: 'javascript',
            value: ''
        })),
    };
    return codeEditors;
}

// Function to set up the live preview studio with CodeMirror editors and event listeners
function setupLivePreviewStudio() {
    const codeEditors = initializeCodeEditors();

    // Load saved code from localStorage when the page is loaded
    loadSavedCode(codeEditors);

    // Event listener for changes in HTML editor
    CodeMirror.on(codeEditors.html, 'change', () => {
        updateLiveHTMLPreview(codeEditors);
        saveCodeToLocalStorage(codeEditors);
    });

    // Event listener for changes in CSS editor
    CodeMirror.on(codeEditors.css, 'change', () => {
        updateLiveCSSPreview(codeEditors);
        saveCodeToLocalStorage(codeEditors);
    });

    // Event listener for changes in HTML editor
    CodeMirror.on(codeEditors.js, 'change', () => {
        updateLiveJSPreview(codeEditors);
        saveCodeToLocalStorage(codeEditors);
    });
}

// Function to load saved code from localStorage
function loadSavedCode(codeEditors) {
    // Check if there is saved code in localStorage
    const savedHtml = localStorage.getItem('savedHtml');
    const savedCss = localStorage.getItem('savedCss');
    const savedJs = localStorage.getItem('savedJs');

    // Set the code in the editors if there is saved code
    if (savedHtml) codeEditors.html.setValue(savedHtml);
    if (savedCss) codeEditors.css.setValue(savedCss);
    if (savedJs) codeEditors.js.setValue(savedJs);
}

// Function to save code to localStorage
function saveCodeToLocalStorage(codeEditors) {
    // Save the code from each editor to localStorage
    localStorage.setItem('savedHtml', codeEditors.html.getValue());
    localStorage.setItem('savedCss', codeEditors.css.getValue());
    localStorage.setItem('savedJs', codeEditors.js.getValue());
}

// Event listener to set up the live preview studio after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLivePreview();
    setupLivePreviewStudio();
});

function updateHeight(value) {
        const containerWidth = document.getElementById('container').offsetWidth;
        const widthInPixels = Math.round((value / 100) * containerWidth) + 'px';
    
        const resizableDiv = document.getElementById('resizableDiv1');
        resizableDiv.style.height = widthInPixels;
    
        // Update the displayed value
        const sliderValue = document.getElementById('sliderValue2');
        sliderValue.textContent = widthInPixels;
  };
  function updateWidtho(value) {
    const containerWidth = document.getElementById('container').offsetWidth;
    const widthInPixels = Math.round((value / 100) * containerWidth);
    
    const resizableDiv = document.getElementById('resizableDiv1');
    resizableDiv.style.width = value + '%';

    // Update the displayed value
    const sliderValue = document.getElementById('sliderValue1');
    sliderValue.textContent = widthInPixels + 'px';
  
    sliderValue.classList.toggle('default', value == defaultSliderValue);

  };
