export const animateButton = (button, classNameAnimation, milliseconds, classNameFinal = undefined) => {
  button.classList.remove(classNameAnimation)
  button.classList.add(classNameAnimation)

  setTimeout(() => {
    button.classList.remove(classNameAnimation)
    if (classNameFinal !== undefined) button.classList.add(classNameFinal)
  }, milliseconds)
}
