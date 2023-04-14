import * as THREE from '../js/three.module.js';

$(document).ready(function () {
    getObjLista()
})

function textUpdate(nth, lista) {
    $("#nev").text(lista[nth].nev)
    $("#szin").text(lista[nth].szin)
    $("#kor").text(lista[nth].kor)
}

function getObjLista() {
    let tomb1 = []
    let file = "admin/adat.json"
    fetch(file)
        .then(response => response.json())
        .then(data => {
            tomb1 = data.OBJEKTUMLISTA
            setEvents(tomb1)
        }).catch(e => console.log(e));
}

function setEvents(tomb) {
    let nth = 0
    textUpdate(nth, tomb)
    $("input").eq(0).on("click", function () {
        if (nth > 0) {
            nth--
            textUpdate(nth, tomb)
        }
        console.log(nth);
    })
    $("input").eq(1).on("click", function () {
        if (nth < tomb.length - 1) {
            nth++
            textUpdate(nth, tomb)
        }
        //console.log(nth);
    })

    let text = ""
    for (let ix = 0; ix < tomb.length; ix++) {
        text += `<div class="teszt"></div>`
        $("#menu").html(text)
    }
}