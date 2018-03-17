$(document).ready(() => {     
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    $("button").click(change);

    function change() {
        recognition.start();
    } 

    recognition.onresult = function(event) {
        const text = event.results[0][0]["transcript"];
        $(".text").text("You said: " + text);
        recognition.stop();
    } 
});
