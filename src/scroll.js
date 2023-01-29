//! --------------------------------- Smooth Scrolling ----------------------------------------

$(document).ready(function($) {
    console.log("click");
    $('.smoothscroll').on('click',function (e) {
         e.preventDefault();
         
         var target = this.hash,
         $target = $(target);
 
         $('html, body').stop().animate({
             'scrollTop': $target.offset().top
         }, 800, 'swing', function () {
             window.location.hash = target;
         });
     });
   
 });
 
 
 TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);
