const fileName = "VX7WzfvhjQGTVA1N";

function r2d (r) {
  return r * (180/Math.PI);
}
function d2r (d) {
  return d * (Math.PI/180);
}
function objectArray (all, name) {
  return all.filter(item => item.name== name )
}
const timelineObject = {
      repeat: -1,
      defaults: {
        ease: 'elastic(0.5, 0.43)',
        duration: 1
      }
    }
import { Application } from "https://esm.sh/@splinetool/runtime";
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
let allSwatches = document.querySelectorAll('.swatch');
let allWatches, swatchId = 2, currWatch, currSwatch, oldSwatch, backdrop;

app.load(`https://prod.spline.design/${fileName}/scene.splinecode`)
.then(() => {

  let allObjects = app.getAllObjects();

  allWatches = objectArray(allObjects, 'watchObj');
  backdrop = app.findObjectByName('backdrop');
  currWatch = allWatches[swatchId];


  allSwatches.forEach((c, i) => {

      allWatches[i].visible = false;

      c.addEventListener('click', (function () {
        swatchId = i;
        allWatches.forEach((c, i) => {
          c.visible = false;
        })
        currWatch = allWatches[i];
        currWatch.visible = true;
        setSwatchSelected();
        if(oldSwatch == currSwatch) return;
        gsap.to(currWatch.rotation, {
          x: d2r(-2.6),
          ease: 'wiggle({type:easeOut, wiggles: 2})',
          duration: 0.5
        })
      }));

    });

  const setSwatchSelected = () => {


    oldSwatch = !currSwatch ? allSwatches[0] : currSwatch;
    currSwatch = allSwatches[swatchId];
    oldSwatch.classList.remove("selected");
    currSwatch.classList.add("selected");

    if(oldSwatch == currSwatch) return;
     gsap.to(currSwatch, {
      duration: 0.12,
      scale:0.86,
      repeat: 1,
      yoyoEase: 'sine'
    })
 /* gsap.to(allSwatches, {
    scale: gsap.utils.distribute({
      duration: 0.12,
      base: 0.50,
      amount: -0.65,
      from: swatchId
    }),
  });
    */
  }

  let tl = gsap.timeline({
    onStart: function () { currWatch.visible = true; },
    onComplete: setSwatchSelected
  });
  tl.add('watchIn')
    .from(currWatch.position, {
      z: -2000,
      duration: 2,
      ease: 'power4'
    }, 'watchIn')
    .from(currWatch.rotation, {
      x: d2r(-540),
      //y: d2r(-360),
      duration: 2,
      ease: 'power4'
    }, 'watchIn')
  .add('swatchesIn', '-=1')
    .fromTo('.swatch', {
     opacity: 0,
      y: 0,
      scale: 0,
    },{
      scale: 1,
      y: 0,
      opacity: 1,
      ease: 'elastic(0.76, 0.346)',
      stagger: {
        each: 0.06
      },
      duration: 1.85
    }, 'swatchesIn')

 });