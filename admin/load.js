import { SZAMLISTA, SZOVEGLISTA, OBJEKTUMLISTA } from "../both/adat.js";
import { szurNevSzerint, szurKorSzerint, szurSzinSzerint, szur } from "../both/szures.js";
import { megjelenit, selectedRow, hol } from "./megjelenit.js";


$(document).ready(function () {
    megjelenit(OBJEKTUMLISTA)
    $("#Nev").on("keyup", function () {
        szur(OBJEKTUMLISTA)
    })
    $("#Kor").on("keyup", function () {
        szur(OBJEKTUMLISTA)
    })
    $("#Szin").on("keyup", function () {
        szur(OBJEKTUMLISTA)
    })
    $("#kuld").on("click", function () {
        if (validator("Ad")) {
            $('#ad').modal("hide");
            OBJEKTUMLISTA.push({
                nev: $("#nevAd").val()
                , szin: $("#szinAd").val()
                , kor: $("#korAd").val()
                , id: OBJEKTUMLISTA.length == 0 ? 1 : OBJEKTUMLISTA[OBJEKTUMLISTA.length - 1].id + 1
            })
            megjelenit(OBJEKTUMLISTA)
            $("#nevAd").val("")
            $("#szinAd").val("")
            $("#korAd").val("")
        }
    })

    $("#torles").on("click", function () {
        $('#torol').modal("hide");
        OBJEKTUMLISTA.splice(hol(), 1)
        megjelenit(OBJEKTUMLISTA)
    })

    $("#szerkeszt").on("click", function () {
        if (validator("sz")) {
            let ix = hol()
            $('#szerkesztLap').modal("hide");
            OBJEKTUMLISTA[ix] = {
                nev: $("#nevsz").val()
                , szin: $("#szinsz").val()
                , kor: $("#korsz").val()
                , id: OBJEKTUMLISTA[ix].id
            }
            megjelenit(OBJEKTUMLISTA)
        }
    })

    
    function validator(postfix) {
        return $("#kor" + postfix).val() >= 0 && $("#kor" + postfix).val() != "" && $("#nev" + postfix).val() != "" && $("#szin" + postfix).val() != ""
    }
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