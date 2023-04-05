import { SZAMLISTA, SZOVEGLISTA, OBJEKTUMLISTA } from "./adat.js";
import { szurNevSzerint, szurKorSzerint, szurSzinSzerint, szur } from "./szures.js";
import { megjelenit } from "./megjelenit.js";

$(document).ready(function(){
    megjelenit(OBJEKTUMLISTA)
    $("#Nev").on("keyup",function(){
        szur(OBJEKTUMLISTA)
    })
    $("#Kor").on("keyup",function(){
        szur(OBJEKTUMLISTA)
    })
    $("#Szin").on("keyup",function(){
        szur(OBJEKTUMLISTA)
    })
    /*console.log(SZAMLISTA);
    rendezesSzam(SZAMLISTA)
    console.log(SZAMLISTA);
    veletlenSorrend(SZAMLISTA)
    console.log(SZAMLISTA);

    rendezesSzoveg(SZOVEGLISTA)
    console.log(SZOVEGLISTA);
    veletlenSorrend(SZOVEGLISTA)
    console.log(SZOVEGLISTA);
    console.log("🐈💨");*/

    //rendezesObjektumKor(OBJEKTUMLISTA)
    // rendezesObjektum(OBJEKTUMLISTA,"kor")
    // console.log(OBJEKTUMLISTA);
    //rendezesObjektumSzin(OBJEKTUMLISTA)
    // rendezesObjektum(OBJEKTUMLISTA,"szin")
    // console.log(OBJEKTUMLISTA);
    // rendezesObjektum(OBJEKTUMLISTA,"nev")
    // console.log(OBJEKTUMLISTA)

    // console.log("tésza szűrés");
    // let szuresfeltetel="🐈"
    
    // console.log(szurNevSzerint(OBJEKTUMLISTA, szuresfeltetel));
    // console.log(szurKorSzerint(OBJEKTUMLISTA, "==12"));
})