import { marked } from 'marked'
import { encode, decode } from 'js-base64'

// Styles
import './styles/main.css'
import './styles/markdown.css'
import './styles/modal.css'

// Utils
import { copyURL } from './utils/copy-to-clipboard'
import { animateButton } from './utils/animate-button'

const DEFAULT_PREVIEW = true

const $ = (selector) => document.querySelector(selector)

const $editor = $('#editor')
const $preview = $('#preview')

let plainText = ''

$editor.addEventListener('input', () => {
  const text = $editor.value
  plainText = text

  const encoded = encode(text)
  window.history.replaceState({}, '', `/${encoded}`)
})

if (window.location.pathname && window.location.pathname !== '/') {
  const encoded = window.location.pathname.slice(1)
  const decoded = decode(encoded)

  plainText = decoded
  if (DEFAULT_PREVIEW) {
    $('#isPreview').checked = true
    $editor.classList.add('hidden')
    $preview.classList.remove('hidden')
    $preview.innerHTML = marked.parse(decoded)
  } else {
    $editor.value = decoded
    $editor.classList.remove('hidden')
    $preview.classList.add('hidden')
  }
}
const isFirstVisit = window.location.pathname && window.location.pathname === '/'
if (isFirstVisit) {
  $editor.value = ''
  $editor.classList.remove('hidden')
  $preview.classList.add('hidden')
}

function togglePreview () {
  const isPreview = $('#isPreview').checked

  if (isPreview) {
    $editor.classList.add('hidden')
    $preview.classList.remove('hidden')
    $preview.innerHTML = marked.parse(plainText)
  } else {
    $preview.classList.add('hidden')
    $editor.classList.remove('hidden')
    $editor.value = plainText
    $editor.focus()
  }
}

$('#isPreview').addEventListener('change', togglePreview)

document.addEventListener('keydown', (event) => {
  /* Ctrl + E to toggle preview */
  if (event.ctrlKey && event.key === 'e') {
    event.preventDefault()
    $('#isPreview').click()
  }
})

const $btnCopyUrl = $('#btnCopyUrl')
$btnCopyUrl.addEventListener('click', async (event) => {
  event.preventDefault()
  await copyURL()

  const animationClassName = 'fill-btn'
  const seconds = 1.5
  animateButton($btnCopyUrl, animationClassName, seconds * 1000)
})

const $whatsThis = $('.question-info')
const $modal = $('.modal')
const $closeModal = $('.close-modal')
const $closeModalBtn = $('.close-modal-btn')

const closeModal = () => $modal.classList.remove('show')

$whatsThis.addEventListener('click', () => $modal.classList.toggle('show'))

$closeModal.addEventListener('click', closeModal)
$closeModalBtn.addEventListener('click', closeModal)
