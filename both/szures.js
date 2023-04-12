import { megjelenit } from "../admin/megjelenit.js"

export function szurNevSzerint(lista, feltetel){
    const eredmenyLista = lista.filter(function(macska){
        return macska.nev.toLowerCase().includes(feltetel)
    })
    return eredmenyLista
}

export function szurKorSzerint(lista, feltetel){
    try{
        const eredmenyLista = lista.filter(function(macska){
            return eval(macska.kor+feltetel)
        })
        return eredmenyLista
    }
    catch{
        return lista
    }
}

export function szurSzinSzerint(lista, feltetel){
    const eredmenyLista = lista.filter(function(macska){
        return macska.szin.toLowerCase().includes(feltetel)
    })
    return eredmenyLista
}

export function szur(belista){
    let lista=szurNevSzerint(belista, $("#Nev").val())
    lista=szurKorSzerint(lista, $("#Kor").val())
    lista=szurSzinSzerint(lista, $("#Szin").val())
    megjelenit(lista)
}