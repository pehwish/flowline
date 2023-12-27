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

const device = {
  phone: 480,
  mobile: 767,
  tablet: 768,
  underDesktop: 1024,
  desktop: 1280,
  overDesktop: 1440,
  maxDesktop: 1980
};

let images = [];
//이미지 프리로드
const preLoadImg = images => {
  images.forEach(image => {
    const img = new Image();
    img.src = image;
  });
};

async function init() {
  gsap.registerPlugin(ScrollTrigger);
  await preLoadImg([
    '/flowline/assets/home_image01.png',
    '/flowline/assets/home_image02.png',
    '/flowline/assets/main_portfolio_01.jpg',
    '/flowline/assets/main_portfolio_02.jpg',
    '/flowline/assets/main_portfolio_03.jpg',
    '/flowline/assets/main_portfolio_04.jpg',
    '/flowline/assets/main_portfolio_05.jpg',
    '/flowline/assets/main_portfolio_06.jpg',
    '/flowline/assets/main_portfolio_07.jpg',
    '/flowline/assets/main_portfolio_08.jpg',
    '/flowline/assets/main_portfolio_09.jpg',
    '/flowline/assets/main_portfolio_10.jpg',
    '/flowline/assets/page-transition__bg.png',
    '/flowline/assets/about_img01.png',
    '/flowline/assets/about_img02.png',
    '/flowline/assets/about_img03.png'
  ]);

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

  cursorAnimation();
  headerAction();
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
                  <a href="${
                    item.url
                  }" class="work-swiper__link" target="_blank">
                    <h3 class="work-swiper__heading plus_jakarta_sans">
                      ${item.title}
                    </h3>
                  </a>
                  
                  <span class="work-swiper__date plus_jakarta_sans">${
                    item.date
                  }</span>
                  <div class="work-swiper__mobile_image">
                    <img src="${item.mobile_image}" alt="" class="mobile_img" />
                  </div>
                  <p class="work-swiper__desc">
                    ${item.desc1}
                  </p>
                  <p class="work-swiper__desc">
                    ${item.desc2}
                  </p>
                  </div>
                  <div class="work-swiper__image-area">
                    <img src="${item.image}" alt="" class="pc_img" />
                    
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
  const swiperNav = document.querySelector('.work__nav');
  let swiper;
  swiperWrapper.innerHTML = createWorkSlide(works, true);
  let scrollNum = 0;

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

  const resizeSwiper = () => {
    if (window.innerWidth >= device.desktop && !swiper) {
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
    } else if (window.innerWidth < device.desktop && swiper) {
      swiper.destroy();
      swiper = null;
    }
  };

  window.addEventListener('resize', resizeSwiper);

  resizeSwiper();

  const updateWorkSlide = (filter = '') => {
    let newWorks;
    if (filter === '') {
      newWorks = works;
    } else {
      newWorks = works.filter(work => work.type.includes(filter));
    }

    swiperWrapper.innerHTML = createWorkSlide(newWorks, filter === '', filter);

    if (window.innerWidth >= device.desktop && !swiper) {
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateSlidesClasses();
      swiper.slideTo(0);
      swiper.update();
    } else if (window.innerWidth < device.desktop) {
      if (filter !== '') {
        swiperNav.classList.add('work__nav--fixed');
        workSwiper.classList.add('work-swiper--fixed');
      } else {
        swiperNav.classList.remove('work__nav--fixed');
        workSwiper.classList.remove('work-swiper--fixed');
      }
      lenis.scrollTo(0, 0);
    }
  };

  for (let item of swiperNavs) {
    item.addEventListener('click', function () {
      swiperNavs.forEach(el => el.classList.remove('work__nav-button--active'));

      let filter = item.dataset.filter;

      updateWorkSlide(filter);

      item.classList.add('work__nav-button--active');
    });
  }

  //swiper-slide-active
  let swiperNavTop = swiperNav.offsetTop;

  window.addEventListener('scroll', () => {
    scrollNum = window.scrollY;
    let filterType = document.querySelector('.work__nav-button--active').dataset
      .filter;

    let swiperSlide = document.querySelectorAll('.swiper-slide');

    if (window.innerWidth < device.desktop) {
      // mobile mode

      swiperSlide.forEach(item => {
        if (
          item.offsetTop <= scrollNum + 55 &&
          scrollNum <= item.offsetTop + item.offsetHeight
        ) {
          if (!item.classList.contains('.swiper-slide-active')) {
            item.classList.add('swiper-slide-active');
          }
        } else {
          item.classList.remove('swiper-slide-active');
        }
      });

      if (scrollNum + 55 > swiperNavTop && filterType === '') {
        swiperNav.classList.add('work__nav--fixed');
      } else if (filterType !== '') {
        swiperNav.classList.add('work__nav--fixed');
        workSwiper.classList.add('work-swiper--fixed');
      } else {
        swiperNav.classList.remove('work__nav--fixed');
        workSwiper.classList.remove('work-swiper--fixed');
      }
    }
  });
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
    )
    .to('.page-transition__text-wrap', {
      display: 'none',
      delay: 0.6
    })
    .to(
      '.page-transition',
      1,
      {
        backgroundColor: $black,
        delay: 0.6
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
    0.67,
    {
      opacity: 0,
      webkitFilter: 'blur(9px)'
    },
    {
      opacity: 1,
      webkitFilter: 'blur(0px)'
    },
    0.5
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
    slidesPerView: 1.7,
    spaceBetween: 18,
    loop: true,
    loopedSlides: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 3500
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },

      1024: {
        slidesPerView: 2.4,
        spaceBetween: 30
      }
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
  header.classList.add('header--main-no-scroll');

  window.addEventListener('scroll', () => {
    scrollNum = window.scrollY;
    if (scrollNum < 40) {
      header.classList.add('header--main-no-scroll');
    } else {
      header.classList.remove('header--main-no-scroll');
    }

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
  });
}

/**about page */
function aboutPage() {
  const header = document.querySelector('header');
  const about = document.querySelector('.about');
  const typoHeadingLine = document.querySelectorAll('.typo__heading-line');

  if (window.scrollY <= about.offsetHeight) {
    document.documentElement.style.setProperty(
      '--theme-background-color',
      $brown
    );
    about.classList.add('brown');
  }

  // intro animation
  var aboutTl = gsap.timeline({});

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
    )
    .add(() => {
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $black
      );
      about.classList.remove('brown');
    }, 2);

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

  //so its the flowline
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.principle__list',
      start: 'bottom 30%',
      end: '+=100' // 200px past the start,
    }
  });
  // tl2;

  tl2
    .add(() => {
      document.documentElement.style.setProperty(
        '--theme-background-color',
        $white
      );
      document.documentElement.style.setProperty('--theme-text-color', $brown);
      header.classList.add('header--black');
    })
    .staggerFromTo(
      '.so_its_the_flowline__item',
      0.4,
      {
        ease: 'power3.out',
        opacity: 0,
        y: 60
      },
      {
        ease: 'power3.out',
        opacity: 1,
        y: 0
      },
      0.4,
      0.8
    );
}

init();
