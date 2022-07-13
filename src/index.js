function init(fn) {
  if (document.readyState !== 'loading') return fn()
  document.addEventListener('DOMContentLoaded', fn)
}

function select(selector) {
  return document.documentElement.querySelector(selector)
}

function selectAll(selector) {
  return document.documentElement.querySelectorAll(selector)
}

function route(screen) {
  selectAll('.screen').forEach(function (item) {
    item.classList.remove('active')
  })
  select(screen).classList.add('active')

  var theme = select(screen).dataset.theme || 'black'
  console.log(theme)
  document.documentElement.classList.value = theme
}

init(function () {
  let about = false
  select('[href="#about"]').addEventListener('click', function (event) {
    about = !about
    select('#about').classList.toggle('active')
    event.currentTarget.innerText = about
      ? 'BACK TO QUIZ'
      : 'Why is this important?'
    event.preventDefault()
  })

  selectAll('.u-action').forEach(function (item) {
    item.addEventListener('click', function (event) {
      if (item.dataset.target) {
        route(event.currentTarget.dataset.target)
        event.preventDefault()
      }
    })
  })
})
