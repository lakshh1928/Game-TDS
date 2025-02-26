document.addEventListener("DOMContentLoaded", function () {
    // 🎲 HTP Modal Logic
    const modal = document.getElementById("htp-modal");
    const openModal = document.getElementById("htp");
    const closeModal = document.querySelector(".close");

    openModal.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // 🎯 Player Setup Logic
    const playersContainer = document.getElementById("players");
    const addPlayerButton = document.getElementById("add-player");
    const startGameButton = document.getElementById("start-game");
    const wheelContainer = document.getElementById("wheel-container");
    const playerSetup = document.getElementById("player-setup");
    const spinButton = document.getElementById("spin-button");

    let players = [];

    addPlayerButton.addEventListener("click", function () {
        const playerIndex = players.length + 1;
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");

        const input = document.createElement("input");
        input.type = "text";
        input.name = `player${playerIndex}`;
        input.placeholder = `Player ${playerIndex}`;
        input.required = true;

        playerDiv.appendChild(input);
        playersContainer.appendChild(playerDiv);
        players.push(input);
    });

    startGameButton.addEventListener("click", function () {
        if (players.length < 2) {
            alert("Add at least 2 players.");
            return;
        }

        // Store player names in an array
        let playerNames = players.map(playerInput => playerInput.value.trim()).filter(name => name !== "");

        if (playerNames.length < 2) {
            alert("Enter valid names for at least 2 players.");
            return;
        }

        // Hide player setup, show wheel
        playerSetup.classList.add("hidden");
        wheelContainer.classList.remove("hidden");

        console.log("Players:", playerNames); // Debugging log

        // Dynamically create wheel sections for players
        createWheel(playerNames);
    });

    spinButton.addEventListener("click", function () {
        spinWheel();
    });

    function createWheel(playerNames) {
        const wheel = document.getElementById("wheel");
        wheel.innerHTML = ""; // Clear previous wheel

        playerNames.forEach((name, index) => {
            const slice = document.createElement("div");
            slice.classList.add("wheel-slice");
            slice.innerText = name;
            wheel.appendChild(slice);
        });
    }

    function spinWheel() {
        const slices = document.querySelectorAll(".wheel-slice");
        if (slices.length === 0) {
            alert("No players to spin for!");
            return;
        }

        // Simulate random selection
        const randomIndex = Math.floor(Math.random() * slices.length);
        alert(`🎉 It's ${slices[randomIndex].innerText}'s turn!`);
    }
    function updateWheelText(playerName) {
        const wheel = document.getElementById("wheel");
        wheel.innerHTML = playerName.replace(/(.{8})/g, "$1<br>"); // Inserts line breaks every 8 characters
    }
    function adjustFontSize() {
        const wheel = document.getElementById("wheel");
        const text = wheel.innerText;
        if (text.length > 10) {
            wheel.style.fontSize = "16px";
        } else {
            wheel.style.fontSize = "20px";
        }
    }
    
});
