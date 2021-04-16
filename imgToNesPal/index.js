
const colors = [
  [0x00, 0x00, 0x00],
  [0xfc, 0xfc, 0xfc],
  [0xf8, 0xf8, 0xf8],
  [0xbc, 0xbc, 0xbc],
  [0x7c, 0x7c, 0x7c],
  [0xa4, 0xe4, 0xfc],
  [0x3c, 0xbc, 0xfc],
  [0x00, 0x78, 0xf8],
  [0x00, 0x00, 0xfc],
  [0xb8, 0xb8, 0xf8],
  [0x68, 0x88, 0xfc],
  [0x00, 0x58, 0xf8],
  [0x00, 0x00, 0xbc],
  [0xd8, 0xb8, 0xf8],
  [0x98, 0x78, 0xf8],
  [0x68, 0x44, 0xfc],
  [0x44, 0x28, 0xbc],
  [0xf8, 0xb8, 0xf8],
  [0xf8, 0x78, 0xf8],
  [0xd8, 0x00, 0xcc],
  [0x94, 0x00, 0x84],
  [0xf8, 0xa4, 0xc0],
  [0xf8, 0x58, 0x98],
  [0xe4, 0x00, 0x58],
  [0xa8, 0x00, 0x20],
  [0xf0, 0xd0, 0xb0],
  [0xf8, 0x78, 0x58],
  [0xf8, 0x38, 0x00],
  [0xa8, 0x10, 0x00],
  [0xfc, 0xe0, 0xa8],
  [0xfc, 0xa0, 0x44],
  [0xe4, 0x5c, 0x10],
  [0x88, 0x14, 0x00],
  [0xf8, 0xd8, 0x78],
  [0xf8, 0xb8, 0x00],
  [0xac, 0x7c, 0x00],
  [0x50, 0x30, 0x00],
  [0xd8, 0xf8, 0x78],
  [0xb8, 0xf8, 0x18],
  [0x00, 0xb8, 0x00],
  [0x00, 0x78, 0x00],
  [0xb8, 0xf8, 0xb8],
  [0x58, 0xd8, 0x54],
  [0x00, 0xa8, 0x00],
  [0x00, 0x68, 0x00],
  [0xb8, 0xf8, 0xd8],
  [0x58, 0xf8, 0x98],
  [0x00, 0xa8, 0x44],
  [0x00, 0x58, 0x00],
  [0x00, 0xfc, 0xfc],
  [0x00, 0xe8, 0xd8],
  [0x00, 0x88, 0x88],
  [0x00, 0x40, 0x58],
  [0xf8, 0xd8, 0xf8],
  [0x78, 0x78, 0x78]
]

const columns = 4
const rows = Math.ceil(colors.length / columns)
const size = 16

const canvas = document.createElement('canvas')
canvas.width = columns * size
canvas.height = rows * size
const context = canvas.getContext('2d')

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < columns; x++) {
    let i = y * columns + x

    if (colors[i]) {
      context.fillStyle = `rgb(${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`
      context.fillRect(x * size, y * size, size, size)
    }  
  }
}

document.body.appendChild(canvas)

/*
const columns = 16
const rows = 4
const size = 16

let img = document.createElement('img')
img.src = '../NES Palettes/NES_YUV_32bit.png'

document.body.appendChild(img)

img.onload = drawPal

function getColors (image) {
  let tileWidth = Math.ceil(image.width / columns)
  let tileHeight = Math.ceil(image.height / rows)

  let canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)

  let colors = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let a = x * tileWidth + 2
      let b = y * tileHeight + 1

      let c = ctx.getImageData(a, b, 1, 1).data

      colors.push([c[0], c[1], c[2]])
    }
  }

  return colors
}

function drawPal () {
  let colors = getColors(this)

  const canvas = document.createElement('canvas')
  canvas.width = columns * size
  canvas.height = rows * size
  const context = canvas.getContext('2d')

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let i = y * columns + x
      context.fillStyle = `rgb(${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`
      context.fillRect(x * size, y * size, size, size)
    }
  }

  document.body.appendChild(canvas)

  getHexColors(colors)
}

function toHex (decimal) {
  let hex = decimal.toString(16).toUpperCase()
  return hex.length < 2 ? '0' + hex : hex
}

function colorToHex (rgb) {
  return toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2])
}

function getHexColors (colors) {
  let hex = []
  for (let i in colors) {
    hex.push(colorToHex(colors[i]))
  }

  console.log(hex.join(','))
}
*/
