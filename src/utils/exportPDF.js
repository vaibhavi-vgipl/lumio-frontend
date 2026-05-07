import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function downloadReportAsPDF(elementId, fileName) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#F4F3EF',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    const imgData   = canvas.toDataURL('image/png')
    const pdf       = new jsPDF('p', 'mm', 'a4')
    const pdfWidth  = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth  = canvas.width
    const imgHeight = canvas.height
    const ratio     = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX      = (pdfWidth - imgWidth * ratio) / 2

    const totalHeight = imgHeight * ratio
    let heightLeft    = totalHeight
    let position      = 0

    pdf.addImage(
      imgData, 'PNG',
      imgX, position,
      imgWidth  * ratio,
      imgHeight * ratio
    )

    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - totalHeight
      pdf.addPage()
      pdf.addImage(
        imgData, 'PNG',
        imgX, position,
        imgWidth  * ratio,
        imgHeight * ratio
      )
      heightLeft -= pdfHeight
    }

    const cleanName = (fileName || 'Report')
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .trim()
    pdf.save(`${cleanName}.pdf`)

  } catch (err) {
    console.error('PDF export failed:', err)
  }
}