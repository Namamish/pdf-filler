const { PDFDocument } = require('pdf-lib');
const fs = require('fs');


async function inspectPDF() {
    const existingPdfBytes = fs.readFileSync('Sample-Fillable-PDF.pdf');
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
    const form = pdfDoc.getForm();
    const fields = form.getFields();
  
    fields.forEach(field => {
      const type = field.constructor.name;
      const name = field.getName();
      console.log(`${name} (${type})`);
    });
  }

// inspectPDF();

async function fillPDF() {
  const existingPdfBytes = fs.readFileSync('Sample-Fillable-PDF.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const form = pdfDoc.getForm();

  const nameField = form.getTextField('Name');
  nameField.setText('Namamish Awasthi');

  const dropdownField = form.getDropdown('Dropdown2');
  dropdownField.select('Choice 2');

  const checkField1 = form.getCheckBox('Option 1');
  checkField1.check();

  const checkField2 = form.getCheckBox('Option 2');
  checkField2.uncheck();

  const checkField3 = form.getCheckBox('Option 3');
  checkField3.check();

  const dependentNameField = form.getTextField('Name of Dependent');
  dependentNameField.setText('NA');

  //Convert the Fillable PDF to Static PDF (non - editable)
  form.flatten();

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('filled-Sample-Fillable-PDF.pdf', pdfBytes);

  console.log('PDF filled and saved as filled-Sample-Fillable-PDF.pdf');
}

fillPDF();
