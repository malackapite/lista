import { SZAMLISTA, SZOVEGLISTA, OBJEKTUMLISTA } from "../both/adat.js";
import { szurNevSzerint, szurKorSzerint, szurSzinSzerint, szur } from "../both/szures.js";
import { megjelenit, selectedX } from "./megjelenit.js";


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
    $("#kuld").on("click",function() { 
        if($("#korAd").val()>=0 && $("#nevAd").val()!="" && $("#szinAd").val()!=""){
            $('#ad').modal("hide");
            OBJEKTUMLISTA.push({nev:$("#nevAd").val()
            , szin:$("#szinAd").val()
            , kor:$("#korAd").val()
            , id:OBJEKTUMLISTA.length==0?1:OBJEKTUMLISTA[OBJEKTUMLISTA.length-1].id+1})
            megjelenit(OBJEKTUMLISTA)
            $("#nevAd").val("")
            $("#szinAd").val("")
            $("#korAd").val("")
        }  
    })

    $("#torles").on("click",function() { 
        $('#torol').modal("hide");
        let ix=0
        while (ix<OBJEKTUMLISTA.length && OBJEKTUMLISTA[ix].id != selectedX)
            ix++
        OBJEKTUMLISTA.splice(ix,1)
        megjelenit(OBJEKTUMLISTA)
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