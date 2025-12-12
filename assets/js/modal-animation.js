$('.welcome__box').on('click', function (i) {
    const box = $(this)[0].getBoundingClientRect()
    setTimeout(() => {
        $(".modal").fadeIn(200);
    }, 1300);
    const modal = $('.modal__content');
    const clickedBox = $(this);
    clickedBox.addClass('active');
    modal.css({
        display: 'block',
        position: 'fixed',
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        transform: 'scale(0.3) rotateX(50deg)',
        opacity: 0,
    });
    setTimeout(() => {
        modal.css({
            position: 'static',
            top: '50%',
            left: '50%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(0, 0) scale(1) rotateX(0deg)',
            opacity: 1
        });
    }, 1300);
    setTimeout(() => {
        playModalSound();
    }, 2200);
});

function playModalSound() {
    const audio = document.getElementById('modal-sound');
    audio.currentTime = 0;
    audio.play().catch(() => { });
}

