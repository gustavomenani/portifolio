const fs = require('fs');

const components = ['Contato','Footer','Header','Hero','Projetos','Skills','Sobre','Tweaks'];

components.forEach(c => {
  let p = 'src/components/' + c + '.tsx';
  let j = fs.readFileSync(p, 'utf8');
  
  if (!j.includes("use client")) {
    j = '"use client";\nimport React from "react";\nimport { Icon } from "../app/icons";\n' + j;
    let regex = new RegExp(`function ${c}\\b`);
    j = j.replace(regex, `export default function ${c}`);
    fs.writeFileSync(p, j);
    console.log(`${c} fixed`);
  }
});
