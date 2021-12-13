import './styles/app.scss';
import Core from "./app/core";

let App = new Core();
const xhttp = new XMLHttpRequest();
xhttp.addEventListener("progress", updateProgress);
xhttp.addEventListener("load", transferComplete);
xhttp.addEventListener("error", transferFailed);
xhttp.addEventListener("abort", transferCanceled);

let submitButton = App.findOneBy('#list_delete');
let formInputFields = App.findBy('.checkbox-action');

App.setAttributes(App.findBy('.disabled'),'disabled','disabled')
App.form.validate(App.findBy('.needs-validation'))
App.form.submitOn(App.findBy('.filter_form'),'change')
let htmlFileSize = (document.documentElement.outerHTML.length/1024).toFixed(0)
/*
 * listen to mouse click on each selected field (with css class .checkbox-action)
 * Run function "validateDeleteForm" to check if a checkbox is ticked
 * If any checkbox is ticked, enable submit button to delete ticked entries.
 */
setListener(formInputFields,validateDeleteForm)
function setListener(fields,customFunction, eventActions = ['click'])
{
    Array.prototype.slice.call(fields)
        .forEach(function (field) {
            let $i = 0;
            App.addMultipleEventListener(field,eventActions,customFunction)
        })
}
// validate checkboxes to enable delete button
function validateDeleteForm($i){
    Array.prototype.slice.call(formInputFields)
        .forEach(function (field) {
            if(field.checked === true){
                $i = 1;
            }
        })
    if($i === 1){
        App.setClass(submitButton,'disabled',true)
        App.setAttribute(submitButton,'disabled')
    } else {
        App.setClass(submitButton,'disabled')
        App.setAttribute(submitButton,'disabled','disabled')
    }
}
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    let linkButtons = App.findBy('a.link');
    createLinkAction(linkButtons,loadPage,'data-link')
});


function createLinkAction(elements,customFunction,attribute, eventAction = "click"){
    Array.prototype.slice.call(elements)
        .forEach(function (element) {
            let link = App.getAttribute(element,attribute);
            element.addEventListener(eventAction,function(element) {
                    element.preventDefault()
                    element.stopPropagation()
                setTimeout(function (){
                    if(App.findOneBy('#loading-wrapper').classList.contains('fade-out'))
                    {
                        loadPage(link);
                    }
                },1000);
                    App.setDisplay('#loading-wrapper','block')
                    App.setClass(App.findOneBy('#loading-wrapper'),'fade-out');
                },
                false)
        })
}

// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {
    App.findOneBy('#loading').innerHTML = 'Ladevorgang gestartet';
    App.setDisplay('#loading-wrapper','block');
    console.log("The transfer started.");
    if (oEvent.lengthComputable) {
        let percentComplete = oEvent.loaded / oEvent.total * 100;
        App.findOneBy('#loading').innerHTML = percentComplete + '%';
    } else {
        // Unable to compute progress information since the total size is unknown
        App.findOneBy('#loading').innerHTML = 'unbekannte Größe';
    }
}

function transferComplete(evt) {
    App.setClass(App.findOneBy('#loading-wrapper'),'fade-out',true);
    setTimeout(function (){
        App.setClass(App.findOneBy('#loading-wrapper'),'fade-in',true);
        App.setDisplay('#loading-wrapper','none');
    },300)
    App.setClass(App.findOneBy('#loading-wrapper'),'fade-in');
    App.findOneBy('#loading').innerHTML = 'Laden abgeschlossen';
    //App.setDisplay('#loading-wrapper','none');
    console.log("The transfer is complete.");
}

function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
}

function loadPage(link) {
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let page = App.findOneBy('#page').innerHTML = this.responseText;
            let dom = new DOMParser()
            dom.parseFromString(page,'application/xhtml+xml');
            history.pushState({ id: 0 }, "Seitentitel", link)
            let newButtons = App.findBy('#page .link')
            createLinkAction(newButtons,loadPage,'data-link')
        }
    }
    xhttp.open("GET", link,true);
    xhttp.send();
}