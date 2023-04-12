function rendezesSzoveg(lista){
    lista.sort()
}


function rendezesSzam(lista){
    return lista.sort(function(a, b){
        return a-b
    });
}

function veletlenSorrend(lista){
    return lista.sort(function(a, b){
        return Math.random()-0.5
    });
}

function rendezesObjektumKor(lista){
    return lista.sort(function(a, b){
        return a.kor-b.kor
    });
}

function rendezesObjektumSzin(lista){
    return lista.sort(function(a, b){
        return a.szin>b.szin?-1:1
    });
}

function rendezesObjektumNev(lista, kulcs){
    return lista.sort(function(a, b){
        return a[kulcs]>b[kulcs]?-1:1
    });
}

export function rendezesObjektum(lista, kulcs){
    if(kulcs=="kor")
        return rendezesObjektumKor(lista)
    else if(kulcs=="nev")
        return rendezesObjektumNev(lista, kulcs)
    else
        return rendezesObjektumSzin(lista)
}