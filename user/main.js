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
    $("#hatra").on("click", function () {
        if (nth > 0) {
            nth--;
            textUpdate(nth, tomb);
        }
        // console.log(nth);
    });
    $("#elore").on("click", function () {
        if (nth < tomb.length - 1) {
            nth++;
            textUpdate(nth, tomb);
        }
        //console.log(nth);
    });

    let text = "";
    for (let ix = 0; ix < tomb.length; ix++) {
        text += `<div class="oldal"></div>`;
        $("#menu").html(text);
        $(".oldal").on("click", function () {
            let ix = 0;
            while (!$(".oldal").eq(ix).is(this)) ix++;
            nth = ix;
        });
    }

    $("#vasarol").on("click", function () {
        if ($("#db").val() != "" && $("#db").val() > 0)
            kosarlista[nth] += parseInt($("#db").val());
        // console.log($("#db").val());
        //console.log(nth);
        console.log(kosarlista);
        $("#tetel").text(kosarlista.filter(function (key) { return key > 0 }).length)
    });


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
                    <input type="number" value="${kosarlista[ix]}" class="form-control" aria-label="db">
                    <span class="input-group-text">db</span>
                </div>
              </div>
              <p id="K${ix}" class="card-text" style="font-size: xx-large; cursor:pointer;">❌💨</p>  
            </div>
          </div>
        </div>
      </div>`
            kosarTorolEvent(ix)
        }
        $("#lista").html(szoveg)
    }
    $("#vasarlas").on("click", function () {
        let lista=[]
        for (let ix = 0; ix < kosarlista.length; ix++) {
            if(kosarlista[ix]>0)
                lista.push(tomb[ix])
        }
        a(lista)

        console.log(kosarlista.filter(function (key) { return key > 0 }));
    })

    function a(tomb) {
        let szoveg = `<thead><tr class="table-dark">
        <th>név</th>
        <th>szín</th>
        <th>kor</th>
        </tr></thead><tbody>`
        for (let ix = 0; ix < tomb.length; ix++) {
            szoveg += `<tr>
            <th>${tomb[ix].nev}</th>
            <td>${tomb[ix].szin}</td>
            <td>${tomb[ix].kor}</td>
            </tr>
            `
        }
        $("table").eq(0).html(szoveg + "</tbody>")
    }
}