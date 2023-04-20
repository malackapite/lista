import { szur } from "../both/szures.js";
import { megjelenit, selectedRow, hol } from "./megjelenit.js";


$(document).ready(function () {
    getObjLista()
})

function getObjLista() {
    let file = "both/adat.json"
    fetch(file)
        .then(response => response.json())
        .then(data => {
            setEvents(data.OBJEKTUMLISTA)
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
    $("#Feltetel").on("change", function () {
        szur(tomb)
    })
    $("#kuld").on("click", function () {
        const toastRossz = new bootstrap.Toast($('#liveToast'))
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
        } else toastRossz.show()
        szurReset()
    })

    $("#torles").on("click", function () {
        $('#torol').modal("hide");
        tomb.splice(hol(tomb), 1)
        megjelenit(tomb)
    })

    $("#szerkeszt").on("click", function () {
        const toastRossz = new bootstrap.Toast($('#liveToast'))
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
        } else toastRossz.show()
        szurReset()
    })

    function validator(postfix) {
        return $("#kor" + postfix).val() >= 0 && $("#kor" + postfix).val() <= 30 && $("#kor" + postfix).val() != "" && $("#nev" + postfix).val() != "" && $("#szin" + postfix).val() != ""
    }
    function szurReset() {
        $("#Nev").val("")
        $("#Szin").val("")
        $("#Kor").val("")
    }
}