export function throttle (callback, interval) {
  let trottleTimeout

  return function () {
    const now = Date.now()
    if (!trottleTimeout || trottleTimeout <= now) {
      trottleTimeout = now + interval
      callback()
    }
  }
}

export function debonce (callback, interval) {
  let debonceTimeout

  return function () {
    clearTimeout(debonceTimeout)
    debonceTimeout = setTimeout(callback, interval)
  }
}
