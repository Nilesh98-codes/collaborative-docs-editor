const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "../node_modules/pdfjs-dist/build/pdf.worker.mjs");
const dest = path.join(__dirname, "../public/pdf.worker.mjs");

fs.copyFileSync(src, dest);
console.log("PDF worker copied to public/");
