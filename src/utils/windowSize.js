// ! taking Width value (this should fix some orientation issues)

const getWindowSize = () => {
  let orientation = "unset"

  const value =
    window.innerWidth > window.innerHeight
      ? {
          px: window.innerWidth,
          orientation: "landscape",
        }
      : {
          px: window.innerWidth,
          orientation: "portrait",
        }

  const size =
    value.px <= 899 && value.px >= 460
      ? "tablet"
      : value.px < 460
      ? "mobile"
      : "desktop"

  return {
    orientation: value.orientation,
    // x: window.innerWidth, y: window.innerHeight,
    orient_string: orientation,
    size,
    px: value.px,
  }
}

export default getWindowSize
