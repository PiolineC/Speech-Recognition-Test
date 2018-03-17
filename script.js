$(document).ready(() => {     
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    recognition.lang = 'en-US';

    alert("hello");
    alert(recognition.lang);
    $(".thebutton").click(change);

    function change() {
        recognition.start();
    }

    recognition.onspeechend = function() {
        recognition.stop();
    }

    recognition.onresult = function(event) {
        $(".memes").text(event.results);
    }
});