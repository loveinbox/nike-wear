var output = {
  company: '',
  name: '',
  mobile: '',
  email: '',
  inviter: '',
  color: '',
  size: '',
  number: '000',
  numberColor: 'yellow',
  letter: 'AAA',
  letterColor: 'yellow',
  logo: ''
}

var inputNumbers = '000'
var inputLetters = 'AAA'

setTimeout(function () {
  $('section.cover').css({
    'z-index': 0
  })
}, 1000)

setTimeout(function () {
  var domString = ''
  for (var i = 2; i <= 20; i++) {
    domString += '<div class="option-wrap" data-value="logo-' + i + '"><img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/logo-' + i + '.svg"></div>'
  }
  $('.step-3 .input-wrap').append(domString)
  $('.step-3 .option-wrap img').click(changeSelected)
  $('.js-logo-pick .option-wrap').click(function () {
    output.logo = $(this).attr('data-value')
  })

  $('.end').append('<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/00-end.jpg">')
}, 5000)

$('.cover').click(function () {
  $('.info').addClass('--show')
})

$('.js-confirm').click(function () {
  $(this).attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/confirm-selected.svg')
  $(this).closest('section').next().addClass('--show')
})

function changeSelected() {
  $(this).parents('section').find('.--selected').removeClass('--selected')
  $(this).addClass('--selected')
}

$('.step-1 .img-wrap').click(changeSelected)
$('.step-2 .option-wrap').click(changeSelected)

// actions
// 选取颜色
$('.js-color-pick .img-wrap').click(function () {
  output.color = $(this).attr('data-value')

  if (output.color === 'red') {
    $('.js-color-pick-wrap .js-color-1')
      .removeClass('--yellow')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
    $('.js-color-pick-wrap .js-color-1')
      .addClass('--white')
      .attr('data-color', 'white')
    $('.js-color-pick-wrap .js-color-2')
      .removeClass('--yellow')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
    $('.js-color-pick-wrap .js-color-2')
      .addClass('--yellow')
      .attr('data-color', 'yellow')
    output.numberColor = 'white'
    output.letterColor = 'white'
  }
  if (output.color === 'white') {
    $('.js-color-pick-wrap .js-color-1')
      .removeClass('--yellow')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
    $('.js-color-pick-wrap .js-color-1')
      .addClass('--black')
      .attr('data-color', 'black')
    $('.js-color-pick-wrap .js-color-2')
      .removeClass('--yellow')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
    $('.js-color-pick-wrap .js-color-2').addClass('--red')
      .addClass('--red')
      .attr('data-color', 'red')
    output.numberColor = 'black'
    output.letterColor = 'black'
  }
  if (output.color === 'black') {
    $('.js-color-pick-wrap .js-color-1')
      .removeClass('--yellow')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
    $('.js-color-pick-wrap .js-color-1')
      .addClass('--white')
      .attr('data-color', 'white')
    $('.js-color-pick-wrap .js-color-2')
      .removeClass('--yellow')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
    $('.js-color-pick-wrap .js-color-2')
      .addClass('--yellow')
      .attr('data-color', 'yellow')
    output.numberColor = 'white'
    output.letterColor = 'white'
  }
})

// 选取尺码
$('.js-size-pick .option-wrap').click(function () {
  output.size = $(this).attr('data-value')
})

// 输入数字出图
function printNumbers() {
  var imgs = ''
  inputNumbers.split('').forEach(function (item) {
    imgs += '<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/number-'
    + output.numberColor
    + '/number-'
    + item
    + '.svg">'
  })
  $('.js-input-number-show').empty().append(imgs)
}

$('#input-number').on('input', function() {
  var inputValue = $(this).val()

  if ($(this).val().length > 3) {
    $(this).val(inputValue.slice(0, 3))
  }

  inputNumbers = $(this).val()

  printNumbers()
});

$('.js-pick-number-color>div').click(function() {
  $(this).parent().find('.--selected').removeClass('--selected')
  $(this).addClass('--selected')
  output.numberColor = $(this).find('div').attr('data-color')

  printNumbers()
});

// 输入字母出图
function printLetters() {
  var imgs = ''
  inputLetters.split('').forEach(function (item) {
    imgs += '<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/letter-'
    + output.letterColor
    + '/letter-'
    + (item.charCodeAt(0) - 96)
    + '.svg">'
  })
  $('.js-input-letter-show').empty().append(imgs)
}

$('#input-letter').on('input', function(event) {
  var inputValue = $(this).val()

  if ($(this).val().length > 8) {
    $(this).val(inputValue.slice(0, 8))
  }

  inputLetters = $(this).val()

  printLetters()
});

$('.js-pick-letter-color>div').click(function() {
  $(this).parent().find('.--selected').removeClass('--selected')
  $(this).addClass('--selected')
  output.letterColor = $(this).find('div').attr('data-color')

  printLetters()
});

