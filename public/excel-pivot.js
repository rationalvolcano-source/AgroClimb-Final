// Pivot Table Module

export function showPivotDialog(state, showToast) {
  const modalHTML = `
    <div class="modal-overlay" id="pivotModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Create Pivot Table</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Row Field</label>
            <select class="form-select" id="pivotRowField">
              <option value="A">Column A</option>
              <option value="B">Column B</option>
              <option value="C">Column C</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Value Field</label>
            <select class="form-select" id="pivotValueField">
              <option value="A">Column A</option>
              <option value="B">Column B</option>
              <option value="C">Column C</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Aggregation</label>
            <select class="form-select" id="pivotAggregation">
              <option value="sum">Sum</option>
              <option value="avg">Average</option>
              <option value="count">Count</option>
              <option value="min">Min</option>
              <option value="max">Max</option>
            </select>
          </div>
          
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 1rem;">
            Pivot tables help summarize and analyze large datasets by grouping data.
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn btn-primary" id="createPivot">Create Pivot</button>
        </div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('modal-container');
  container.innerHTML = modalHTML;
  
  document.getElementById('createPivot').addEventListener('click', () => {
    const rowField = document.getElementById('pivotRowField').value;
    const valueField = document.getElementById('pivotValueField').value;
    const aggregation = document.getElementById('pivotAggregation').value;
    
    createPivot(state, rowField, valueField, aggregation);
    document.getElementById('pivotModal').remove();
    showToast('Pivot table created', 'success');
  });
}

function createPivot(state, rowField, valueField, aggregation) {
  // Simplified pivot - would create a new sheet/view with grouped data
  console.log('Creating pivot:', { rowField, valueField, aggregation });
  showToast('Pivot table: Advanced feature coming soon', 'info');
}
