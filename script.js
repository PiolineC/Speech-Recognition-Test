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
        const success = parse(text);          
        const victor = checkVictory();

        //if a winner is declared, end the game
        if (victor) { 
            $('.turn').text(victor + ' wins!');
            $('button').text(victor + ' wins!');
        //if there is no winner, but the input was parsed, continue
        } else if (success) { 
            turn = turn === 'X' ? 'O' : 'X'; 
            $('.turn').text(`It is ${turn}'s turn.`)
            toggleButton('Record');
        //if the input could not be parsed, do nothing
        } else { 
            toggleButton('Record');
        }
    } 

    function parse(input) {
        let row = col = 0;
        switch(input) {
            case '1': case '2': case '3': 
            case '4': case '5': case '6': 
            case '7': case '8': case '9':   
                row = Math.ceil(input/3);
                col = input - ((row-1) * 3);
                break;
        }

        if (row === 0) return false; //invalid input

        table(row, col, turn);
        return true;
    }

    function checkVictory() {
        let cells = [];
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++)
                cells.push(table(i, j));
        }

        const winConditions = [
            [0, 1, 2], //row one
            [3, 4, 5], //row two
            [6, 7, 8], //row three
            [0, 3, 6], //column one
            [1, 4, 7], //column two
            [2, 5, 8], //column three
            [0, 4, 8], //main diagonal
            [2, 4, 6]  //back diagonal
        ];
        
        for (let i of winConditions) {
            const [a, b, c] = i;
            if (cells[a] === cells[b] && cells[a] === cells[c]) 
                return turn;            
        }
        return false;
    }

    function table(row, col, str) {
        const tableCell = 'table tr:nth-child(' + row + ') td:nth-child(' + col + ')';
        if (str) { 
            $(tableCell).text(str);
            $(tableCell).css({
                'vertical-align': 'middle',
                'font-family': 'Impact, Charcoal, sans-serif',
                'font-size': '6em'
            });
        }
        else return $(tableCell).text();
    }

    function toggleButton(text) {
        const state = $('button').prop('disabled');        
        $('button').prop('disabled', !state);
        if (text) $('button').text(text);
    }
});
