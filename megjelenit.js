import * as rendez from "./rendez.mjs"
export function megjelenit(lista){
    let szoveg=`<thead><tr>
    <th >név</th>
    <th >szín</th>
    <th ">kor</th>
    </tr></thead><tbody>`
    for (let ix = 0; ix < lista.length; ix++) {
        szoveg+=`<tr>
        <td>${lista[ix].nev}</td>
        <td>${lista[ix].szin}</td>
        <td>${lista[ix].kor}</td>
        </tr>
        `
    }
    $("table").eq(0).html(szoveg+"</tbody>")
    
    let thead=["nev","szin","kor"]
    for (let ix = 0; ix < 3; ix++) {
        $("th").eq(ix).on('click',function(){
            let rendezettLista =  rendez.rendezesObjektum(lista.slice(0,lista.length),thead[ix])
            listaEgyezes(lista,rendezettLista)?megjelenit(rendezettLista.reverse()):megjelenit(rendezettLista)
        })
    }
}

function listaEgyezes(lista,rendezettLista) {
    let ix=0
    while (ix<lista.length && lista[ix]==rendezettLista[ix]) {
        ix++
    }
    return ix>=lista.length
}