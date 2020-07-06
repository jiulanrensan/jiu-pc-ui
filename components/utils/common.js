export const throttle = (fn, wait) => {
  let begin = null
  return () => {
    if (!begin) {
      begin = +new Date()
    } else {
      if (+new Date() - begin >= wait) {
        begin = null
        fn.apply(this, arguments)
      }
    }
  }
}

export const debounce = () => {}