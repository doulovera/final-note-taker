const copyToClipboard = async (str) => {
  try {
    await navigator.clipboard.writeText(str)
    return true
  } catch (err) {
    return false
  }
}

export const copyURL = async () => copyToClipboard(window.location.href)
