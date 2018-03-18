$(document).ready(() => {     
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    let turn = 'X';

    $('button').click(onClick);

    function onClick() {
        recognition.start();
        toggleButton('Recording in progress...');
    } 

    recognition.onresult = function(event) {              
        recognition.stop(); 
        const text = event.results[0][0]['transcript'];
        $('.input').text('You said: ' + text);         
        parse(text);        
    } 

    function parse(input) {
        let row, col = 0;
        switch(input) {
            case '1': case '2': case '3': 
            case '4': case '5': case '6': 
            case '7': case '8': case '9':   
                row = Math.ceil(input/3);
                col = input - ((row-1) * 3);
                break;
        }

        if (row === 0 || col === 0) {
            toggleButton("Click me");
            return;
        }

        table(row, col, turn);
        const victor = checkVictory();
        if (victor.won) {
            $('.turn').text(victor.winner + ' wins!');
            $('button').text(victor.winner + ' wins!');
        } else {            
            turn = turn === 'X' ? 'O' : 'X'; 
            $('.turn').text(`It is ${turn}'s turn.`)
            toggleButton("Click me");
        }
    }

    function checkVictory() {
        cells = [];
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++)
                cells.push(table(i, j));
        }
        
        if (cells[0] === cells[1] && cells[1] === cells[2] || //row one
            cells[3] === cells[4] && cells[4] === cells[5] || //row two
            cells[6] === cells[7] && cells[7] === cells[8] || //row three
            cells[0] === cells[3] && cells[3] === cells[6] || //column one
            cells[1] === cells[4] && cells[4] === cells[7] || //column two
            cells[2] === cells[5] && cells[5] === cells[8] || //column three
            cells[0] === cells[4] && cells[4] === cells[8] || //main diagonal
            cells[2] === cells[4] && cells[4] === cells[6]    //back diagonal
        ) {
            return {won: true, winner: turn};
        } else {
            return {won: false};
        }
    }

    function table(row, col, str) {
        const tableCell = 'table tr:nth-child(' + row + ') td:nth-child(' + col + ')';
        if (str) $(tableCell).text(str);
        else return $(tableCell).text();
    }

    function toggleButton(text) {
        const state = $('button').prop('disabled');        
        $('button').prop('disabled', !state);
        if (text) $('button').text(text);
    }
});
