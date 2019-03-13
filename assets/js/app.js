// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"
import 'bootstrap';
import $ from 'jquery';

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

$(document).ready(function () {
  $(".play").click(function(e){
    e.stopPropagation();

    //*** speech ***
    let say = $(this).attr("say")
    var msg = new SpeechSynthesisUtterance(say);
    msg.lang = 'en-US'
    msg.rate = 0.7

    //*** talk ***
    let answer = $(this).attr("answer")
    let answer_tag = $(this).parent().siblings("td.pronounce")
    console.log(answer_tag)
    let recognition = recognize(answer, answer_tag)

    // *** end speach
    msg.addEventListener('end', function () {
      console.log('stopped');
      setTimeout(function(){
        recognition.start();
      }, 1000)
    })

    //*** start speech ***
    window.speechSynthesis.speak(msg);

  })
});

let recognize = function(answer, answer_tag){
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  let finalTranscript = '';
  let recognition = new window.SpeechRecognition();

  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 10;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      let transcript = event.results[i][0].transcript;
      console.log(transcript)
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    answer_tag.html(finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>')
    //out = finalTranscript + interimTranscript
  }
  return recognition
}
