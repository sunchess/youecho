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
$(document).ready(function () {
  $(".play").click(function(e){
    e.stopPropagation();

    //*** talk ***
    let answer = $(this).attr("answer")
    let answer_tag = $(this).parent().siblings("td.pronounce").children("span.speech")
    let recognition = new Recognizer(answer, answer_tag)

    //*** speech ***
    let say = $(this).attr("say")
    let speech = new Speech(say, recognition)
    speech.run()

    return false;
  })

  $(".list-play").click(function(e){
    e.stopPropagation();
    let speech_rows_intermals = []

    $(".row-tranlate").each( function(index){
      let timer = setTimeout(()=>{
        play_row(this)
      }, index * period)

      speech_rows_intermals.push(timer)
    })

    return false;
  });

});

let sleep = function(ms) {
 return new Promise(res => setTimeout(res, ms));
}

let play_row = function(element){
  $(element).css("background", "#f2fbff")

  var title =  $(element).children("td.title").text()
  var translate = $(element).children("td.translate").text()

  let title_speech = new Speech(title)
  title_speech.run()

  let translate_speech = new Speech(translate, null, 'ru-RU')
  translate_speech.run()
}
