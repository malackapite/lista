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
    
    $("th").eq(0).on('click',function(){
        let rendezettLista =  rendez.rendezesObjektum(lista.slice(0,lista.length),"nev")
        //console.log(listaEgyezes(lista,rendezettLista));
        listaEgyezes(lista,rendezettLista)?megjelenit(rendezettLista.reverse()):megjelenit(rendezettLista)
        //megjelenit();
    })
    $("th").eq(1).on('click',function(){
        megjelenit(rendez.rendezesObjektum(lista,"szin"));
    })
    $("th").eq(2).on('click',function(){
        megjelenit(rendez.rendezesObjektum(lista,"kor"));
    })
}

function listaEgyezes(lista,rendezettLista) {
    //todo bugfix
    let ix=0
    while (ix<lista.length && lista[ix].nev!=rendezettLista[ix].nev) {
        ix++
    }
    return ix>=lista.length
}