import PDFDocument from 'pdfkit'
import qrcode from 'qrcode'
import fs from 'fs'

const ticketData = {
  id: '1213092', // číslo vstupenky
  event: 'Final Cup', // názov podujatia
  date: new Date(), //  dátum a čas
  price: 4.99, // cena
  sector: 'B3', // sektor
  row: 8, // rad
  place: '32', // miesto
  qr: 'hello', // QR kód
}

async function generateTicket({
  id,
  event,
  date,
  price,
  sector,
  row,
  place,
  qr,
}) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 25,
      bottom: 25,
      left: 40,
      right: 25,
    },
  })

  doc.pipe(
    fs.createWriteStream([id, sector, row, place, 'ticket.pdf'].join('_')),
  )

  doc.registerFont('Roboto', 'fonts/Roboto-Regular.ttf')
  doc.registerFont('Roboto Bold', 'fonts/Roboto-Bold.ttf')
  doc.registerFont('Montserrat', 'fonts/Montserrat-Regular.ttf')

  doc.rect(0, 0, doc.page.width, 96).fill('#14213D')

  doc
    .fontSize(24)
    .font('Roboto Bold')
    .fillColor('#FCA311')
    .text(`VSTUPENKA`, 50, 25)

  doc
    .fontSize(12)
    .font('Montserrat')
    .fillColor('#FFF')
    .text('NA ZÁPAS TIPSPORT LIGY')

  doc.moveDown().moveDown().moveDown()

  doc
    .fontSize(14)
    .font('Roboto Bold')
    .fillColor('#FCA311')
    .text(`SEKTOR`, 50, 110)
  doc.font('Roboto').fillColor('#000').text('A18')

  doc
    .fontSize(14)
    .font('Roboto Bold')
    .fillColor('#FCA311')
    .text(`RAD`, 150, 110)
  doc.font('Roboto').fillColor('#000').text('2')

  doc
    .fontSize(14)
    .font('Roboto Bold')
    .fillColor('#FCA311')
    .text(`MIESTO`, 250, 110)
  doc.font('Roboto').fillColor('#000').text('18')

  const qr_code = await qrcode.toDataURL(qr, { margin: 1, scale: 6 })
  doc.image(qr_code, 400, 25)

  doc.end()
}

generateTicket(ticketData)
