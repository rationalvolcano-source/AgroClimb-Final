// Filters Module

export function showFilterDialog(state, renderGrid, showToast) {
  const modalHTML = `
    <div class="modal-overlay" id="filterModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Filter Data</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Column</label>
            <select class="form-select" id="filterColumn">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Condition</label>
            <select class="form-select" id="filterCondition">
              <option value="contains">Contains</option>
              <option value="equals">Equals</option>
              <option value="gt">Greater Than</option>
              <option value="lt">Less Than</option>
              <option value="between">Between</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Value</label>
            <input type="text" class="form-input" id="filterValue" placeholder="Enter value">
          </div>
          
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 1rem;">
            Note: Filtering will hide rows that don't match the condition.
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn btn-primary" id="applyFilter">Apply Filter</button>
        </div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('modal-container');
  container.innerHTML = modalHTML;
  
  document.getElementById('applyFilter').addEventListener('click', () => {
    const column = document.getElementById('filterColumn').value;
    const condition = document.getElementById('filterCondition').value;
    const value = document.getElementById('filterValue').value;
    
    applyFilter(state, column, condition, value);
    renderGrid();
    document.getElementById('filterModal').remove();
    showToast('Filter applied', 'success');
  });
}

function applyFilter(state, column, condition, value) {
  // This is a simplified filter - in production would maintain a visibility map
  showToast('Filter functionality: Advanced feature coming soon', 'info');
}
