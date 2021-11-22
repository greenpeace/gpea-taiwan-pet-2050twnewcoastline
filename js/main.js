$(document).ready(function(){

  
  $(window).on('load', function(){
    //$('.map__iframe').attr('src', 'https://miaochien.shinyapps.io/LocationMap/');
  });


  var photoSliderInited = false;
  var BGVideo;
  BGVideo = document.querySelector('#BGVideo');

  var startPlayPromise = BGVideo.play();

  if (startPlayPromise !== undefined) {
    startPlayPromise.then(function(){
      BGVideo.muted = true;
      BGVideo.volume = 0;
      BGVideo.loop = true;
      BGVideo.play();
      // alert('playing')
    }).catch(error => {
      if (error.name === "NotAllowedError") {
        showPlayButton(BGVideo);
      } else {
        // Handle a load or playback error
      }
    });
  }


  

  var placeSlider1 = new Swiper('#placeSlider1 .swiper-container',{
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    },
    
    navigation: {
      nextEl: '#placeSlider1 .swiper-button-next',
      prevEl: '#placeSlider1 .swiper-button-prev',
    },
    on: {
      init: function(){
        this.slideTo(this.activeIndex - 1, 0, false);
      }
    },
    breakpoints: {
      780:{
        slidesPerView: 4,
        centeredSlides: false,
      }
    }
  });
  var slideFix = 1;
  $(window).on('resize', function(){
    if( window.matchMedia('(max-width: 780px)').matches ){
      slideFix = 0;
      if(!photoSliderInited){
        var photoSlider = new Swiper('#photoSlider.swiper-container',{
          slidesPerView: 1,
          loop: true,
          autoplay:{
            delay: 5000,
            disableOnInteraction: false,
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          
          pagination: {
            el: '#photoSlider .swiper-pagination',
            clickable: true
          }
        });
      }
      photoSliderInited = true;
    }else{
      slideFix = 1;
    }
  }).trigger('resize');
  placeSlider1.on('slideChange', function(){
    $('.place__stamp').removeClass('show');
  });
  placeSlider1.on('slideChangeTransitionEnd', function(){
    $('.place__stamp').removeClass('place__stamp--n place__stamp--c place__stamp--s');
    //var nowArea = $('#placeSlider1 .swiper-slide-active').attr('data-area')
    var nowArea = $('#placeSlider1 .swiper-slide').eq(this.activeIndex + slideFix).attr('data-area')
    $('.place__stamp').addClass('place__stamp--' + nowArea).addClass('show');
  });
  var oldStrgeetSlider = new Swiper('#oldStreetSlider .swiper-container',{
    slidesPerView: 1,
    loop: true,
    autoplay:{
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    
    pagination: {
      el: '#oldStreetSlider .swiper-pagination',
      clickable: true
    }
  });

  

  $('#selectArea').niceSelect();
  $('#selectArea').on("change", function(){
    $('.mayor').text($(this).find("option:selected").text());
  });


  $('.menu-btn').on('click', function(e){
    e.preventDefault();
    $('.nav').addClass('open');
    $('body').addClass('noscroll');
  });

  $('.nav__close').on('click', function(e){
    e.preventDefault();
    $('.nav').removeClass('open');
    $('body').removeClass('noscroll');
  });
  $('.nav__link').on('click', function(e){
    // e.preventDefault();
    
    $('.nav').removeClass('open');
    $('body').removeClass('noscroll');
    if(typeof $(this).attr('data-to') != 'undefined'){
      var goto = $('#' + $(this).attr('data-to')).offset().top;
      e.preventDefault();
      $('html, body').animate({scrollTop: goto});
    }
  });
  
  AOS.init({
    duration: 600,
  });

  $(document).on('aos:in:counter-1', function(e){
    //console.log($('.overview-tw__cont--1 .counter'))
    $('.overview-tw__cont .counter').text('0');
    setTimeout(function(){
      countTo($('.overview-tw__cont--1 .counter'), 0, Number($('.overview-tw__cont--1 .counter').attr('data-max')));
    },1100);
    setTimeout(function(){
      countTo($('.overview-tw__cont--2 .counter'), 0, Number($('.overview-tw__cont--2 .counter').attr('data-max')));
    },1200);
    setTimeout(function(){
      countTo($('.overview-tw__cont--3 .counter'), 0, Number($('.overview-tw__cont--3 .counter').attr('data-max')));
    },1300);
    
  });

  var mapLoaded = false;
  $(window).on('scroll', function(){
    if($(this).scrollTop() + $(this).height() >= $('#search').offset().top && !mapLoaded){
      $('.map__iframe').attr('src', 'https://miaochien.shinyapps.io/LocationMap/');
      //console.log('map')
      mapLoaded = true;
    }
  });
  
  
});

function countTo(el, current, max, run){
  var run = run || 0;
  // if (current == max) return;
  // if (current > max){
  //   el.text(max);
  //   return;
  // }
  if(run >= 1000){
    el.text(max);
    return;
  }

  var ms = 1000/10;
  run += ms;

  
  
  //var sumFactor = max <= 100 ? 2 : max <= 500 ? 3 : parseInt(max / 100);
  var sumFactor = Math.floor(max / 10);
  var value = current + sumFactor;
  //console.log(value)
  setTimeout(function(){
    el.text(value);
    countTo(el, value, max, run);
    //console.log(el,value)
  },ms);



}



$(function() {
  
  
});

Pace.on('done', function(){
  AOS.refresh();
  
});