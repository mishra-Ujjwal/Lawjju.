function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()
console.log(window.LocomotiveScroll);
var cursor = document.querySelector(".cursor")
var main = document.querySelector(".main")
var cursorText = document.querySelector(".cursor .text")
let isCursorSet = false;
document.body.addEventListener("mousemove",function(dets){
    cursor.style.display="block";

     if (!isCursorSet) {
        gsap.set(cursor, {
            x: dets.clientX - 6.5,
            y: dets.clientY - 6.5
        });
        isCursorSet = true;
    }

    gsap.to(cursor,{
        x:dets.clientX-10,
        y:dets.clientY-10,
        ease:"power2.out"
    })
})
document.body.addEventListener("mouseleave",function(dets){
    cursor.style.display = "none";
    isCursorSet = false;
    })



function firstPageAnimation(){
var page1h1s = document.querySelectorAll(".page1-left h1")
page1h1s.forEach((h1,index)=>{
    gsap.from(h1,{
        y:100,
        duration:1,
    })
})
}
firstPageAnimation()

var page2Boxes = document.querySelectorAll(".box")
page2Boxes.forEach((box)=>{
  const image = box.querySelector("img");

  box.addEventListener("mouseenter", function() {
    cursorText.style.display = "block";
    gsap.to(cursor, { scale: 7 });
    gsap.to(image, { opacity: 1 });
  });

  box.addEventListener("mousemove", function(e) {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.x - 200;
    const y = e.clientY - rect.y -150;

    gsap.to(image, {
      x: x,
      y: y,
      duration: 0.3
    });
  });

  box.addEventListener("mouseleave", function() {
    cursorText.style.display = "none";
    gsap.to(cursor,{
         scale: 1 
        });
    gsap.to(image,{
         opacity: 0 
        });
  });
});

