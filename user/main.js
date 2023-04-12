import { OBJEKTUMLISTA } from "../both/adat.js"
import * as THREE from '../js/three.module.js';

$(document).ready(function(){
   let nth=0
    textUpdate(nth)
   $("input").eq(0).on("click",function () {
    if(nth>0){
        nth--
        textUpdate(nth)
    }
    console.log(nth);
   })
   $("input").eq(1).on("click",function () {
    if(nth<OBJEKTUMLISTA.length-1){
        nth++
        textUpdate(nth)
    }
    console.log(nth);
    })
})

function textUpdate(nth) {
    $("#nev").text(OBJEKTUMLISTA[nth].nev)
    $("#szin").text(OBJEKTUMLISTA[nth].szin)
    $("#kor").text(OBJEKTUMLISTA[nth].kor)
}