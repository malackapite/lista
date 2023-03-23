export function megjelenit(lista){
    let szoveg=""
    for (let ix = 0; ix < lista.length; ix++) {
        szoveg+=`<tr>
        <td>${lista[ix].nev}</td>
        <td>${lista[ix].szin}</td>
        <td>${lista[ix].kor}</td>
        </tr>
        `
    }
    $("table").eq(0).html(szoveg)
}