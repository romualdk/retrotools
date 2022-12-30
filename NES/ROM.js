const HEADER_SIZE = 0x10 // 16
const PRG_BANK_SIZE = 0x4000 // 16384
const CHR_BANK_SIZE = 0x2000 // 8192

class ROM {
  /**
   * Parse a .nes file according to the INES file format
   * http://wiki.nesdev.com/w/index.php/INES
   * https://wiki.nesdev.com/w/index.php/CHR_ROM_vs._CHR_RAM

   * chr => Pattern tables, the raw data to render by the PPU
   * prg => The program, used by the CPU

   */
  constructor (dataBuffer) {
    var p = 0
    var byteArray = new Uint8Array(dataBuffer)
    this.header = byteArray.subarray(p, HEADER_SIZE)

    p += HEADER_SIZE

    this.nbrPRGBanks = this.header[4]
    this.nbrCHRBanks = this.header[5]
    // Cf below for types
    this.mapperType = (this.header[6] >> 4) | ((this.header[7] >> 4) << 4)
    // Type will depend on the mapper, check mapper classes
    this.mirrorType = (this.header[6] & 1) | (((this.header[6] >> 3) & 1) << 1)
    // 0: NTSC, 1: PAL
    this.region = this.header[9] & 1

    var prgLength = this.nbrPRGBanks * PRG_BANK_SIZE
    var chrLength = this.nbrCHRBanks * CHR_BANK_SIZE

    this.prg = byteArray.subarray(p, p + prgLength)

    p += prgLength

    if (chrLength > 0) {
      this.chr = byteArray.subarray(p, p + chrLength)
    } else {
      this.chr = new Uint8Array(CHR_BANK_SIZE).fill(0)
    }
  }

  /**
   * Some games use PRG instead of CHR to store graphics (e.g. Mega Man)
   */
  getChrData () {
    return this.chrLength > 0 ? this.chr : this.prg
  }
}

export default ROM
