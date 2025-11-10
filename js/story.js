// Story Navigation for AFilm Game

// Navigate to specific page within an episode
function goToPage(pageNumber) {
    // Hide all story screens
    document.querySelectorAll('.story-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById('page-' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Quiz functionality
let currentQuizAnswer = null;
let quizAttempted = false;

function selectQuizVideo(videoId, correctAnswer) {
    // Mark selected video
    document.querySelectorAll('.quiz-video-item').forEach(item => {
        item.classList.remove('selected');
    });

    const selectedVideo = document.querySelector(`[data-video-id="${videoId}"]`);
    if (selectedVideo) {
        selectedVideo.classList.add('selected');
    }

    currentQuizAnswer = videoId;
}

function checkQuizAnswer(correctAnswer, successPage, errorPage) {
    if (!currentQuizAnswer) {
        alert('Пожалуйста, выберите видео!');
        return;
    }

    quizAttempted = true;

    if (currentQuizAnswer === correctAnswer) {
        // Correct answer - show success page
        goToPage(successPage);
    } else {
        // Incorrect answer - show error page
        goToPage(errorPage);
    }
}

function retryQuiz(quizPage) {
    // Reset quiz state
    currentQuizAnswer = null;
    quizAttempted = false;

    // Remove selection classes
    document.querySelectorAll('.quiz-video-item').forEach(item => {
        item.classList.remove('selected', 'correct', 'incorrect');
    });

    // Go back to quiz page
    goToPage(quizPage);
}

// Ending choice functionality
function chooseEnding(endingPage) {
    goToPage(endingPage);
}

// Initialize story page on load
document.addEventListener('DOMContentLoaded', function() {
    // Make sure first page is active on load
    const firstPage = document.getElementById('page-1');
    if (firstPage && !document.querySelector('.story-screen.active')) {
        firstPage.classList.add('active');
    }

    // Add click handlers for quiz videos
    document.querySelectorAll('.quiz-video-item').forEach(item => {
        item.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const correctAnswer = this.closest('[data-correct-answer]')?.getAttribute('data-correct-answer');
            if (videoId) {
                selectQuizVideo(videoId, correctAnswer);
            }
        });
    });

    // Keyboard navigation (optional)
    document.addEventListener('keydown', function(e) {
        // You can add keyboard shortcuts here if needed
        // For example: Arrow keys to navigate between pages
    });
});
