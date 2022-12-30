const NES_TILE_SIZE = 8
const NES_BYTES_PER_TILE = 16

export function nes2bppTo8bit (chrData, offset = 0, length = -1) {
  let tiles = length > 0
    ? Math.floor(length / NES_BYTES_PER_TILE)
    : Math.floor((chrData.length - offset) / NES_BYTES_PER_TILE)

  let imageData = new Uint8ClampedArray(tiles * NES_TILE_SIZE * NES_TILE_SIZE)

  for (let t = 0; t < tiles; t++) {
    let start = offset + t * NES_BYTES_PER_TILE
    let halfTileOffset = start + NES_BYTES_PER_TILE / 2

    let lowTileData = chrData.slice(start, halfTileOffset)
    let highTileData = chrData.slice(halfTileOffset, start + NES_BYTES_PER_TILE)

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let index = t * NES_BYTES_PER_TILE + y * 8 + 7 - x
        let highBit = ((highTileData[y] >> x) & 1) << 1
        let lowBit = (lowTileData[y] >> x) & 1
        imageData[index] = highBit + lowBit
      }
    }
  }

  return imageData
}
