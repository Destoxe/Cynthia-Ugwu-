
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    let tl =gsap.timeline();
    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
        y: "0",
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })
    tl.from("#herofooter", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    })
}

function mousesquees() {
    let timeout;
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;

    window.addEventListener('mousemove', function(dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100);
    });
}



function circleMouseFollower(xscale, yscale) {
    window.addEventListener('mousemove', function(dets) {
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    } );
}

circleMouseFollower();
firstPageAnim();
mousesquees();

document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;

    
    elem.addEventListener("mousemove", function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top; 
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;                 
    gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power1,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });
    });

    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });

});

// window.addEventListener("mousemove", function(circle){
//     document.querySelector('#minicircle').style.display = "block";
// });

document.addEventListener("DOMContentLoaded", function() {
    const minicircle = document.querySelector('#minicircle');

    // Event listener to display minicircle on mouse movement
    document.addEventListener("mousemove", function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        minicircle.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1, 1)`;
        minicircle.style.display = "block"; // Ensure minicircle is always displayed
    });

    // Event listener to hide minicircle when mouse leaves
    document.addEventListener("mouseleave", function() {
        minicircle.style.display = "none";
    });
});
