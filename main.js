/*
  TODO: Live preview instead of click to convert
*/

import { marked } from 'marked'
import { encode, decode } from 'js-base64'
import './styles/main.css'
import './styles/markdown.css'

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

/* Sanitize html ("<", ">") */
