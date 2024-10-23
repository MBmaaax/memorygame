document.addEventListener('DOMContentLoaded', () => {
    const animals = [
        '🐶', '🐱', '🦁', '🐸', 
        '🐻', '🐼', '🐵', '🐧',
        '🐶', '🐱', '🦁', '🐸', 
        '🐻', '🐼', '🐵', '🐧'
    ];

    // Shuffle animals array
    shuffleArray(animals);

    const gameBoard = document.getElementById('gameBoard');
    let flippedCards = [];
    let matchedPairs = 0;

    // Create game cards
    animals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.dataset.index = index;

        card.addEventListener('click', () => {
            if (card.classList.contains('flipped') || flippedCards.length === 2) return;

            // Flip the card
            card.classList.add('flipped');
            card.textContent = animal;

            flippedCards.push(card);

            // Check for match
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 800);
            }
        });

        gameBoard.appendChild(card);
    });

    // Shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Check for a match
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.animal === card2.dataset.animal) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === animals.length / 2) {
                setTimeout(() => alert('Congratulations! You matched all pairs!'), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
        }

        flippedCards = [];
    }
});
