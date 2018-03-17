const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
alert("hello");
alert(recognition.lang);


function change(){
    alert("hello");
    document.getElementById("h2").innerHTML = "kill me";
}
