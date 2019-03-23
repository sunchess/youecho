export default class Recognizer{
  constructor(answer, tag){
    this.tag    = tag;
    this.answer = answer
    this.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new this.SpeechRecognition;

    //config
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 10;
    this.recognition.continuous = false;

    this.init_event()
    return this.recognition
  }

  init_event(){
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript   = '';

      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      this.tag.html(finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>')
    }
  }

}
