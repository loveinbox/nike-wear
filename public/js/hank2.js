var output = {
  company: '',
  name: '',
  mobile: '',
  email: '',
  inviter: '',
  color: 'red',
  size: 'L',
  number: '',
  numberColor: 'yellow',
  letter: '',
  letterColor: 'yellow',
  logo: ''
}

var inputNumbers = ''
var inputLetters = ''

setTimeout(function () {
  $('section.cover').css({
    'z-index': 0
  })
  $('.cover').append(
        '<img class="text" src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/cover-end/text.svg">'
        + '<img class="moving-arrow" src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/arrow.svg">'
        )
}, 1000)

setTimeout(function () {
  var domString = ''
  for (var i = 1; i < 20; i++) {
    domString += '<div class="option-wrap can-pick" data-value="logo-' 
      + i 
      + '"><img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/logo-with-text/logo-' 
      + i 
      + '.svg"></div>'
  }
  $('.step-3 .input-wrap').append(domString)
  $('.step-3 .option-wrap').click(changeSelected)
  $('.js-logo-pick .option-wrap').click(function () {
    output.logo = $(this).attr('data-value')
    $('.js-team-logo').attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/logo-no-text/' + output.logo + '.svg')
  })
}, 5000)

$('.cover').on('touchmove', function () {
  $('.info').addClass('--show')
})

$('.js-info-done').click(function () {
  output.company = $('.js-company').val()
  output.name = $('.js-name').val()
  output.mobile = $('.js-mobile').val()
  output.email = $('.js-email').val()
  output.inviter = $('.js-inviter').val()
})

$('.js-confirm').click(function () {
  var currentButton = $(this)
  currentButton.attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/confirm-selected.svg')
  currentButton.closest('section').next().addClass('--show')

  setTimeout(function () {
    currentButton.attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/confirm.svg')
  }, 1000)
})
$('.js-reset').click(function (){
  var currentButton = $(this)

  currentButton.attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/reset-selected.svg')
  $('.js-resetable').removeClass('--show')
  setTimeout(function () {
    currentButton.attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/reset.svg')
  }, 1000)
})

function changeSelected() {
  if ($(this).hasClass('can-pick')){
    $(this).parents('section').find('.--selected').removeClass('--selected')
    $(this).closest('.option-wrap.can-pick').addClass('--selected')
  }
}

$('.option-wrap').click(changeSelected)

// 选取尺码
$('.js-size-pick .option-wrap').click(function () {
  output.size = $(this).attr('data-value')
})

// 输入数字出图
function printNumbers() {
  var showImgs = ''
  var finalImgs = ''

  output.number = inputNumbers
  inputNumbers.split('').forEach(function (item) {
    showImgs += '<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/number-'
    + output.numberColor
    + '/number-'
    + item
    + '.svg">'
  })

  inputNumbers.split('').forEach(function (item) {
    finalImgs += '<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/number-'
    + (output.numberColor === 'black' ? 'solid-black' : output.numberColor)
    + '/number-'
    + item
    + '.svg">'
  })
  $('.js-input-number-show').empty().append(showImgs)
  $('.js-final-back .number-wrap').empty().append(finalImgs)
}

$('#input-number').on('input', function() {
  var inputValue = $(this).val()

  if ($(this).val().length > 2) {
    $(this).val(inputValue.slice(0, 2))
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
  var showImgs = ''
  var finalImgs = ''

  output.letter = inputLetters
  inputLetters.split('').forEach(function (item) {
    showImgs += '<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/letter-'
    + output.letterColor
    + '/letter-'
    + (item.charCodeAt(0) - 64)
    + '.png">'
  })
  inputLetters.split('').forEach(function (item) {
    finalImgs += '<img src="https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/letter-'
    + (output.letterColor === 'black' ? 'solid-black' : output.letterColor)
    + '/letter-'
    + (item.charCodeAt(0) - 64)
    + '.png">'
  })
  $('.js-input-letter-show').empty().append(showImgs)
  $('.js-final-back .text-wrap').empty().append(finalImgs)
}

$('#input-letter').on('input', function(event) {
  var inputValue = $(this).val().toUpperCase()

  // 过滤非字符和点
  $(this).val(inputValue.match(/[A-Z]*/)[0].toUpperCase())

  // 限制长度
  if (inputValue.length > 8) {
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

$('.js-complete').click(function () {
  $.ajax({
      url: '/write', 
      type: 'POST', 
      contentType: 'application/json', 
      data: JSON.stringify(output)}
  ).success(function () {
  });
})

var store = {
  red: [ 'L', 'XLL'],
  white: [ 'L','M' ,'S' ,'XL' ,'XLL'],
  black: [ 'L','M' ,'XL' ,'XLL']
}

setSizeStatue('red')

function setSizeStatue(color) {
  var isTheFirst = true

  $('.js-size-pick .option-wrap').each(function (item, index) {
    $(this).removeClass('can-pick')
      .removeClass('not-can-pick')
      .removeClass('--selected')
    var canPick = store[color].indexOf($(this).attr('data-value')) > -1

    if (canPick) {
      $(this).addClass('can-pick')
      if (isTheFirst) {
        $(this).addClass('can-pick --selected')
        isTheFirst = false
      }
    } else {
      $(this).addClass('not-can-pick')
    }
  })
}

function changePrintColor(color) {
  // swtich (color) {
    printNumbers()
    printLetters()
    setSizeStatue(color)
  // }
}

// actions
// 选取颜色
$('.js-color-pick .option-wrap').click(function () {
  output.color = $(this).attr('data-value')

  $('.js-color-pick-wrap>div').removeClass('--selected')
  $('.js-color-pick-wrap>div:first-child').addClass('--selected')

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
    changePrintColor('red')
    $('.js-nike-logo').attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/nike-logo.svg')
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
    $('.js-color-pick-wrap .js-color-2')
      .addClass('--red')
      .attr('data-color', 'red')
    output.numberColor = 'black'
    output.letterColor = 'black'
    changePrintColor('white')
    $('.js-nike-logo').attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/nike-logo-black.svg')
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
    changePrintColor('black')
    $('.js-nike-logo').attr('src', 'https://chi-2018.oss-cn-hangzhou.aliyuncs.com/04-22/nike-logo.svg')
  }

  // 更换Tee的颜色
  $('.final-back')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
      .addClass('--' + output.color)
  $('.final')
      .removeClass('--white')
      .removeClass('--black')
      .removeClass('--red')
      .addClass('--' + output.color)
})

