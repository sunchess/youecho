export default class Speech {
  constructor(text, recognizer, lang){
    this.msg = new SpeechSynthesisUtterance(text);
    this.msg.lang = lang || 'en-US';
    this.msg.rate = 0.8;

    this.callback = recognizer;

    // *** end speach
    if(this.callback){
      this.msg.addEventListener('end', ()=> {
        this.callback.start()
      })
    }
  }

  //*** start speech ***
  run(){
    window.speechSynthesis.speak(this.msg);
  }

}

