// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"
import 'bootstrap';
import $ from 'jquery';
import 'babel-polyfill';

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import Speech from "./speech";
import Recognizer from "./recognizer";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

let period = 16000
let play_rows = ".row-tranlate"
$(document).ready(function () {
  $(".play").click(function(e){
    e.stopPropagation();

    //*** talk ***
    let answer = $(this).attr("answer")
    let card_id = $(this).attr("card_id")
    let answer_tag = $(this).parent().siblings("td.pronounce").children("span.speech")
    let increment_tag = $(this).parent().siblings("td.increment")
    let recognition = new Recognizer(answer, answer_tag, {card_id: card_id, increment_tag: increment_tag})

    //*** speech ***
    let say = $(this).attr("say")
    let speech = new Speech(say, recognition)
    speech.run()

    return false;
  })

  $(".list-play").click(function(e){
    e.stopPropagation();
    let speech_rows_intermals = []

    let play_rows_size = $(play_rows).length

    $(play_rows).each( function(index){
      if(index == ( play_rows_size - 1 )){
         var final_row = true
      }else{
        var final_row = false
      }

      let timer = setTimeout(()=>{
        play_row(this, final_row)
      }, index * period)

      speech_rows_intermals.push(timer)
    })

    return false;
  });

});

let sleep = function(ms) {
 return new Promise(res => setTimeout(res, ms));
}

let play_row = function(element, is_final){
  $(element).css("background", "#f2fbff")

  var title =  $(element).children("td.title").text()
  var translate = $(element).children("td.translate").text()

  let title_speech = new Speech(title)
  title_speech.run()

  let translate_speech = new Speech(translate, null, 'ru-RU')
  translate_speech.run()

  if(is_final){
    setTimeout(()=>{
      let _speech = new Speech("This is a last card in the list")
      _speech.run()
      $(play_rows).css("background", "#fff")
    }
    , 500)
  }
}
