function init() {
  gsap.registerPlugin(ScrollTrigger);

  pageTransition();
  mainAnimation();
}

const logoImagesArray = [
  '/assets/download-0.png',
  '/assets/download-1.png',
  '/assets/download-2.png',
  '/assets/download-3.png',
  '/assets/download-4.png',
  '/assets/download-5.png',
  '/assets/download-6.png',
  '/assets/download-7.png',
  '/assets/download-8.png',
  '/assets/download-9.png'
];

function pageTransition() {
  var pageTl = gsap.timeline();
  const pageContainer = document.createElement('div');
  const pageLogo = document.createElement('div');
  pageLogo.classList.add('page-transition__logo');
  pageContainer.classList.add('page-transition');

  pageContainer.appendChild(pageLogo);
  document.body.appendChild(pageContainer);

  document.body.style.overflow = 'hidden';

  let index = 0;
  let interval = setInterval(() => {
    if (index === logoImagesArray.length) {
      clearInterval(interval);

      pageTl.fromTo(
        pageContainer,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.5,
          transformOrigin: 'top center',
          ease: 'power1.in',
          onComplete: () => {
            document.body.style.overflowY = 'auto';
          }
        }
      );
    }
    pageLogo.style.backgroundImage = `url(${logoImagesArray[index]})`;
    index++;
  }, 150);
}
function textAnimation() {
  let x = 0,
    y = 0;
  let targetX = 0,
    targetY = 0;
  const speed = 0.09;

  const textAll = document.querySelectorAll('.text-main__heading');

  const intro = document.querySelector('.intro');

  intro.addEventListener('mousemove', event => {
    x = event.pageX - window.innerWidth / 2;
    y = event.pageY - window.innerHeight / 2;
  });

  const loop = () => {
    targetX += (x - targetX) * speed;
    targetY += (y - targetY) * speed;
    for (text of textAll) {
      text.style.transform = `translate(${targetX / 30}px, ${targetY / 30}px)`;
    }

    window.requestAnimationFrame(loop);
  };
  loop();
}
function mainAnimation() {
  const frame = document.querySelector('.intro__frame');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#main',
      start: 'top top',
      end: `start+=50px`, //??????
      scrub: true,
      once: true
    }
  });

  tl.to(frame, {
    scale: 4,
    duration: 6,
    display: 'block'
  }).to(frame, {
    autoAlpha: 0,
    duration: 1,
    display: 'none',
    onComplete: textAnimation
  });

  //   const tl2 = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '#main',
  //       start: 'top+=50px',
  //       end: `bottom center`,
  //       scrub: true
  //     }
  //   });
  //   tl2.to('.intro__video', 5, {
  //     y: window.innherHeight, // or $(window).heigth()
  //     yPercent: -100
  //   });

  gsap.utils.toArray('.widget').forEach((widget, index) => {
    const endTrigger = gsap.utils.toArray('.endtrigger')[index];

    ScrollTrigger.create({
      trigger: widget,
      pin: true,
      start: 'top top',
      endTrigger
      //   markers: true
    });
  });
}

init();
