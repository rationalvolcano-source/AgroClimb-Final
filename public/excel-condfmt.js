// Conditional Formatting Module

export function showCondFmtDialog(state, renderGrid, showToast) {
  const modalHTML = `
    <div class="modal-overlay" id="condFmtModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Conditional Formatting</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Apply to Range</label>
            <input type="text" class="form-input" id="condFmtRange" placeholder="e.g., C2:C10">
          </div>
          
          <div class="form-group">
            <label class="form-label">Rule Type</label>
            <select class="form-select" id="condFmtRule">
              <option value="gt">Greater Than</option>
              <option value="lt">Less Than</option>
              <option value="between">Between</option>
              <option value="contains">Text Contains</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Value</label>
            <input type="text" class="form-input" id="condFmtValue" placeholder="Enter threshold value">
          </div>
          
          <div class="form-group">
            <label class="form-label">Format Style</label>
            <select class="form-select" id="condFmtStyle">
              <option value="cf-highlight">Highlight (Yellow)</option>
              <option value="cf-success">Success (Green)</option>
              <option value="cf-danger">Danger (Red)</option>
              <option value="cf-info">Info (Blue)</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn btn-primary" id="applyCondFmt">Apply Format</button>
        </div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('modal-container');
  container.innerHTML = modalHTML;
  
  document.getElementById('applyCondFmt').addEventListener('click', () => {
    const range = document.getElementById('condFmtRange').value;
    const rule = document.getElementById('condFmtRule').value;
    const value = document.getElementById('condFmtValue').value;
    const style = document.getElementById('condFmtStyle').value;
    
    applyConditionalFormat(state, range, rule, value, style);
    renderGrid();
    document.getElementById('condFmtModal').remove();
    showToast('Conditional formatting applied', 'success');
  });
}

function applyConditionalFormat(state, rangeStr, rule, value, style) {
  const match = rangeStr.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
  if (!match) {
    alert('Invalid range format');
    return;
  }
  
  const startCol = match[1].charCodeAt(0) - 65;
  const startRow = parseInt(match[2]) - 1;
  const endCol = match[3].charCodeAt(0) - 65;
  const endRow = parseInt(match[4]) - 1;
  
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const key = String.fromCharCode(65 + col) + (row + 1);
      const cell = state.cells[key];
      
      if (!cell) continue;
      
      let shouldFormat = false;
      const cellValue = parseFloat(cell.v);
      const threshold = parseFloat(value);
      
      switch (rule) {
        case 'gt':
          shouldFormat = !isNaN(cellValue) && cellValue > threshold;
          break;
        case 'lt':
          shouldFormat = !isNaN(cellValue) && cellValue < threshold;
          break;
        case 'contains':
          shouldFormat = String(cell.v).includes(value);
          break;
      }
      
      if (shouldFormat) {
        cell.style = (cell.style || '') + ' ' + style;
      }
    }
  }
}
