const burger = document.querySelector('.burger__menu')

burger.addEventListener('click', () => {
    burger.classList.toggle('open')
})

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header')

    header.classList.toggle('header__sticky', scrollY > 1100)
})

// Loading animation
TweenMax.to(".overlay h1", 2, {
    opacity: 0 ,
    y: -60 ,
    ease: Expo.easeInOut
})
TweenMax.to(".overlay span", 2, {
    delay: .3 ,
    opacity: 0 ,
    y: -60 ,
    ease: Expo.easeInOut
})
TweenMax.to(".overlay", 2, {
    delay: 1 ,
    top: "-100%" ,
    ease: Expo.easeInOut
})
TweenMax.from(".header ", 1, {
    delay: 2.5,
    opacity: 0 ,
    y: -100 ,
    ease: Expo.easeInOut
})
TweenMax.from(".banner__img--ttl ", 1, {
    delay: 3,
    opacity: 0 ,
    y: -100 ,
    ease: Expo.easeInOut
})

// Header animation
const showAnim = gsap.from('.header', { 
    yPercent: -100,
    paused: true,
    duration: 0.3
  }).progress(1);
  
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
});

// Scroll animation
function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("fromRight")) {
        x = 100;
        y = 0;
    }
    if(elem.classList.contains("fromTop")) {
        x = 0;
        y = -100;
    } else if (elem.classList.contains("fromBottom")) {
        x = 0;
        y = 100;
    }

    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.5, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto"
    });
}
  
function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
}
  
document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".animate").forEach(function(elem) {
        hide(elem);
      
        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) }, 
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) }
        });
    });
});