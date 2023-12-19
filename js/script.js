import works from './work.js';

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const $white = '#faf9f7';
const $black = '#151515';
const $brown = '#9a7c63';
const $gray = '#858585';
const $blue = '#adcae4';

function init() {
  gsap.registerPlugin(ScrollTrigger);

  const flowline = sessionStorage.getItem('flowline');
  const main = document.querySelector('.main').dataset.type;

  switch (main) {
    case 'work':
      workPage();
      break;
    case 'contact':
      contactPage();
      break;
    case 'about':
      aboutPage();
      break;
    case 'main':
      if (flowline) mainPage();
    default:
      break;
  }
  if (!flowline) {
    sessionStorage.setItem('flowline', true);
    pageTransition();
  }

  headerAction();
  cursorAnimation();
}

function cursorAnimation() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';

  const onMouseMove = e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  };
  const onMouseDown = () => cursor.classList.add('clicked');
  const onMouseUp = () => cursor.classList.remove('clicked');
  const onMouseEnter = () => cursor.classList.remove('hidden');
  const onMouseLeave = () => cursor.classList.add('hidden');
  const onHoverOver = () => cursor.classList.add('hover');
  const onHoverLeave = () => cursor.classList.remove('hover');

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  document.querySelector('body').addEventListener('mouseenter', onMouseEnter);
  document.querySelector('body').addEventListener('mouseleave', onMouseLeave);

  document.querySelector('body').appendChild(cursor);

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseover', onHoverOver);
    el.addEventListener('mouseout', onHoverLeave);
  });
}

function headerAction() {
  const header = document.querySelector('header');
  const headerBtn = header.querySelector('.header-button__trigger');
  const headerBg = header.querySelector('.header_bg');

  headerBtn.addEventListener('click', function () {
    toggleClass(header, 'header--open');
  });

  const navigationLinks = document.querySelectorAll('.navigation__link');

  navigationLinks.forEach((item, index) => {
    item.addEventListener('mouseenter', e => {
      item.classList.add('navigation__link--active');
      if (index === 1) {
        header.classList.add('header--black');
      }
      headerBg.classList.add(`header_bg-${index + 1}`);
    });

    item.addEventListener('mouseleave', e => {
      item.classList.remove('navigation__link--active');
      header.classList.remove('header--black');
      headerBg.className = 'header_bg';
    });
  });
}

//work slide
function createWorkSlide(workObj, isFirst = false, filter) {
  let firstSlide = `<div class="swiper-slide first-slide">
                  <div>
                  <h2 class="work__heading">
                    <span class="work__heading__item">Great work</span>
                  </h2>
                  <h2 class="work__heading">  
                    <span class="work__heading__item">speaks</span>
                  </h2>
                  <h2 class="work__heading">
                    <span class="work__heading__item">louder than</span>
                  </h2>
                  <h2 class="work__heading">
                    <span class="work__heading__item">words.</span>
                  </h2>
                  </div>
                </div>`;

  let temp = '';
  if (isFirst) temp += firstSlide;

  workObj.forEach(item => {
    temp += `<div class="swiper-slide swiper-slide--${
      filter || item.type[0]
    } work-swiper__slide"
              data-type="${item.type.join(',')}">
              <div class="work-swiper__align">
                <div class="work-swiper__text-area">
                  ${item.renderText
                    .map((renderText, index) => {
                      return `<span class="work-swiper__type work-swiper__type--${item.type[index]}">${renderText}</span>`;
                    })
                    .join('')}
                  <a href="${item.url}" class="work-swiper__link">
                    <h3 class="work-swiper__heading plus_jakarta_sans">
                      ${item.title}
                    </h3>
                  </a>
                  <span class="work-swiper__date plus_jakarta_sans">${
                    item.date
                  }</span>
                  <p class="work-swiper__desc">
                    ${item.desc1}
                  </p>
                  <p class="work-swiper__desc">
                    ${item.desc2}
                  </p>
                  </div>
                  <div class="work-swiper__image-area">
                    ${item.images.map(
                      img => `<img src="${img}" alt="" />`
                    )}                      
                  </div>
                </div>
              </div>`;
  });

  return temp;
}

/* work page* */
function workPage() {
  const workSwiper = document.querySelector('#workSwiper');
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const swiperNavs = document.querySelectorAll('.work__nav-button');
  let swiper;
  swiperWrapper.innerHTML = createWorkSlide(works, true);

  //init animation
  const workTl = gsap.timeline({});

  workTl
    .staggerFromTo(
      '.work__heading__item',
      0.3,
      {
        autoAlpha: 0,
        y: 110
      },
      {
        autoAlpha: 1,
        y: 0
      },
      0.35
    )
    .add(() => workSwiper.classList.add('active'))
    .fromTo(
      '.work-swiper__align',
      0.3,
      {
        autoAlpha: 0,
        y: 30
      },
      {
        autoAlpha: 1,
        y: 0
      }
    )
    .fromTo(
      '.work__nav-button',
      0.1,
      { ease: Linear.easeNone, y: 20, autoAlpha: 0 },
      {
        ease: Linear.easeNone,
        autoAlpha: 1,
        y: 0
      }
    );

  swiper = new Swiper('#workSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    mousewheel: true,
    observer: true,
    observeParents: true,
    loop: true,
    loopedSlides: 1,
    direction: 'horizontal',
    speed: 600,
    parallax: true
  });

  const updateWorkSlide = (filter = '') => {
    let newWorks;
    if (filter === '') {
      newWorks = works;
    } else {
      newWorks = works.filter(work => work.type.includes(filter));
    }

    swiperWrapper.innerHTML = createWorkSlide(newWorks, filter === '', filter);

    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    swiper.slideTo(0);
    swiper.update();
  };

  for (let item of swiperNavs) {
    item.addEventListener('click', function () {
      swiperNavs.forEach(el => el.classList.remove('work__nav-button--active'));

      let filter = item.dataset.filter;

      updateWorkSlide(filter);

      item.classList.add('work__nav-button--active');
    });
  }
}

/* contact page */
function contactPage() {
  // contact page init animation
  const contactTl = gsap.timeline({});

  contactTl
    .fromTo(
      '.contact__heading',
      0.4,
      {
        opacity: 0,
        y: 70
      },
      {
        opacity: 1,
        y: 0
      }
    )
    .fromTo(
      '.contact__info',
      0.4,
      {
        opacity: 0,
        y: 70
      },
      {
        opacity: 1,
        y: 0
      },
      0.4
    )
    .fromTo(
      '.contact__right',
      0.4,
      {
        opacity: 0,
        y: 70
      },
      {
        opacity: 1,
        y: 0
      },
      0.7
    );

  const contactSwiper = document.querySelector('.contact-swiper');
  const control = document.querySelector('.contact__control');

  const fileInput = document.querySelector('#js-file');
  const filename = document.querySelector('.js-file-name');
  const fileWrap = document.querySelector('.file-form-group');
  const nextBtn = document.querySelector('.contact-swiper__button-next');
  const requestBtn = document.querySelector('.contact-swiper__button-request');
  const finishSlide = document.querySelector('.contact-finish-slide');

  const selectButtons = document.querySelectorAll('.contact-swiper__button');

  // 버튼 선택
  for (let item of selectButtons) {
    item.addEventListener('click', function () {
      let siblings = item.parentElement.children;
      for (let sib of siblings) {
        sib.classList.remove('contact-swiper__button--active');
      }
      item.classList.add('contact-swiper__button--active');
    });
  }

  //파일 업로드
  fileInput.addEventListener('change', function (e) {
    let name = e.target.files[0].name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.className = 'js-delete-file';
    deleteBtn.addEventListener('click', function () {
      deleteFile();
    });

    filename.innerHTML = `<em>${name}</em>`;
    filename.appendChild(deleteBtn);
    fileWrap.classList.add('active');
  });

  //파일 삭제
  function deleteFile() {
    fileInput.value = '';
    filename.innerHTML = ``;
    fileWrap.classList.remove('active');
  }

  new Swiper('.contact-swiper', {
    effect: 'fade',
    onlyExternal: true,
    noSwiping: true,
    allowTouchMove: false,
    navigation: {
      nextEl: '.contact-swiper__button-next',
      prevEl: '.contact-swiper__button-prev'
    },
    on: {
      slideChange: index => {
        if (index.snapIndex >= 4) {
          nextBtn.style.display = 'none';
          requestBtn.style.display = 'inline-flex';
        } else {
          nextBtn.style.display = 'block';
          requestBtn.style.display = 'none';
        }
      }
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    contactSwiper.style.display = 'none';
    control.style.display = 'none';
    finishSlide.style.display = 'block';
  }

  //전송 버튼
  requestBtn.addEventListener('click', handleSubmit, false);
}

function pageTransition() {
  const pageTransition = document.querySelector('.page-transition');
  pageTransition.style.display = 'flex';

  var pageTl = gsap.timeline({
    onComplete: function () {
      document.body.style.overflow = 'auto';

      mainPage();
    }
  });
  document.body.style.overflow = 'hidden';

  pageTl
    .to('.page-transition__text01', 0.8, {
      left: 0,
      ease: Power2.easeOut,
      delay: 0.06
    })
    .to(
      '.page-transition__text02',
      0.8,
      {
        left: 0,
        right: 0,
        ease: Power2.easeOut,
        delay: 0.06
      },
      0
    );

  pageTl
    .to('.page-transition__text-wrap', {
      autoAlpha: 0,
      display: 'none',
      delay: 0.6
    })
    .to(
      '.page-transition',
      1,
      {
        backgroundColor: $black
      },
      1.46
    )
    .to('.page-transition__flowline', {
      autoAlpha: 1,
      display: 'block'
    })
    .to('.page-transition', {
      autoAlpha: 0,
      display: 'none',
      delay: 1
    });
}
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function textAnimation() {
  let x = 0,
    y = 0;
  let targetX = 0,
    targetY = 0;
  const speed = 0.09;

  const text = document.querySelector('.tit__wrap');

  const info = document.querySelector('.info');

  info.addEventListener('mousemove', event => {
    x = event.pageX - window.innerWidth / 2;
    y = event.pageY - window.innerHeight / 2;
  });

  const loop = () => {
    targetX += (x - targetX) * speed;
    targetY += (y - targetY) * speed;
    text.style.transform = `translate(${targetX / 30}px, ${targetY / 30}px)`;

    window.requestAnimationFrame(loop);
  };
  loop();
}

/* main page */
function mainPage() {
  // info
  const infoTl = gsap.timeline({
    ScrollTrigger: '.info',
    start: 'top center',
    end: 'bottom bottom'
  });

  infoTl.staggerFromTo(
    '.typography__item',
    0.3,
    {
      opacity: 0,
      webkitFilter: 'blur(9px)'
    },
    {
      opacity: 1,
      webkitFilter: 'blur(0px)'
    },
    0.45
  );

  //what we do
  const whatWeDoTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.what_we_do',
      start: 'top center',
      end: 'bottom center'
    }
  });

  whatWeDoTl.staggerFromTo(
    '.what_we_do__item',
    0.3,
    {
      ease: Power2.easeOut,
      opacity: 0,
      y: 40
    },
    {
      ease: Power2.easeOut,
      opacity: 1,
      y: 0
    },
    0.5
  );

  //portfolie swiper
  new Swiper('.portfolio-swiper', {
    slidesPerView: 2.4,
    spaceBetween: 30,
    loop: true,
    loopedSlides: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 3500
    }
  });

  textAnimation();

  mainScrollAnimation();
}

function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

function mainScrollAnimation() {
  const aboutUS = document.querySelector('.about_us');
  let scrollNum = 0;
  let elementTop = aboutUS.offsetTop;
  let elementHeight = aboutUS.offsetHeight;
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  window.addEventListener('scroll', () => {
    scrollNum = window.scrollY;

    if (
      scrollNum + 184 > elementTop &&
      scrollNum < elementTop + elementHeight - 184
    ) {
      aboutUS.classList.remove('black');
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $white
      );
      document.documentElement.style.setProperty(
        '--theme-convert-color',
        $black
      );

      header.classList.add('header--black');
    } else {
      aboutUS.classList.add('black');
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $black
      );
      document.documentElement.style.setProperty(
        '--theme-convert-color',
        $white
      );
      header.classList.remove('header--black');
    }

    if (
      window.innerHeight + Math.round(scrollNum) >=
      document.body.offsetHeight
    ) {
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $blue
      );
      footer.classList.add('blue');
    } else {
      footer.classList.remove('blue');
    }
  });
}

/**about page */
function aboutPage() {
  const header = document.querySelector('header');
  const about = document.querySelector('.about');
  const typoHeadingLine = document.querySelectorAll('.typo__heading-line');

  // intro animation
  document.documentElement.style.setProperty(
    '--theme-background-color',
    $brown
  );
  about.classList.add('brown');

  var aboutTl = gsap.timeline({
    onComplete: function () {
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $black
      );
      about.classList.remove('brown');
    }
  });

  aboutTl
    .fromTo(
      '.about__heading-1',
      0.4,
      {
        ease: Power1.easeOut,
        x: -930
      },
      {
        ease: Power1.easeOut,
        x: 0
      },
      0.7
    )
    .fromTo(
      '.about__heading-2',
      0.6,
      { ease: Power1.easeOut, x: 900 },
      {
        ease: Power1.easeOut,
        x: 0
      },
      0.7
    )
    .fromTo(
      '.about__heading-3',
      0.6,
      { ease: Power1.easeOut, x: 1100 },
      {
        ease: Power1.easeOut,
        x: 0
      },
      0.8
    );

  //text line
  for (let line of typoHeadingLine) {
    let lineMask = document.createElement('span');
    lineMask.className = 'line-mask';
    line.appendChild(lineMask);
  }

  gsap.utils.toArray('.typo__heading-line').forEach(line => {
    let maskTl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
    maskTl.to(line.querySelector('.line-mask'), {
      width: '0%',
      duration: 4
    });
  });

  // principle
  const principleTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.principle__images',
      start: 'top center',
      end: 'bottom center'
    }
  });

  principleTl.staggerFromTo(
    '.principle__item',
    0.4,
    {
      ease: 'power3.out',
      opacity: 0,
      y: 20
    },
    {
      ease: 'power3.out',
      opacity: 1,
      y: 0
    },
    0.7
  );

  //wo its the flowline
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.so_its_the_flowline',
      start: 'top center',
      end: '+=200' // 200px past the start
    }
  });
  // tl2;

  tl2
    .staggerFromTo(
      '.so_its_the_flowline__item',
      0.2,
      {
        ease: 'power3.out',
        opacity: 0,
        y: 110
      },
      {
        ease: 'power3.out',
        opacity: 1,
        y: 0
      },
      0.4
    )

    .to(
      '.so_its_the_flowline',
      0.8,
      {
        backgroundColor: '#faf9f7',
        color: '#9a7c63'
      },
      1.2
    )
    .add(() => {
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $white
      );
      document.documentElement.style.setProperty('--theme-text-color', $brown);
      header.classList.add('header--black');
    });
}

init();
