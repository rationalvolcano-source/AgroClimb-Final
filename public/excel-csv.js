// CSV Import/Export Module

export function importCSV(state, renderGrid, showToast) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target.result;
        const rows = parseCSV(csvText);
        
        // Clear existing cells
        state.cells = {};
        
        // Import data
        rows.forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            if (colIndex < 26 && rowIndex < 100) { // Stay within grid bounds
              const key = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
              state.cells[key] = { v: value, f: '' };
            }
          });
        });
        
        renderGrid();
        showToast(`Imported ${rows.length} rows`, 'success');
      } catch (err) {
        showToast('Failed to parse CSV file', 'error');
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

export function exportCSV(state, showToast) {
  try {
    const rows = [];
    
    // Find max row and col with data
    let maxRow = 0;
    let maxCol = 0;
    
    for (const key in state.cells) {
      const match = key.match(/^([A-Z]+)(\d+)$/);
      if (match) {
        const col = match[1].charCodeAt(0) - 65;
        const row = parseInt(match[2]) - 1;
        maxRow = Math.max(maxRow, row);
        maxCol = Math.max(maxCol, col);
      }
    }
    
    // Build CSV grid
    for (let row = 0; row <= maxRow; row++) {
      const rowData = [];
      for (let col = 0; col <= maxCol; col++) {
        const key = String.fromCharCode(65 + col) + (row + 1);
        const cell = state.cells[key];
        rowData.push(cell?.v || '');
      }
      rows.push(rowData);
    }
    
    const csvContent = toCSV(rows);
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'excel-export.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('CSV exported successfully', 'success');
  } catch (err) {
    showToast('Failed to export CSV', 'error');
  }
}

function parseCSV(text) {
  const rows = [];
  const lines = text.split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const row = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    row.push(current.trim());
    rows.push(row);
  }
  
  return rows;
}

function toCSV(rows) {
  return rows.map(row => {
    return row.map(cell => {
      const str = String(cell);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',');
  }).join('\n');
}
