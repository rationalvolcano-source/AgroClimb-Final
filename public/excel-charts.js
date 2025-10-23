// Charts Module (with uPlot lazy loading)

let uPlotLoaded = false;
let uPlot = null;

async function loadUPlot() {
  if (uPlotLoaded) return uPlot;
  
  return new Promise((resolve, reject) => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/uplot@1.6.30/dist/uPlot.min.css';
    document.head.appendChild(link);
    
    // Load JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/uplot@1.6.30/dist/uPlot.iife.min.js';
    script.onload = () => {
      uPlot = window.uPlot;
      uPlotLoaded = true;
      resolve(uPlot);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function showChartDialog(state, showToast) {
  const modalHTML = `
    <div class="modal-overlay" id="chartModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Create Chart</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Chart Type</label>
            <select class="form-select" id="chartType">
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="area">Area</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Data Range</label>
            <input type="text" class="form-input" id="chartRange" placeholder="e.g., A1:B10">
          </div>
          
          <div id="chartPreview" style="margin-top: 1.5rem; min-height: 200px; border: 1px solid var(--border); border-radius: 6px;"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn btn-primary" id="createChart">Create Chart</button>
        </div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('modal-container');
  container.innerHTML = modalHTML;
  
  document.getElementById('createChart').addEventListener('click', async () => {
    const chartType = document.getElementById('chartType').value;
    const range = document.getElementById('chartRange').value;
    
    try {
      await loadUPlot();
      await createChart(state, chartType, range);
      document.getElementById('chartModal').remove();
      showToast('Chart created', 'success');
    } catch (err) {
      showToast('Failed to create chart', 'error');
    }
  });
}

async function createChart(state, chartType, rangeStr) {
  // Parse range and extract data
  const data = extractRangeData(state, rangeStr);
  
  if (!data || data.length === 0) {
    alert('No data in specified range');
    return;
  }
  
  console.log('Creating chart:', { chartType, data });
  showToast('Chart visualization: Advanced feature coming soon', 'info');
}

function extractRangeData(state, rangeStr) {
  const match = rangeStr.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
  if (!match) return null;
  
  const startCol = match[1].charCodeAt(0) - 65;
  const startRow = parseInt(match[2]) - 1;
  const endCol = match[3].charCodeAt(0) - 65;
  const endRow = parseInt(match[4]) - 1;
  
  const data = [];
  for (let row = startRow; row <= endRow; row++) {
    const rowData = [];
    for (let col = startCol; col <= endCol; col++) {
      const key = String.fromCharCode(65 + col) + (row + 1);
      const cell = state.cells[key];
      rowData.push(parseFloat(cell?.v) || 0);
    }
    data.push(rowData);
  }
  
  return data;
}
