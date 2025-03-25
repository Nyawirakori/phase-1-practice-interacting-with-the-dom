document.addEventListener("DOMContentLoaded", () => {
    const counterDisplay = document.getElementById("counter");
    const minusButton = document.getElementById("minus");
    const plusButton = document.getElementById("plus");
    const likeButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const likesList = document.querySelector(".likes");
    const commentInput = document.getElementById("comment-input");
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("list");

    let counterValue = 0;
    let timer;
    let isPaused = false;
    const likes = {};

    function updateCounterDisplay() {
        counterDisplay.textContent = counterValue;
    }

    function incrementCounter() {
        counterValue++;
        updateCounterDisplay();
    }

    function decrementCounter() {
        counterValue--;
        updateCounterDisplay();
    }

    function togglePause() {
        if (isPaused) {
            timer = setInterval(incrementCounter, 1000);
            plusButton.disabled = false;
            minusButton.disabled = false;
            likeButton.disabled = false;
            pauseButton.textContent = "pause";
            isPaused = false;
        } else {
            clearInterval(timer);
            plusButton.disabled = true;
            minusButton.disabled = true;
            likeButton.disabled = true;
            pauseButton.textContent = "resume";
            isPaused = true;
        }
    }

    function handleLike() {
        if (likes[counterValue]) {
            likes[counterValue]++;
        } else {
            likes[counterValue] = 1;
        }
        updateLikesDisplay();
    }

    function updateLikesDisplay() {
        likesList.innerHTML = "";
        for (const num in likes) {
            const listItem = document.createElement("li");
            listItem.textContent = `Number ${num}: ${likes[num]} likes`;
            likesList.appendChild(listItem);
        }
    }

    function addComment(commentText) {
        const commentElement = document.createElement("p");
        commentElement.textContent = commentText;
        commentList.appendChild(commentElement);
    }

    function startTimer(){
        timer = setInterval(incrementCounter, 1000);
    }
    
    setTimeout(startTimer, 0);

    plusButton.addEventListener("click", incrementCounter);
    minusButton.addEventListener("click", decrementCounter);
    likeButton.addEventListener("click", handleLike);
    pauseButton.addEventListener("click", togglePause);

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const commentText = commentInput.value;
        if (commentText.trim() !== "") {
            addComment(commentText);
            commentInput.value = "";
        }
    });
});