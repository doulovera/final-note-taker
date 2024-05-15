import { encode, decode } from 'js-base64';

import './style.css'

const $ = (selector) => document.querySelector(selector)

const $textarea = $('#content')

$textarea.addEventListener('input', () => {
  const text = $textarea.value
  const encoded = encode(text)
  
  window.history.replaceState({}, '', `/${encoded}`)
})

if (window.location.pathname && window.location.pathname !== '/') {
  const encoded = window.location.pathname.slice(1)
  const decoded = decode(encoded)
  $textarea.value = decoded
}
