$(document).ready(() => {     
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    $(".thebutton").click(change);

    function change() {
        recognition.start();
    } 

    recognition.onresult = function(event) {
        const life = event.results[0][0]["transcript"];
        $(".memes").text(life);
        recognition.stop();
    } 

});
