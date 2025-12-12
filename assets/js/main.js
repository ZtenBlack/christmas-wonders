$(document).ready(function () {
    //getting the gtag value
    const params = new URLSearchParams(window.location.search);
    let qtag = params.get('qtag');
    if (qtag) {
        sessionStorage.setItem('qtag', qtag);
    } else {
        qtag = sessionStorage.getItem('qtag');
    }
    if (qtag) {
        //const newUrl = `https://10black.net/api/affiliate/?qtag=${qtag}`;
        const newUrl = `https://10black.net/api/affiliate/?qtag=${qtag}&signup=false`;
        $('.modal__content-link').attr('href', newUrl);
        console.log(newUrl);
    }
    //language selection code
    const accessKey = 'd52fa6bf-a8a9-46c3-b195-2fcda479a705';
    if (!sessionStorage.getItem('countryChecked')) {
        $.ajax({
            url: 'https://apiip.net/api/check?&accessKey=' + accessKey,
            success: function (result) {
                console.log(result.countryCode);
                sessionStorage.setItem('countryChecked', 'true');
                if (result.countryCode === 'PL') {
                    window.location.href = '/pl';
                } else if (result.countryCode === 'PT') {
                    window.location.href = '/pt';
                } else if (result.countryCode === 'IT') {
                    window.location.href = '/it';
                } else if (result.countryCode === 'DE') {
                    window.location.href = '/de';
                } else if (result.countryCode === 'GR') {
                    window.location.href = '/el';
                } else if (result.countryCode === 'ES') {
                    window.location.href = '/es';
                } else if (result.countryCode === 'FR') {
                    window.location.href = '/fr';
                } else if (result.countryCode === 'KZ') {
                    window.location.href = '/kk';
                } else if (result.countryCode === 'BR') {
                    window.location.href = '/br';
                } else if (result.countryCode === 'RU') {
                    window.location.href = '/ru';
                } else if (result.countryCode === 'RS') {
                    window.location.href = '/sr';
                } else if (result.countryCode === 'TR') {
                    window.location.href = '/tr';
                } else {
                    window.location.href = '/';
                }
            }
        });
    }
    //play button code
    $(window).on('load', function () {
        $("body").on("click", function () {
            const audio = $('#background-sound')[0];
            const playIcon = $('.welcome__play').find('#icon-play');
            const pauseIcon = $('.welcome__play').find('#icon-pause');
            if (audio.paused) {
                audio.play();
                pauseIcon.hide();
                playIcon.show();
            }
        });
        $("#play-btn").on("click", function (e) {
            e.stopPropagation();
            const audio = $('#background-sound')[0];
            const playIcon = $('.welcome__play').find('#icon-play');
            const pauseIcon = $('.welcome__play').find('#icon-pause');
            if (audio.paused) {
                audio.play();
                pauseIcon.hide();
                playIcon.show();
            } else {
                audio.pause();
                pauseIcon.show();
                playIcon.hide();
            }
        });
    });
    //boxes code
    $(".welcome__box").on("click", function () {
        const clickedBox = $(this);
        const boxImage = clickedBox.find('#box-img');
        const fireBoxImage = clickedBox.find('#box-opening-img');
        boxImage.hide();
        clickedBox.addClass('active');
        fireBoxImage.show();
        fireBoxImage.addClass('active');
        setTimeout(() => {
            fireBoxImage.hide();
        }, 1400);
        const allBoxes = $('.welcome__box');
        allBoxes.not(clickedBox).addClass('hidden');
        $('.page__welcome').addClass('no-bg');
        $('.hide-after-anim').slideUp();
        playOpeningSound();
        let options = [10, 15, 20];
        let extra = options[Math.floor(Math.random() * options.length)];
        let freeMap = {
            10: 30,
            15: 35,
            20: 40
        };
        let free = `${freeMap[extra]} x 1€`;
        $('#free-spins').text(free);
        $('#extra-spins').text(extra);
        // $('#unique-id').text(generateNumber());
        if ($(window).width() < 768) {
            allBoxes.not(clickedBox).remove();
            $('.splide__pagination').hide();
            $('.welcome__boxes').addClass('active');
        }
    });
    function playOpeningSound() {
        const audio = document.getElementById('opening-sound');
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }
    $('.welcome__box').on('mouseenter', function () {
        const hoverSound = document.getElementById('hover-sound');
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => { });
        const backgroundSound = $('#background-sound')[0];
        const playIcon = $('.welcome__play').find('#icon-play');
        const pauseIcon = $('.welcome__play').find('#icon-pause');
        if (backgroundSound.paused) {
            backgroundSound.play();
            pauseIcon.hide();
            playIcon.show();
        }
    });
    // function generateNumber() {
    //     const STORAGE_KEY = "uniqueModalNumber";
    //     let savedNumber = localStorage.getItem(STORAGE_KEY);
    //     if (!savedNumber) {
    //         savedNumber = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    //         localStorage.setItem(STORAGE_KEY, savedNumber);
    //     }
    //     return savedNumber;
    // }
    //counter code
    let baseValue = 991;
    let savedValue = localStorage.getItem("liveUsers");
    let counter = savedValue ? parseInt(savedValue) : baseValue;
    function formatNumber(n) {
        return n.toLocaleString("en-US");
    }
    function animateNumber(from, to, duration = 600) {
        let start = performance.now();
        requestAnimationFrame(function step(ts) {
            let progress = Math.min((ts - start) / duration, 1);
            let value = Math.floor(from + (to - from) * progress);
            $("#counter").text(formatNumber(value));
            if (progress < 1) requestAnimationFrame(step);
        });
    }
    function updateCounter(delta) {
        if (delta < 0) delta = Math.abs(delta);
        let oldValue = counter;
        counter += delta;
        localStorage.setItem("liveUsers", counter);
        animateNumber(oldValue, counter);
    }
    function smallGrowth() {
        updateCounter(Math.floor(Math.random() * 3) + 1);
        setTimeout(smallGrowth, Math.random() * 2000 + 1500);
    }
    function bigGrowth() {
        updateCounter(Math.floor(Math.random() * 15) + 10);
        setTimeout(bigGrowth, Math.random() * 45000 + 30000);
    }
    $("#counter").text(formatNumber(counter));
    setTimeout(smallGrowth, 2000);
    setTimeout(bigGrowth, 10000);
});
// boxes slider code
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        loop: false,
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        breakpoints: {
            768: {
                enabled: false,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});