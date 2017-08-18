window.onload = function() {


    var playerName = document.querySelectorAll('.player-name');
    var rollButton = document.querySelector('.roll-button');
    var diceImage = document.querySelector('.dice-image');
    var randomDiceNumber;
    var currentDiceNumber = 0;
    var score = document.querySelectorAll('.score-number');
    var turnText = document.querySelectorAll('.turn-text');
    var givenTitle = document.querySelectorAll('.given-title');
    var holdButton = document.querySelectorAll('.hold-button');
    var changeName = document.querySelectorAll('.change-name');
    var startNewGame = document.querySelector('.start-new-game');
    var winMessage = document.querySelector('.win-message');
    var screenCover = document.querySelector('.screen-cover');
    var screenTextContent = document.querySelector('.screen-text-content');
    //set the focus when the window loads on the input field of the first player
    playerName[0].focus();

    //track the clicks and generate a random number between 1 and 6
    rollButton.addEventListener('click', function() {

        randomDiceNumber = Math.floor(Math.random() * 10 + 1);

        if (randomDiceNumber > 6) {
            randomDiceNumber -= 4;
        }
        //change the image attribute based on the random generated number
        diceImage.setAttribute('src', 'img/dice-' + randomDiceNumber + '.png');
        //reset the score if the dice equals "1"
        var active = document.querySelector('.active');
        if (randomDiceNumber !== 1) {
            currentDiceNumber += randomDiceNumber;
            active.innerHTML = currentDiceNumber;
        } else {
            //grey out the roll button
            this.setAttribute('disabled', true);
            this.classList.toggle('greyed-out-class');
            this.classList.toggle('roll-button');

            active.innerHTML = 0;
            turnText[0].classList.toggle('rotate-class');
            turnText[1].classList.toggle('rotate-class');
            score[0].classList.toggle('active');
            score[1].classList.toggle('active');

            //set the currentDice number to add itself to the existing number of the switched player
            var accumulatedNumber = document.querySelector('.active').textContent;
            accumulatedNumber = parseInt(accumulatedNumber);

            currentDiceNumber = accumulatedNumber;
            //switch roll button classes to make the switch process more natural
            setTimeout(function() {
                //remove the disabled attribute and toggle the button classes after 1.5 seconds
                rollButton.removeAttribute('disabled');
                rollButton.classList.toggle('greyed-out-class');
                rollButton.classList.toggle('roll-button');
            }, 1500);

        }
        active = document.querySelector('.active');

        if (parseInt(active.textContent) >= 100) {
            active.innerHTML = 100;
            screenCover.setAttribute('style', 'visibility:visible');
            screenTextContent.setAttribute('style', 'visibility:visible');

            //select the player name that is closest to the active class at the time when the count reaches 100 for the score 
            var playerName = document.querySelector('.active').parentElement.previousElementSibling.firstChild.textContent;
            console.log(playerName);
            winMessage.innerHTML = '<span class="winner">' + playerName + '</span>' + ' won the game!';

        }
    });

    //function to trigger rotation and to change the name when entering a new one as well as hiding the input field

    function nameChange(input, name, button, text) {
        input.addEventListener('keydown', function(e) {
            if (e.keyCode === 13) {
                name.innerHTML = "";
                name.innerHTML = this.value;
                this.classList.toggle('hide-elements');
                button.classList.toggle('hide-elements');
            }
        });
    }

    nameChange(playerName[0], givenTitle[0], changeName[0], turnText[0]);

    nameChange(playerName[1], givenTitle[1], changeName[1], turnText[1]);


    //function to hide the change name button and display the input field for a new value to be typed in
    function hideInput(input, name) {
        input.addEventListener('click', function() {
            name.classList.toggle('hide-elements');
            name.value = "";
            name.focus();
            this.classList.toggle('hide-elements');

        });
    }

    hideInput(changeName[0], playerName[0]);
    hideInput(changeName[1], playerName[1]);



    //function to use to target the two turn text elements when pressing the hold button
    function rotateText(element, text1, text2) {
        element.addEventListener('click', function() {
            if (text2.classList.contains('rotate-class')) {
                text1.classList.toggle('rotate-class');
                text2.classList.toggle('rotate-class');
                score[0].classList.toggle('active');
                score[1].classList.toggle('active');
                var accumulatedNumber = document.querySelector('.active').textContent;
                accumulatedNumber = parseInt(accumulatedNumber);
                console.log(accumulatedNumber);
                currentDiceNumber = accumulatedNumber;

            } else {
                return;
            }
        });
    }
    rotateText(holdButton[0], turnText[0], turnText[1]);
    rotateText(holdButton[1], turnText[1], turnText[0]);

    startNewGame.addEventListener('click', function() {
        window.location.href = window.location.href;
    });

    console.log(document.querySelector('.active').parentElement.previousElementSibling.firstChild.textContent);

};