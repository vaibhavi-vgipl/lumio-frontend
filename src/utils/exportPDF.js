import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function downloadReportAsPDF(elementId, fileName) {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    // wait for charts to fully render
    await new Promise(resolve => setTimeout(resolve, 2500))

    const canvas = await html2canvas(element, {
      scale:           1.5,
      useCORS:         true,
      logging:         false,
      backgroundColor: '#F4F3EF',
      width:           element.scrollWidth,
      height:          element.scrollHeight,
      windowWidth:     element.scrollWidth,
      windowHeight:    element.scrollHeight,
      scrollX:         0,
      scrollY:         -window.scrollY,
      allowTaint:      true,
      foreignObjectRendering: false,
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId)
        if (clonedEl) {
          clonedEl.style.height   = 'auto'
          clonedEl.style.overflow = 'visible'
        }
      }
    })

    const imgData     = canvas.toDataURL('image/png')
    const pdf         = new jsPDF('p', 'mm', 'a4')
    const pdfWidth    = pdf.internal.pageSize.getWidth()
    const pdfHeight   = pdf.internal.pageSize.getHeight()
    const ratio       = pdfWidth / canvas.width
    const totalHeight = canvas.height * ratio

    let heightLeft = totalHeight
    let position   = 0

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position   = heightLeft - totalHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalHeight)
      heightLeft -= pdfHeight
    }

    const cleanName = (fileName || 'Report')
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .trim()
    pdf.save(`${cleanName}.pdf`)

  } catch (err) {
    console.error('PDF export failed:', err)
    throw err
  }
}