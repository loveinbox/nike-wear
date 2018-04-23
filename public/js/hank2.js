var screenHeight = document.body.clientHeight
var screenWidth = document.body.clientWidth

$('section:not(.cover)').css({
  transform: 'translateY(' + screenHeight + 'px)'
})

$('section.cover').css({
  transform: 'translateY(' + 0 + ')'
})

setTimeout(function () {
  $('section').css({display: 'block'})

  $('section.cover').css({
    'z-index': 0
  })
}, 1000)

setTimeout(function () {
  var domString = ''
  for (var i = 2; i <= 20; i++) {
    domString += '<div class="option-wrap"><img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/logo-' + i + '.svg"></div>'
  }
  $('.step-3 .input-wrap').append(domString)
  $('.step-3 .option-wrap img').click(changeSelected)

  $('.end').append('<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/00-end.jpg">')
}, 5000)

$('.cover').click(function () {
  $('.info').css({ transform: 'translateY(' + 0 + ')' });
})

$('.js-confirm').click(function () {
  // $(this).attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/confirm-selected.svg')
  $(this).parents('section').next().css({ transform: 'translateY(' + 0 + ')' });
})

function changeSelected() {
  $(this).parents('section').find('.--selected').removeClass('--selected')
  $(this).addClass('--selected')
}

$('.step-1 .img-wrap').click(changeSelected)
$('.step-2 .option-wrap').click(changeSelected)
