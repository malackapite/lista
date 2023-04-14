import { SZAMLISTA, SZOVEGLISTA} from "../both/adat.js";
import { szurNevSzerint, szurKorSzerint, szurSzinSzerint, szur } from "../both/szures.js";
import { megjelenit, selectedRow, hol } from "./megjelenit.js";


$(document).ready(function () {
    
    getObjLista()
    
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

function getObjLista() {
    let tomb1 = []
    let file = "admin/adat.json"
    fetch(file)
        .then(response => response.json())
        .then(data => {
            tomb1 = data.OBJEKTUMLISTA
            setEvents(tomb1)
        }).catch(e => console.log(e));
}

function setEvents(tomb) {

    megjelenit(tomb)
    $("#Nev").on("keyup", function () {
        szur(tomb)
    })
    $("#Kor").on("keyup", function () {
        szur(tomb)
    })
    $("#Szin").on("keyup", function () {
        szur(tomb)
    })
    $("#kuld").on("click", function () {
        if (validator("Ad")) {
            $('#ad').modal("hide");
            tomb.push({
                nev: $("#nevAd").val()
                , szin: $("#szinAd").val()
                , kor: $("#korAd").val()
                , id: tomb.length == 0 ? 1 : tomb[tomb.length - 1].id + 1
            })
            megjelenit(tomb)
            $("#nevAd").val("")
            $("#szinAd").val("")
            $("#korAd").val("")
        }
    })

    $("#torles").on("click", function () {
        $('#torol').modal("hide");
        tomb.splice(hol(tomb), 1)
        megjelenit(tomb)
    })

    $("#szerkeszt").on("click", function () {
        if (validator("sz")) {
            let ix = hol(tomb)
            $('#szerkesztLap').modal("hide");
            tomb[ix] = {
                nev: $("#nevsz").val()
                , szin: $("#szinsz").val()
                , kor: $("#korsz").val()
                , id: tomb[ix].id
            }
            megjelenit(tomb)
        }
    })

    function validator(postfix) {
        return $("#kor" + postfix).val() >= 0 && $("#kor" + postfix).val() <=30 && $("#kor" + postfix).val() != "" && $("#nev" + postfix).val() != "" && $("#szin" + postfix).val() != ""
    }
}