$(document).ready(function() {
    // 漢堡選單 start
    $('.List_meun').click(function(e) {
        e.preventDefault();
        $('body').addClass('Opem_Side')
    });
    $('.Side_Close').click(function(e) {
            e.preventDefault();
            $('body').removeClass('Opem_Side')
        })
        // 漢堡選單 end

    // slide效果 start
    $('.scrollTop').click(function(e) {
        e.preventDefault();
        let target = $(this).attr('href');
        let targetPos = $(target).offset().top;
        $('html, body').animate({ scrollTop: targetPos }, 1500);
    });
    // slide效果 end
    $(window).scroll(function() {
        let scrollPos = $(window).scrollTop(); //取滾動值
        let windowHeight = $(window).outerHeight(); //取包含padding的高

        $('.animated').each(function() {
            let thisPos = $(this).offset().top;
            console.log(thisPos)
            if ((windowHeight + scrollPos) >= thisPos) {
                $(this).addClass('fadein');
            }
        });
        $('.wrap').css('background-position-x', -(scrollPos / 1) + 'px');
        $('.content_Works').css('background-position-y', (scrollPos / 20) + 'px')
    });

    // Swiper_start
    const mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })
        // Swiper_end
});