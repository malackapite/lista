import * as THREE from "../js/three.module.js";

$(document).ready(function () {
    getObjLista();
});

function textUpdate(nth, lista) {
    $("#nev").text(lista[nth].nev);
    $("#szin").text(lista[nth].szin);
    $("#kor").text(lista[nth].kor);
}

function getObjLista() {
    let tomb1 = [];
    let file = "admin/adat.json";
    fetch(file)
        .then((response) => response.json())
        .then((data) => {
            tomb1 = data.OBJEKTUMLISTA;
            setEvents(tomb1);
        })
        .catch((e) => console.log(e));
}

function setEvents(tomb) {
    let nth = 0;
    let kosarlista = new Array(tomb.length).fill(0);
    textUpdate(nth, tomb);
    $("#hatra").ready(function () {
        $("#hatra").on("click", function () {
            $(".oldal").eq(nth).button('toggle')
            if (nth > 0) {
                nth--;
                textUpdate(nth, tomb);
                $("#db").val("1");
            }
            $(".oldal").eq(nth).button('toggle')
        });
    })
    $("#elore").ready(function () {
        $("#elore").on("click", function () {
            $(".oldal").eq(nth).button('toggle')
            if (nth < tomb.length - 1) {
                nth++;
                textUpdate(nth, tomb);
                $("#db").val("1");
            }
            $(".oldal").eq(nth).button('toggle')
        });
    })
    let text = `
    <button type="button" id="hatra" class="btn btn-secondary"><</button>
    `;
    for (let ix = 0; ix < tomb.length; ix++) {
        text += `<button type="button" class="btn btn-secondary oldal">${ix + 1}</button>`;
        $("#lep").html(text + `<button id="elore" type="button" class="btn btn-secondary">></button>`);
        $(".oldal").eq(0).button('toggle')
        $(".oldal").ready(function () {
            $(".oldal").on("click", function () {
                $(".oldal").eq(nth).button('toggle')
                console.log(nth);
                let ix = 0;
                while (!$(".oldal").eq(ix).is(this)) ix++;
                nth = ix;
                $("#db").val("1");
                $(".oldal").eq(nth).button('toggle')
            })
        });
    }

    $("#vasarol").on("click", function () {
        const toastRossz = new bootstrap.Toast($('#liveToast'))
        const toastJo = new bootstrap.Toast($('#sikeresVasarlas'))
        if ($("#db").val() != "" && $("#db").val() > 0 && kosarlista[nth] + parseInt($("#db").val()) < 100) {
            kosarlista[nth] += parseInt($("#db").val());
            toastJo.show()
        }
        else toastRossz.show()
        // console.log($("#db").val());
        //console.log(nth);
        console.log(kosarlista);
        $("#tetel").text(kosarlista.filter(function (key) { return key > 0 }).length)
    });

    function panelNumEvent(ix) {
        const toastRossz = new bootstrap.Toast($('#liveToast'))
        const toastJo = new bootstrap.Toast($('#sikeresVasarlas'))
        $(".panelNum" + ix).ready(function () {
            $(".panelNum" + ix).on("change", function () {
                if ($(".panelNum" + ix).val() != "" && $(".panelNum" + ix).val() > 0 && $(".panelNum" + ix).val() < 100) {
                    kosarlista[ix] = parseInt($(".panelNum" + ix).val());
                    toastJo.show()
                }
                else {
                    toastRossz.show()
                    $(".panelNum" + ix).val(kosarlista[nth])
                }
                console.log(43);
            })
        })
    }

    $("svg").eq(0).on("click", function () {
        kosarelemGeneral()
    });
    function kosarTorolEvent(nth) {
        $("#K" + nth).ready(function () {
            $("#K" + nth).on("click", function () {
                kosarlista[nth] = 0
                kosarelemGeneral()
            })
        })
    }

    function kosarelemGeneral() {
        let szoveg = ""
        for (let ix = 0; ix < tomb.length; ix++) {
            if (kosarlista[ix] > 0)
                szoveg += `<div class="card mb-3">
        <div class="row g-0 align-items-center shadow-sm">
          <div class="col-3">
            <img src="http://http.cat/${parseInt(Math.random() * 3) + 1}0${parseInt(Math.random() * 10)}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-9">
            <div class=" card-body d-flex justify-content-between align-items-center">
              <div>
                <h1 class="card-title">${tomb[ix].nev}</h1>
                <span class="card-text">Szín: ${tomb[ix].szin}</span>
                <p class="card-text">Kor: ${tomb[ix].kor}</p>
              </div>
              <div>
                <div class="input-group">
                    <input type="number" value="${kosarlista[ix]}" class="form-control panelNum${ix}" aria-label="db">
                    <span class="input-group-text">db</span>
                </div>
              </div>
              <p id="K${ix}" class="card-text" style="font-size: xx-large; cursor:pointer;">❌💨</p>  
            </div>
          </div>
        </div>
      </div>`
            kosarTorolEvent(ix)
            panelNumEvent(ix)
        }
        $("#lista").html(szoveg)
    }
    $("#vasarlas").on("click", function () {
        let szoveg = `<thead><tr class="table-dark">
        <th>név</th>
        <th>szín</th>
        <th>kor</th>
        <th>darab</th>
        </tr></thead><tbody>`
        for (let ix = 0; ix < tomb.length; ix++) {
            if (kosarlista[ix] > 0) {
                szoveg += `<tr>
                <th>${tomb[ix].nev}</th>
                <td>${tomb[ix].szin}</td>
                <td style="text-align:right;">${tomb[ix].kor}</td>
                <td style="text-align:right;">${kosarlista[ix]}</td>
                </tr>
                `
            }
        }
        $("table").eq(0).html(szoveg + "</tbody>")
        window.print()
    })

    const toastTrigger = document.getElementById('liveToastBtn')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
            const toast = new bootstrap.Toast($('#liveToast'))

            toast.show()
        })
    }
}