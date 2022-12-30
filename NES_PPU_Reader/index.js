/* global ImageData */
import PPU from './nes/core/PPU.js'
import ROM from './nes/core/ROM.js'

import { nes2bppTo8bit } from './CHR.js'

const NesPalette = [

  [ 0x1D << 2, 0x1D << 2, 0x1D << 2 ], /* Value 0 */
  [ 0x09 << 2, 0x06 << 2, 0x23 << 2 ], /* Value 1 */
  [ 0x00 << 2, 0x00 << 2, 0x2A << 2 ], /* Value 2 */
  [ 0x11 << 2, 0x00 << 2, 0x27 << 2 ], /* Value 3 */
  [ 0x23 << 2, 0x00 << 2, 0x1D << 2 ], /* Value 4 */
  [ 0x2A << 2, 0x00 << 2, 0x04 << 2 ], /* Value 5 */
  [ 0x29 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 6 */
  [ 0x1F << 2, 0x02 << 2, 0x00 << 2 ], /* Value 7 */
  [ 0x10 << 2, 0x0B << 2, 0x00 << 2 ], /* Value 8 */
  [ 0x00 << 2, 0x11 << 2, 0x00 << 2 ], /* Value 9 */
  [ 0x00 << 2, 0x14 << 2, 0x00 << 2 ], /* Value 10 */
  [ 0x00 << 2, 0x0F << 2, 0x05 << 2 ], /* Value 11 */
  [ 0x06 << 2, 0x0F << 2, 0x17 << 2 ], /* Value 12 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 13 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 14 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 15 */
  [ 0x2F << 2, 0x2F << 2, 0x2F << 2 ], /* Value 16 */
  [ 0x00 << 2, 0x1C << 2, 0x3B << 2 ], /* Value 17 */
  [ 0x08 << 2, 0x0E << 2, 0x3B << 2 ], /* Value 18 */
  [ 0x20 << 2, 0x00 << 2, 0x3C << 2 ], /* Value 19 */
  [ 0x2F << 2, 0x00 << 2, 0x2F << 2 ], /* Value 20 */
  [ 0x39 << 2, 0x00 << 2, 0x16 << 2 ], /* Value 21 */
  [ 0x36 << 2, 0x0A << 2, 0x00 << 2 ], /* Value 22 */
  [ 0x32 << 2, 0x13 << 2, 0x03 << 2 ], /* Value 23 */
  [ 0x22 << 2, 0x1C << 2, 0x00 << 2 ], /* Value 24 */
  [ 0x00 << 2, 0x25 << 2, 0x00 << 2 ], /* Value 25 */
  [ 0x00 << 2, 0x2A << 2, 0x00 << 2 ], /* Value 26 */
  [ 0x00 << 2, 0x24 << 2, 0x0E << 2 ], /* Value 27 */
  [ 0x00 << 2, 0x20 << 2, 0x22 << 2 ], /* Value 28 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 29 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 30 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 31 */
  [ 0x3F << 2, 0x3F << 2, 0x3F << 2 ], /* Value 32 */
  [ 0x0F << 2, 0x2F << 2, 0x3F << 2 ], /* Value 33 */
  [ 0x17 << 2, 0x25 << 2, 0x3F << 2 ], /* Value 34 */
  [ 0x33 << 2, 0x22 << 2, 0x3F << 2 ], /* Value 35 */
  [ 0x3D << 2, 0x1E << 2, 0x3F << 2 ], /* Value 36 */
  [ 0x3F << 2, 0x1D << 2, 0x2D << 2 ], /* Value 37 */
  [ 0x3F << 2, 0x1D << 2, 0x18 << 2 ], /* Value 38 */
  [ 0x3F << 2, 0x26 << 2, 0x0E << 2 ], /* Value 39 */
  [ 0x3C << 2, 0x2F << 2, 0x0F << 2 ], /* Value 40 */
  [ 0x20 << 2, 0x34 << 2, 0x04 << 2 ], /* Value 41 */
  [ 0x13 << 2, 0x37 << 2, 0x12 << 2 ], /* Value 42 */
  [ 0x16 << 2, 0x3E << 2, 0x26 << 2 ], /* Value 43 */
  [ 0x00 << 2, 0x3A << 2, 0x36 << 2 ], /* Value 44 */
  [ 0x1E << 2, 0x1E << 2, 0x1E << 2 ], /* Value 45 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 46 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 47 */
  [ 0x3F << 2, 0x3F << 2, 0x3F << 2 ], /* Value 48 */
  [ 0x2A << 2, 0x39 << 2, 0x3F << 2 ], /* Value 49 */
  [ 0x31 << 2, 0x35 << 2, 0x3F << 2 ], /* Value 50 */
  [ 0x35 << 2, 0x32 << 2, 0x3F << 2 ], /* Value 51 */
  [ 0x3F << 2, 0x31 << 2, 0x3F << 2 ], /* Value 52 */
  [ 0x3F << 2, 0x31 << 2, 0x36 << 2 ], /* Value 53 */
  [ 0x3F << 2, 0x2F << 2, 0x2C << 2 ], /* Value 54 */
  [ 0x3F << 2, 0x36 << 2, 0x2A << 2 ], /* Value 55 */
  [ 0x3F << 2, 0x39 << 2, 0x28 << 2 ], /* Value 56 */
  [ 0x38 << 2, 0x3F << 2, 0x28 << 2 ], /* Value 57 */
  [ 0x2A << 2, 0x3C << 2, 0x2F << 2 ], /* Value 58 */
  [ 0x2C << 2, 0x3F << 2, 0x33 << 2 ], /* Value 59 */
  [ 0x27 << 2, 0x3F << 2, 0x3C << 2 ], /* Value 60 */
  [ 0x31 << 2, 0x31 << 2, 0x31 << 2 ], /* Value 61 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ], /* Value 62 */
  [ 0x00 << 2, 0x00 << 2, 0x00 << 2 ] /* Value 63 */
]

const KunioPalletes = [
  0x2C, 0x30, 0x15, 0x0F,
  0x2C, 0x30, 0x27, 0x0F,
  0x2C, 0x10, 0x31, 0x1C,
  0x2C, 0x19, 0x30, 0x0F,

  0x2C, 0x0F, 0x30, 0x26,
  0x2C, 0x0F, 0x30, 0x26,
  0x2C, 0x0F, 0x16, 0x26,
  0x2C, 0x0F, 0x16, 0x26
]

const DonkeyKondPalettes = [
  0x0F, 0x15, 0x2c, 0x12,
  0x0F, 0x27, 0x02, 0x17,
  0x0F, 0x30, 0x36, 0x06,
  0x0F, 0x30, 0x2C, 0x24,

  0x0F, 0x02, 0x36, 0x16,
  0x0F, 0x30, 0x27, 0x24,
  0x0F, 0x16, 0x30, 0x37,
  0x0F, 0x06, 0x27, 0x02
]

const Mario1Palettes = [
  0x22, 0x29, 0x1A, 0x0F,
  0x22, 0x36, 0x17, 0x0F,
  0x22, 0x30, 0x21, 0x0F,
  0x22, 0x27, 0x17, 0x0F,

  0x22, 0x16, 0x27, 0x18, // 5: Mario
  0x22, 0x1A, 0x30, 0x27,
  0x22, 0x16, 0x30, 0x27,
  0x22, 0x0F, 0x36, 0x17, // 7: Enemy

  0x22, 0x27, 0x16, 0x0F,
  0x22, 0x15, 0x11, 0x25,
  0x22, 0x30, 0x11, 0x0F,
  0x22, 0x27, 0x11, 0x0F,

  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x22, 0x30, 0x00, 0x0f
]

const Mario1TilePalette = [
  4,4,4,4, 4,4,4,4, 4,4,4,4, 4,4,4,4,
  4,4,4,4, 4,4,4,4, 4,4,4,4, 4,4,4,4,
  4,4,4,4, 4,4,4,4, 4,4,4,4, 4,4,4,4,
  4,4,4,4, 4,4,4,4, 4,4,4,4, 4,4,4,4,
  4,4,4,4, 4,4,4,4, 4,4,4,4, 4,4,4,4,
  6,6,6,6, 5,5,5,5, 4,4,4,4, 4,4,4,4,
  6,6,6,6, 6,6,6,6, 6,6,5,5, 5,5,5,5,
  7,7,7,7, 6,6,6,6, 6,6,6,6, 5,5,5,5,
  7,7,7,7, 7,7,7,7, 5,5,5,5, 6,6,6,6,
  4,4,4,4, 6,6,6,6, 6,6,6,6, 6,6,4,4,
  5,5,5,5, 5,5,5,5, 5,5,7,7, 7,7,7,7,
  7,7,6,6, 6,6,6,6, 5,5,5,5, 5,5,5,5,
  5,5,5,5, 5,5,5,5, 5,5,5,5, 5,6,6,6,
  6,5,5,5, 5,5,5,6, 6,5,6,7, 7,7,7,7,
  5,5,5,5, 5,5,5,7, 7,7,7,5, 5,5,5,7,
  6,6,6,6, 7,7,6,6, 6,6,6,6, 6,6,6,5,

  2,2,2,2, 2,2,2,2, 2,2,2,2, 2,2,2,2,
  2,2,2,2, 2,2,2,2, 2,2,2,2, 2,2,2,2,
  2,2,2,2, 2,2,2,2, 2,2,1,2, 8,8,8,0,
  0,0,0,0, 0,0,0,0, 0,2,2,2, 2,0,1,1,
  1,10,1,1,1,1,1,1, 1,1,1,0, 0,0,0,0,
  0,0,1,1, 1,1,1,1, 1,1,1,1, 1,15,15,1,
  0,0,0,0, 0,0,0,0, 0,0,0,8, 8,8,8,8,
  8,8,8,8, 8,1,1,2, 1,2,1,3, 3,3,3,2,
  1,1,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
  0,0,0,0, 0,1,1,1, 1,1,1,1, 1,1,1,1,
  1,1,1,1, 9,3,3,3, 3,1,1,1, 1,1,1,2,
  2,2,2,2, 1,1,1,1, 0,0,0,0, 0,0,1,1,
  2,1,11,11,1,1,1,1, 1,1,1,1, 1,1,1,2,
  1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1,
  1,1,1,1, 1,1,1,1, 1,9,9,9, 0,0,0,0,
  0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0
]

function getColor (color, palette, palNumber = 0, component) {
  let index = palNumber * 4 + color
  if (index >= palette.length) {
    return NesPalette[0][component]
  }
  else {
    return NesPalette[palette[index]][component]
  }
  
}

/* global fetch */
const catalog = 'roms/'
const roms = [
  // 'Donkey Kong (World) (Rev A).nes',
  'Super Mario Bros. (World).nes'
  // 'Nekketsu Kakutou Densetsu (Japan).nes',
  // 'Mega Man 2 (USA).nes',
  // 'Mega Man (USA).nes'
]

class ChrReader {
  constructor () {
    this.ppu = new PPU()
    this.rom = null
  }

  loadROM (data) {
    this.rom = new ROM(data)
    this.ppu.connectROM(this.rom)
    this.ppu.reset()
  }
}

async function load (url) {
  const response = await fetch(url)
  const dataBuffer = await response.arrayBuffer()

  return dataBuffer
}

for (let i in roms) {
  const url = catalog + roms[i]
  load(url).then(parseRom)
}

function getPatternTile (memory, tile) {
  let start = tile * 16

  return nes2bppTo8bit(memory, start, 16)
}

function getTilePixels (tile, pal, palNum) {
  let pixels = new Uint8ClampedArray(64 * 4)
  for (let i in tile) {
    let c = tile[i]
    pixels[i * 4] = getColor(c, pal, palNum, 0)
    pixels[i * 4 + 1] = getColor(c, pal, palNum, 1)
    pixels[i * 4 + 2] = getColor(c, pal, palNum, 2)
    pixels[i * 4 + 3] = 0xff
  }

  return pixels
}

function decimalToHexString (number)
{
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1
  }

  let hex = number.toString(16).toUpperCase()

  return hex
}

function drawMemory (memory, bank = 0) {
  const columns = 16
  const rows = 16

  let space = 0

  let canvas = document.createElement('canvas')
  canvas.width = (8 + space) * columns
  canvas.height = (8 + space) * rows
  const context = canvas.getContext('2d')
  document.body.appendChild(canvas)

  let pal = Mario1Palettes

  let goomba = 127
  for (let i = 0; i < 4; i++) {
    let start = (goomba + i) * 16
    let chr = memory.slice(start, start + 16)
    for (let p = 0; p < 2; p++) {
      let arr = chr.slice(p * 8, p * 8 + 8)
      let arr2 = []
      for (let ii in arr) {
        arr2[ii] = '0x' + decimalToHexString(arr[ii]).padStart(2, '0')
      }
      console.log(arr2)
    }
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let t = bank * 16 * 16 + y * columns + x
      let palNum = t < Mario1TilePalette.length ? Mario1TilePalette[t] : 0
      let tile = getPatternTile(memory, t)
      let pixels = getTilePixels(tile, pal, palNum)
      context.putImageData(new ImageData(pixels, 8, 8), x * (8 + space),  y * (8 + space))
    }
  }
}

function parseRom (dataBuffer) {
  let reader = new ChrReader()
  reader.loadROM(dataBuffer)

  let banks = reader.rom.chr.length / 4096

  for (let b = 0; b < banks; b++) {
    drawMemory(reader.rom.chr, b)
  }

}
