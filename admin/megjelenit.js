import * as rendez from "../both/rendez.mjs"

export let selectedRow = -1
export function megjelenit(lista) {
    let szoveg = `<thead><tr class="table-dark">
    <th>név</th>
    <th>szín</th>
    <th>kor</th>
    <th></th>
    <th></th>
    </tr></thead><tbody>`
    for (let ix = 0; ix < lista.length; ix++) {
        szoveg += `<tr>
        <th>${htmlEntities(lista[ix].nev)}</th>
        <td>${htmlEntities(lista[ix].szin)}</td>
        <td>${lista[ix].kor}</td>
        <td id="td${lista[ix].id}B" style="text-align:center; cursor:pointer" data-bs-toggle="modal" data-bs-target="#szerkesztLap">✏️💨</td>
        <td id="td${lista[ix].id}" style="text-align:center; cursor:pointer" data-bs-toggle="modal" data-bs-target="#torol">❌💨</td>
        </tr>
        `
        selectXevent(lista[ix].id)
        selectEditevent(lista[ix].id,lista)
    }
    $("table").eq(0).html(szoveg + "</tbody>")

    rendezesEsemeny(lista)
}

function listaEgyezes(lista, rendezettLista) {
    let ix = 0
    while (ix < lista.length && lista[ix] == rendezettLista[ix]) {
        ix++
    }
    return ix >= lista.length
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
    $("#td" + nth).ready(function () {
        $("#td" + nth).on("click", function () {
            selectedRow = nth
            // console.log(selectedRow);
        })
    })
}

function selectEditevent(nth,lista) {
    $("#td" + nth + "B").ready(function () {
        $("#td" + nth + "B").on("click", function () {
            selectedRow = nth

            let ix=hol(lista)
            $("#nevsz").val(lista[ix].nev)
            $("#szinsz").val(lista[ix].szin)
            $("#korsz").val(lista[ix].kor)
            // console.log(selectedRow);
        })
    })
}

export function hol(lista) {
    let ix = 0
    while (ix < lista.length && lista[ix].id != selectedRow)
        ix++
    return ix
}

//xss támadás ellen szolgál
function htmlEntities(str) {
    return String(str)
            .replace(/&/g, '&amp;')   // & -> &amp;
            .replace(/</g, '&lt;')    // < -> &lt;
            .replace(/>/g, '&gt;')    // > -> &gt;
            .replace(/"/g, '&quot;'); // " -> &quot;
}