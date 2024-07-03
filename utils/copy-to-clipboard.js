const copyToClipboard = async (str) => {
  try {
    await navigator.clipboard.writeText(str)
    console.log('Copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export const copyURL = async () => {
  await copyToClipboard(window.location.href)
}
