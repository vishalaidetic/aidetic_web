const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components/agent-factory');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Hex Gradients (cyan -> Primary, blue -> Ruby)
  content = content.replace(/#06b6d4/g, '#533afd');
  content = content.replace(/#2563eb/g, '#ea2261');
  
  // Specific single hex replacements
  content = content.replace(/#0ea5e9/g, '#533afd');
  content = content.replace(/#0891b2/g, '#533afd'); // dark cyan
  content = content.replace(/#cce9f8/g, '#e3e8ee'); // light blob to hairline
  content = content.replace(/#67e8f9/g, '#665efd'); // cyan-300 hex to indigo soft
  
  // Replace RGBs (shadows)
  content = content.replace(/rgba\(6,182,212/g, 'rgba(83,58,253'); // cyan to primary
  content = content.replace(/rgba\(37,99,235/g, 'rgba(234,34,97'); // blue to ruby

  // Replace text colors
  content = content.replace(/text-slate-900/g, 'text-[#0d253d]');
  content = content.replace(/text-slate-800/g, 'text-[#0d253d]');
  content = content.replace(/text-slate-700/g, 'text-[#0d253d]');
  content = content.replace(/text-slate-600/g, 'text-[#64748d]');
  content = content.replace(/text-slate-500/g, 'text-[#64748d]');
  content = content.replace(/text-slate-400/g, 'text-[#64748d]');
  
  // Tailwind text colors
  content = content.replace(/text-cyan-600/g, 'text-[#533afd]');
  content = content.replace(/text-cyan-500/g, 'text-[#533afd]');
  content = content.replace(/text-cyan-400/g, 'text-[#665efd]');
  content = content.replace(/text-cyan-300/g, 'text-[#665efd]');
  content = content.replace(/text-cyan-200/g, 'text-[#665efd]');
  content = content.replace(/text-cyan-100/g, 'text-[#e3e8ee]');
  content = content.replace(/text-blue-600/g, 'text-[#ea2261]');
  content = content.replace(/text-blue-500/g, 'text-[#ea2261]');
  content = content.replace(/text-blue-400/g, 'text-[#ea2261]');

  // Tailwind backgrounds
  content = content.replace(/bg-cyan-600/g, 'bg-[#533afd]');
  content = content.replace(/bg-cyan-500/g, 'bg-[#533afd]');
  content = content.replace(/bg-cyan-400/g, 'bg-[#533afd]');
  content = content.replace(/bg-cyan-100/g, 'bg-[#f6f9fc]');
  content = content.replace(/bg-cyan-50/g, 'bg-[#f6f9fc]');
  content = content.replace(/bg-blue-600/g, 'bg-[#ea2261]');
  content = content.replace(/bg-blue-500/g, 'bg-[#ea2261]');

  // Tailwind borders
  content = content.replace(/border-cyan-500/g, 'border-[#533afd]');
  content = content.replace(/border-cyan-400/g, 'border-[#533afd]');
  content = content.replace(/border-cyan-300/g, 'border-[#533afd]');
  content = content.replace(/border-cyan-200/g, 'border-[#665efd]');
  content = content.replace(/border-cyan-100/g, 'border-[#e3e8ee]');
  content = content.replace(/border-[#38bdf8]/g, 'border-[#533afd]');
  
  // Tailwind Gradients
  content = content.replace(/from-cyan-500/g, 'from-[#533afd]');
  content = content.replace(/from-cyan-400/g, 'from-[#533afd]');
  content = content.replace(/from-cyan-300/g, 'from-[#533afd]');
  content = content.replace(/from-cyan-100/g, 'from-[#f6f9fc]');
  content = content.replace(/from-cyan-50/g, 'from-[#f6f9fc]');
  
  content = content.replace(/via-cyan-300/g, 'via-[#533afd]');
  content = content.replace(/to-blue-400/g, 'to-[#ea2261]');
  content = content.replace(/to-blue-200/g, 'to-[#f5e9d4]');
  content = content.replace(/to-cyan-50/g, 'to-[#f6f9fc]');

  // Misc hex backgrounds (Canvas Alt / Cream)
  content = content.replace(/#f0f8ff/g, '#f6f9fc');
  content = content.replace(/#f6fbff/g, '#f6f9fc');
  content = content.replace(/#ecfeff/g, '#f6f9fc');
  content = content.replace(/#eff6ff/g, '#f6f9fc');
  content = content.replace(/#f0fdff/g, '#f6f9fc');
  content = content.replace(/#f0f6ff/g, '#f6f9fc');
  content = content.replace(/#e0f7ff/g, '#f6f9fc');
  content = content.replace(/#dbeafe/g, '#f5e9d4');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Colors updated.');
