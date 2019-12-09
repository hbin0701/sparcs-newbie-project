var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: false })
    .add({
        targets: '.ml15 .word',
        scale: [3, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 200 * i
    }).add({
        targets: '.ml3 .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1050,
        delay: (el, i) => 20 * (i + 1)
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 5000000,
        easing: "easeOutExpo",
        delay: 1000
    });

