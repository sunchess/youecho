export default class Recognizer{
  constructor(answer, tag, options={}){
    this.card_id = options.card_id
    this.increment_tag = options.increment_tag
    this.tag     = tag;
    this.answer  = answer
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

      if(interimTranscript.length == 0){
        console.log(finalTranscript)

        var splited_answer = this.answer.split(" ").map(function(word){
          var word = word.toLowerCase()
          var word = word.replace(/(,|\.|\:|\; |\-)/g, '')
          return word
        })

        var splited_final = finalTranscript.split(" ").map(function(word){
          var word = word.toLowerCase()
          var word = word.replace(/(,|\.|\:|\; |\-)/g, '')
          return word
        })

        //compare arrays
        if(splited_answer.length === splited_final.length && splited_answer.sort().every(function(value, index) { return value === splited_final.sort()[index]})){
          let tag = this.increment_tag

          //send +1 to card
          fetch('/api/cards/' + this.card_id, {method: 'PATCH'}).then(function(response) {
            response.json().then(function(body){
              tag.html(body.count)
            });
          })
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
        }
      }

      this.tag.html(finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>')
    }
  }

}
