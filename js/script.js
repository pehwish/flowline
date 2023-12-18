import works from './work.js';

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
                  <a href="#none" class="work-swiper__link">
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

  temp += '<div class="swiper-slide last-slide"></div>';

  return temp;
}

function workPage() {
  const workSwiper = document.querySelector('#workSwiper');
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  let temp = createWorkSlide(works, true);

  swiperWrapper.innerHTML = temp;
  let swiper;
  swiper = new Swiper('#workSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    mousewheel: true,
    observer: true,
    observeParents: true
  });

  const tl = gsap.timeline({
    onComplete: function () {
      workSwiper.classList.add('active');
    }
  });

  tl.staggerFromTo(
    '.work__heading__item',
    0.3,
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
    0.5
  );

  const tl2 = gsap.timeline({
    delay: 1.3
  });
  tl2
    .fromTo(
      '.work-swiper__align',
      0.4,
      {
        ease: 'power3.out',
        opacity: 0,
        y: 30
      },
      {
        ease: 'power3.out',
        opacity: 1,
        y: 0
      },
      0.7
    )
    .fromTo(
      '.work__nav',
      0.6,
      { ease: 'power3.out', opacity: 0 },
      {
        ease: 'power3.out',
        opacity: 1,
        y: 0
      }
    );

  const swiperNavs = document.querySelectorAll('.work__nav-button');

  for (let item of swiperNavs) {
    item.addEventListener('click', function () {
      swiperNavs.forEach(el => el.classList.remove('work__nav-button--active'));

      let filter = item.dataset.filter;

      let newWorks =
        filter === ''
          ? works
          : works.filter(work => work.type.includes(filter));
      let temp = createWorkSlide(newWorks, filter === '', filter);

      swiperWrapper.innerHTML = temp;

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateSlidesClasses();
      swiper.slideTo(0);
      swiper.update();

      item.classList.add('work__nav-button--active');
    });
  }
}

function contactPage() {
  const contactSwiper = document.querySelector('.contact-swiper');
  const control = document.querySelector('.contact__control');

  const fileInput = document.querySelector('#js-file');
  const filename = document.querySelector('.js-file-name');
  const fileWrap = document.querySelector('.file-form-group');
  const nextBtn = document.querySelector('.contact-swiper__button-next');
  const requestBtn = document.querySelector('.contact-swiper__button-request');
  const finishSlide = document.querySelector('.contact-finish-slide');

  const selectButtons = document.querySelectorAll('.contact-swiper__button');

  for (let item of selectButtons) {
    item.addEventListener('click', function () {
      let siblings = item.parentElement.children;
      for (let sib of siblings) {
        sib.classList.remove('contact-swiper__button--active');
      }
      item.classList.add('contact-swiper__button--active');
    });
  }
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

  function deleteFile() {
    fileInput.value = '';
    filename.innerHTML = ``;
    fileWrap.classList.remove('active');
  }

  var swiper = new Swiper('.contact-swiper', {
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
        console.log(index.snapIndex);
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
        backgroundColor: '#000'
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
function mainPage() {
  var swiper = new Swiper('.portfolio-swiper', {
    slidesPerView: 2.4,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 2500
    }
  });

  const tl = gsap.timeline({
    ScrollTrigger: '.info',
    start: 'top center',
    end: 'bottom bottom'
  });

  tl.staggerFromTo(
    '.typography__item',
    0.4,
    {
      opacity: 0,
      webkitFilter: 'blur(8px)'
    },
    {
      opacity: 1,
      webkitFilter: 'blur(0px)'
    },
    0.5
  );

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.what_we_do',
      start: 'top center',
      end: 'bottom center'
    }
  });

  tl2.staggerFromTo(
    '.what_we_do__item',
    0.3,
    {
      ease: Power2.easeOut,
      opacity: 0,
      y: 20
    },
    {
      ease: Power2.easeOut,
      opacity: 1,
      y: 0
    },
    0.5
  );

  textAnimation();
  let aboutUS = document.querySelector('.about_us');
  let scrollNum = 0;
  let elementTop = aboutUS.offsetTop;
  const styles = ['blue', 'black'];

  window.addEventListener('scroll', () => {
    scrollNum = window.scrollY;

    if (scrollNum + 200 >= elementTop && scrollNum + 200 < elementTop + 250) {
      aboutUS.classList.add('brown');
    } else if (scrollNum + 200 > elementTop + 250) {
      aboutUS.classList.remove('brown');
      aboutUS.classList.add('black');
    } else if (scrollNum + 200 < elementTop) {
      aboutUS.classList.remove('brown');
      aboutUS.classList.remove('black');
    }

    if (
      window.innerHeight + Math.round(scrollNum) >=
      document.body.offsetHeight
    ) {
      const footer = document.querySelector('footer');

      footer.className = `footer ${styles[getRandom(0, 1)]}`;
    }
  });
}

function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

function aboutPage() {
  console.log('about');

  const header = document.querySelector('.header');
  const about = document.querySelector('.about');
  document.body.style.backgroundColor = '#9a7c63';
  header.style.backgroundColor = '#9a7c63';
  about.classList.add('brown');

  var pageTl = gsap.timeline({
    onComplete: function () {
      document.body.style.backgroundColor = '#151515';
      header.style.backgroundColor = '#151515';
      about.classList.remove('brown');
    }
  });

  pageTl
    .fromTo(
      '.about__heading-1',
      0.4,
      {
        ease: 'power3.out',
        x: -930
      },
      {
        ease: 'power3.out',
        x: 0
      },
      0.7
    )
    .fromTo(
      '.about__heading-2',
      0.6,
      { ease: 'power3.out', x: 900 },
      {
        ease: 'power3.out',
        x: 0
      },
      0.7
    )
    .fromTo(
      '.about__heading-3',
      0.6,
      { ease: 'power3.out', x: 1100 },
      {
        ease: 'power3.out',
        x: 0
      },
      0.8
    );

  const typoHeadingLine = document.querySelectorAll('.typo__heading-line');

  for (let line of typoHeadingLine) {
    let lineMask = document.createElement('span');
    lineMask.className = 'line-mask';
    line.appendChild(lineMask);
  }

  gsap.utils.toArray('.typo__heading-line').forEach(line => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: 'top center',
        end: 'bottom center'
      }
    });
    tl.to(line.querySelector('.line-mask'), {
      width: '0%',
      duration: 4
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.principle__images',
      start: 'top center',
      end: 'bottom center'
    }
  });

  tl.staggerFromTo(
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
    );
}

init();
