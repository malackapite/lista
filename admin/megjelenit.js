import { OBJEKTUMLISTA } from "../both/adat.js"
import * as rendez from "../both/rendez.mjs"

export let selectedX=-1
export function megjelenit(lista){
    let szoveg=`<thead><tr class="table-dark">
    <th>név</th>
    <th>szín</th>
    <th>kor</th>
    <th></th>
    </tr></thead><tbody>`
    for (let ix = 0; ix < lista.length; ix++) {
        szoveg+=`<tr>
        <th>${lista[ix].nev}</th>
        <td>${lista[ix].szin}</td>
        <td>${lista[ix].kor}</td>
        <td id="td${lista[ix].id}" style="text-align:center;" data-bs-toggle="modal" data-bs-target="#torol">❌</td>
        </tr>
        `
        selectXevent(lista[ix].id)
    }
    $("table").eq(0).html(szoveg+"</tbody>")
    
    rendezesEsemeny(lista) 
}

function listaEgyezes(lista,rendezettLista) {
    let ix=0
    while (ix<lista.length && lista[ix]==rendezettLista[ix]) {
        ix++
    }
    return ix>=lista.length
}

function rendezesEsemeny(lista) {
    let thead = ["nev", "szin", "kor"]
    for (let ix = 0; ix < 3; ix++) {
        $("th").eq(ix).on('click', function () {
            let rendezettLista = rendez.rendezesObjektum(lista.slice(0, lista.length), thead[ix])
            listaEgyezes(lista, rendezettLista) ? megjelenit(rendezettLista.reverse()) : megjelenit(rendezettLista)
        })
    }
}

function selectXevent(nth) {
    $("#td"+nth).ready(function(){
        $("#td"+nth).on("click",function() { 
            selectedX=nth
            //console.log(selectedX);
        })
    })
}