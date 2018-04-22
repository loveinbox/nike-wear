var screenHeight = document.body.clientHeight
var screenWidth = document.body.clientWidth

$('section:not(.cover)').css({
  top: screenHeight,
  width: screenWidth,
  height: screenHeight
})

$('section.cover').css({
  top: 0,
  width: screenWidth,
  height: screenHeight
})

setTimeout(function () {
  $('section').css({display: 'block'})

  $('section.cover').css({
    'z-index': 0
  })
}, 500)

$('.cover').click(function () {
  $('.info').next().animate({ top: 0 });
})

$('.js-confirm').click(function () {
  $(this).attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/confirm-selected.svg')
  $(this).parents('section').next().animate({ top: 0 });
})