// counter_1
$(document).ready(function(){
  const counters = document.querySelectorAll('.counter');

for (let n of counters) {
    const updateCount = () => {
        const target = +n.getAttribute('data-target');
        const count = +n.innerText;
        const divider = 5000;
        const speed = 10; // 1000 millisecond => 1 second;

        const inc = target / divider;

        if (count < target) {
            n.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, speed);
        } else {
            n.innerText = target;
        }
    };
    updateCount();
}
})
//counter_2
$('.countfect').each(function(){
    var $this=$(this),
    countTo=$this.attr('data-num');
    delayTo=$this.attr('delay');
    if(!delayTo){delayTo=8000}
    $({countNum:$this.text()})
    .animate({countNum:countTo},
        {duration:delayTo,easing:'linear',
            step:function(){$this.
                text(Math.floor(this.countNum));
            },complete:function(){$this.text(this.countNum)
                ;}});
            });

//counter_3
$('.countfectt').each(function(){
    var $this=$(this),
    countTo=$this.attr('data-num');
    delayTo=$this.attr('delay');
    if(!delayTo){delayTo=9000}
    $({countNum:$this.text()})
    .animate({countNum:countTo},
        {duration:delayTo,easing:'linear',
            step:function(){$this.
                text(Math.floor(this.countNum));
            },complete:function(){$this.text(this.countNum)
                ;}});
            });

//animation_1
new WOW().init();
//anination_2
AOS.init();
//animation_3


const BLUR_RANGE_CHECK_REGEXP = /^blrng\_([0-9]+)\_([0-9]+)\_([0-9]+)\_(0|1)$/;
const HUE_RANGE_CHECK_REGEXP = /^blhue\_([0-9]+)\_([0-9]+)\_([0-9]+)\_([0-9]+)\_(0|1)$/;
const MOVE_RANGE_CHECK_REGEXP = /^blmove\_([0-9]+)\_([0-9]+)\_([0-9]+)$/;

let blurElms = [];
let isError = false;

const initBlurMotion = () => {
    let elm = null;

    blurElms = $('.bm');

    blurElms.each((index) => {
        elm = blurElms[index];

        //blur range
        elm.blrngMin = 0;
        elm.blrngMax = 10;
        elm.blrngCurrent = 0;
        elm.blrngDir = 1;

        //hue range
        elm.blhueMin = 0;
        elm.blhueMax = 360;
        elm.blhueCurrent = 0;
        elm.blhueIdRange = 1;
        elm.blhueDir = 1;

        //move range
        elm.blmoveMin = 0;
        elm.blmoveMax = 100;
        elm.blmoveDur = 5000;

        let elmClassNames = elm.className.split(' ');

        let className = null;
        $(elmClassNames).each((index) => {
            if (!isError) {
                className = elmClassNames[index];
                if (className.match(BLUR_RANGE_CHECK_REGEXP) !== null) {
                    const values = className.split('_');
                    const blrngMin = parseInt(values[1]);
                    const blrngMax = parseInt(values[2]);
                    const blrngCurrent = parseInt(values[3]);
                    const blrngDir = parseInt(values[4]);

                    if (isError = checkMinAndMaxValue(blrngMin, blrngMax)) {
                        console.log(`blur value error: lower or upper limits are incorrect. ${className}`);
                    }

                    if (isError = checkCurrentValueRange(blrngCurrent, blrngMin, blrngMax)) {
                        console.log(`blur value error: the initial value is incorrect. ${className}`);
                    }

                    if (!isError) {
                        elm.blrngMin = blrngMin;
                        elm.blrngMax = blrngMax;
                        elm.blrngCurrent = blrngCurrent;
                        elm.blrngDir = blrngDir;
                        $(elm).css('filter', `blur(${elm.blrngCurrent}px)`);
                    }
                }

                if (className.match(HUE_RANGE_CHECK_REGEXP) !== null && !isError) {
                    const values = className.split('_');
                    const blhueMin = parseInt(values[1]);
                    const blhueMax = parseInt(values[2]);
                    const blhueCurrent = parseInt(values[3]);
                    const blhueIdRange = parseInt(values[4]);
                    const blhueDir = Boolean(values[5]);

                    if (isError = checkMinAndMaxValue(blhueMin, blhueMax)) {
                        console.log('hue value error: lower or upper limits are incorrect');
                    }

                    if (isError = checkCurrentValueRange(blhueCurrent, blhueMin, blhueMax)) {
                        console.log('hue value error: the initial value is incorrect.');
                    }

                    if (!isError) {
                        elm.blhueMin = blhueMin;
                        elm.blhueMax = blhueMax;
                        elm.blhueCurrent = blhueCurrent;
                        elm.blhueIdRange = blhueIdRange;
                        elm.blhueDir = blhueDir;
                        $(elm).css('filter', `hue-rotate(${elm.blhueCurrent}deg)`);
                    }
                }

                if (className.match(MOVE_RANGE_CHECK_REGEXP) !== null && !isError) {
                    const values = className.split('_');
                    const blmoveMin = parseInt(values[1]);
                    const blmoveMax = parseInt(values[2]);
                    const blmoveDur = parseInt(values[3]);

                    if (isError = checkMinAndMaxValue(blmoveMin, blmoveMax)) {
                        console.log('move value error: lower or upper limits are incorrect');
                    }

                    elm.blmoveMin = blmoveMin;
                    elm.blmoveMax = blmoveMax;
                    elm.blmoveDur = blmoveDur;
                }
            }
        })
    })
    if (!isError) {
        startAnim();
    }
}

/**
 * start blur animation
 * @return result
 */
const startAnim = () => {
    setInterval(blurAndHueAnim, 100);
    moveAnim();
}

/**
 * execute blur and hue animation
 * @return result
 */
const blurAndHueAnim = () => {
    let elm = null;
    blurElms.each((index) => {
        elm = blurElms[index];
        //blur
        if (elm.blrngCurrent === elm.blrngMin) {
            elm.blrngDir = true;
        }
        if (elm.blrngCurrent === elm.blrngMax) {
            elm.blrngDir = false;
        }

        elm.blrngDir ? elm.blrngCurrent++ : elm.blrngCurrent--;

        // hue
        if (elm.blhueCurrent < elm.blhueMin) {
            elm.blhueDir = true;
        }
        if (elm.blhueCurrent > elm.blhueMax) {
            elm.blhueDir = false;
        }

        elm.blhueDir ? elm.blhueCurrent += elm.blhueIdRange : elm.blhueCurrent -= elm.blhueIdRange;

        $(elm).css('filter', `blur(${elm.blrngCurrent}px) hue-rotate(${elm.blhueCurrent}deg)`);
    })
}

/**
 * execute move animation
 */
const startMoveAnim = () => {
    moveAnim();
}

/**
 * execute move animation
 */
const moveAnim = () => {
    let elm = null;
    let minVal = 0;
    let maxVal = 0;
    let top = 0;
    let left = 0;
    blurElms.each((index) => {
        elm = blurElms[index];
        minVal = 0;
        maxVal = 0;
        maxValue = elm.blmoveMax - elm.blmoveMin;
        top = Math.floor((Math.random() * (elm.blmoveMax - elm.blmoveMin)) + elm.blmoveMin);
        left = Math.floor((Math.random() * (elm.blmoveMax - elm.blmoveMin)) + elm.blmoveMin);
        $(elm).animate({ top: `${top}%`, left: `${left}%` }, elm.blmoveDur, 'linear', () => { moveAnim(elm) });
    })
}

/**
 * check min and max value
 * @param minVal min value
 * @param maxVal max value
 * @return check result
 */
const checkMinAndMaxValue = (minVal, maxVal) => {
    return minVal > maxVal ? true : false;
}

/**
 * check current and min and max value
 * @param currentVal current value
 * @param minVal min value
 * @param maxVal max value
 * @return check result
 */
const checkCurrentValueRange = (currentVal, minVal, maxVal) => {
    return (currentVal < minVal) || (maxVal < currentVal) ? true : false;
}

$(() => {
    initBlurMotion();
});
//parallax _1
$('.parallax-window').parallax({
    naturalWidth: 600,
    naturalHeight: 400
  });
  //parallax_2
//   parallax($('.element'), 15, true)
//parallax_3
$(document).ready(function(){
    $('.water').ripples({
        dropRadius: 12,
        perturbance:0.01,
        
        });
})
//skider_1
$(document).ready(function(){
    $(".banner_carousel").owlCarousel({
      loop:true,
      items:1,
      nav:true,
      smartSpeed:1000,

    });
    });
    //mixitup_3
    $(document).ready(function(){
        var mixer = mixitup('#fillter', {
            animation: {
                duration: 300
            }
        });
    })
    
    //prealoder
    // javaScript code here

// jQuery code here
$(function () {
    // preloader start
    $(window).load(function () {
      $("#loading").fadeOut(400);
    });
    // preloader end
  });
  //slick slider_3
  $(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        speed:300,
    });
  });