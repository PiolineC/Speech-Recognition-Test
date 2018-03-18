$(document).ready(() => {     
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    let turn = "X";

    $("button").click(change);

    function change() {
        recognition.start();
    } 

    function parse(str) {
        let row = 0;
        let col = 0;
        switch(str){
            case 'one': row = 0; col = 0; break;
            case 'two': row = 0; col = 1; break;
            case 'three': row = 0; col = 2; break;
            case 'four': row = 1; col = 0; break;
            case 'five': row = 1; col = 1; break;
            case 'six': row = 1; col = 2; break;
            case 'seven': row = 2; col = 0; break;
            case 'eight': row = 2; col = 1; break;
            case 'nine': row = 2; col = 2; break;

            $("table tr:nth-child(" + row + ") td:nth-child(" + col + ")").text(turn);
        }
        turn = turn === 'X' ? 'O' : 'X'; 
        recognition.start();
    }

    recognition.onresult = function(event) {
        const text = event.results[0][0]["transcript"];
        $(".text").text("You said: " + text);
        recognition.stop();
        parse(text);
    } 
});
