// ===== CONSTANTS =====
const COLS = 26; // A-Z
const ROWS = 100;
const VISIBLE_ROWS = 60;
const MAX_UNDO = 50;

// ===== GLOBAL STATE =====
const state = {
  cells: {}, // key: "A1" -> {v: value, f: formula, style: classes}
  selection: { start: null, end: null, current: 'A1' },
  undoStack: [],
  redoStack: [],
  depMap: new Map(), // formula dependencies
  clipboardData: null
};

// ===== UTILITY FUNCTIONS =====
function colToLetter(col) {
  return String.fromCharCode(65 + col); // 0 -> 'A'
}

function letterToCol(letter) {
  return letter.charCodeAt(0) - 65; // 'A' -> 0
}

function cellKey(col, row) {
  return `${colToLetter(col)}${row + 1}`;
}

function parseCell(key) {
  const match = key.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  const col = letterToCol(match[1]);
  const row = parseInt(match[2]) - 1;
  return { col, row };
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function showLoading(text = 'Loading...') {
  const overlay = document.getElementById('loading');
  const textEl = document.getElementById('loadingText');
  textEl.textContent = text;
  overlay.classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

// ===== FORMULA PARSER & EVALUATOR =====
class FormulaParser {
  constructor() {
    this.pos = 0;
    this.tokens = [];
  }

  tokenize(formula) {
    this.tokens = [];
    this.pos = 0;
    const input = formula.trim();
    
    const patterns = [
      { type: 'FUNCTION', regex: /^(SUM|AVG|AVERAGE|MIN|MAX|COUNT)\s*\(/i },
      { type: 'RANGE', regex: /^([A-Z]+\d+):([A-Z]+\d+)/ },
      { type: 'CELL', regex: /^([A-Z]+\d+)/ },
      { type: 'NUMBER', regex: /^\d+(\.\d+)?/ },
      { type: 'OPERATOR', regex: /^[+\-*/^()]/ },
      { type: 'COMMA', regex: /^,/ },
      { type: 'WHITESPACE', regex: /^\s+/ }
    ];

    let i = 0;
    while (i < input.length) {
      let matched = false;
      for (const pattern of patterns) {
        const match = input.slice(i).match(pattern.regex);
        if (match) {
          if (pattern.type !== 'WHITESPACE') {
            this.tokens.push({ type: pattern.type, value: match[0] });
          }
          i += match[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) i++; // Skip unknown char
    }
    
    return this.tokens;
  }

  parse(formula) {
    if (!formula || !formula.startsWith('=')) {
      return { type: 'VALUE', value: formula };
    }
    
    this.tokenize(formula.slice(1)); // Remove '='
    this.pos = 0;
    
    try {
      return this.parseExpression();
    } catch (e) {
      return { type: 'ERROR', value: '#ERROR!' };
    }
  }

  parseExpression() {
    let left = this.parseTerm();
    
    while (this.pos < this.tokens.length) {
      const token = this.tokens[this.pos];
      if (token.type === 'OPERATOR' && (token.value === '+' || token.value === '-')) {
        this.pos++;
        const right = this.parseTerm();
        left = { type: 'BINARY', op: token.value, left, right };
      } else {
        break;
      }
    }
    
    return left;
  }

  parseTerm() {
    let left = this.parseFactor();
    
    while (this.pos < this.tokens.length) {
      const token = this.tokens[this.pos];
      if (token.type === 'OPERATOR' && (token.value === '*' || token.value === '/')) {
        this.pos++;
        const right = this.parseFactor();
        left = { type: 'BINARY', op: token.value, left, right };
      } else {
        break;
      }
    }
    
    return left;
  }

  parseFactor() {
    const token = this.tokens[this.pos];
    
    if (!token) {
      throw new Error('Unexpected end of formula');
    }
    
    // Handle parentheses
    if (token.type === 'OPERATOR' && token.value === '(') {
      this.pos++;
      const expr = this.parseExpression();
      if (this.tokens[this.pos]?.value !== ')') {
        throw new Error('Missing closing parenthesis');
      }
      this.pos++;
      return expr;
    }
    
    // Handle functions
    if (token.type === 'FUNCTION') {
      return this.parseFunction();
    }
    
    // Handle ranges
    if (token.type === 'RANGE') {
      this.pos++;
      return { type: 'RANGE', value: token.value };
    }
    
    // Handle cell references
    if (token.type === 'CELL') {
      this.pos++;
      return { type: 'CELL', value: token.value };
    }
    
    // Handle numbers
    if (token.type === 'NUMBER') {
      this.pos++;
      return { type: 'NUMBER', value: parseFloat(token.value) };
    }
    
    throw new Error('Unexpected token: ' + token.value);
  }

  parseFunction() {
    const funcToken = this.tokens[this.pos];
    const funcName = funcToken.value.replace('(', '').toUpperCase();
    this.pos++;
    
    const args = [];
    
    while (this.pos < this.tokens.length && this.tokens[this.pos].value !== ')') {
      if (this.tokens[this.pos].type === 'COMMA') {
        this.pos++;
        continue;
      }
      
      // Check for range or cell
      if (this.tokens[this.pos].type === 'RANGE') {
        args.push({ type: 'RANGE', value: this.tokens[this.pos].value });
        this.pos++;
      } else if (this.tokens[this.pos].type === 'CELL') {
        args.push({ type: 'CELL', value: this.tokens[this.pos].value });
        this.pos++;
      } else {
        args.push(this.parseExpression());
      }
    }
    
    if (this.tokens[this.pos]?.value === ')') {
      this.pos++;
    }
    
    return { type: 'FUNCTION', name: funcName, args };
  }
}

class FormulaEvaluator {
  constructor(getCellValue) {
    this.getCellValue = getCellValue;
  }

  evaluate(ast) {
    if (!ast) return 0;
    
    switch (ast.type) {
      case 'VALUE':
        return ast.value;
      
      case 'NUMBER':
        return ast.value;
      
      case 'CELL': {
        const value = this.getCellValue(ast.value);
        return this.parseValue(value);
      }
      
      case 'RANGE': {
        const cells = this.expandRange(ast.value);
        return cells.map(cell => this.parseValue(this.getCellValue(cell)));
      }
      
      case 'BINARY': {
        const left = this.evaluate(ast.left);
        const right = this.evaluate(ast.right);
        switch (ast.op) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/': return right !== 0 ? left / right : '#DIV/0!';
          case '^': return Math.pow(left, right);
          default: return 0;
        }
      }
      
      case 'FUNCTION':
        return this.evaluateFunction(ast.name, ast.args);
      
      case 'ERROR':
        return ast.value;
      
      default:
        return 0;
    }
  }

  evaluateFunction(name, args) {
    const values = [];
    
    for (const arg of args) {
      const result = this.evaluate(arg);
      if (Array.isArray(result)) {
        values.push(...result);
      } else {
        values.push(result);
      }
    }
    
    const numbers = values.filter(v => typeof v === 'number' && !isNaN(v));
    
    switch (name) {
      case 'SUM':
        return numbers.reduce((a, b) => a + b, 0);
      
      case 'AVG':
      case 'AVERAGE':
        return numbers.length > 0 ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0;
      
      case 'MIN':
        return numbers.length > 0 ? Math.min(...numbers) : 0;
      
      case 'MAX':
        return numbers.length > 0 ? Math.max(...numbers) : 0;
      
      case 'COUNT':
        return numbers.length;
      
      default:
        return '#NAME?';
    }
  }

  expandRange(rangeStr) {
    const [start, end] = rangeStr.split(':');
    const startCell = parseCell(start);
    const endCell = parseCell(end);
    
    if (!startCell || !endCell) return [];
    
    const cells = [];
    for (let row = startCell.row; row <= endCell.row; row++) {
      for (let col = startCell.col; col <= endCell.col; col++) {
        cells.push(cellKey(col, row));
      }
    }
    return cells;
  }

  parseValue(value) {
    if (value === '' || value === null || value === undefined) return 0;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
}

// ===== DEPENDENCY TRACKING =====
function extractDependencies(formula) {
  const deps = new Set();
  if (!formula || !formula.startsWith('=')) return deps;
  
  // Match cell references (A1, B2, etc.)
  const cellRegex = /([A-Z]+\d+)/g;
  let match;
  while ((match = cellRegex.exec(formula)) !== null) {
    deps.add(match[1]);
  }
  
  return deps;
}

function buildDependencyMap() {
  state.depMap.clear();
  
  for (const [key, cell] of Object.entries(state.cells)) {
    if (cell.f && cell.f.startsWith('=')) {
      const deps = extractDependencies(cell.f);
      deps.forEach(depKey => {
        if (!state.depMap.has(depKey)) {
          state.depMap.set(depKey, new Set());
        }
        state.depMap.get(depKey).add(key);
      });
    }
  }
}

function recalculateDependents(cellKey) {
  const toRecalc = new Set();
  const queue = [cellKey];
  
  while (queue.length > 0) {
    const current = queue.shift();
    const dependents = state.depMap.get(current);
    
    if (dependents) {
      dependents.forEach(dep => {
        if (!toRecalc.has(dep)) {
          toRecalc.add(dep);
          queue.push(dep);
        }
      });
    }
  }
  
  // Recalculate all dependents
  toRecalc.forEach(key => {
    const cell = state.cells[key];
    if (cell && cell.f) {
      const parser = new FormulaParser();
      const ast = parser.parse(cell.f);
      const evaluator = new FormulaEvaluator(key => state.cells[key]?.v || '');
      cell.v = evaluator.evaluate(ast);
    }
  });
  
  return toRecalc;
}

// ===== UNDO/REDO SYSTEM =====
function saveState() {
  const snapshot = JSON.stringify({ cells: state.cells });
  state.undoStack.push(snapshot);
  if (state.undoStack.length > MAX_UNDO) {
    state.undoStack.shift();
  }
  state.redoStack = []; // Clear redo on new action
}

function undo() {
  if (state.undoStack.length === 0) {
    showToast('Nothing to undo', 'info');
    return;
  }
  
  const currentState = JSON.stringify({ cells: state.cells });
  state.redoStack.push(currentState);
  
  const previousState = state.undoStack.pop();
  const data = JSON.parse(previousState);
  state.cells = data.cells;
  
  buildDependencyMap();
  renderGrid();
  showToast('Undo successful', 'success');
}

function redo() {
  if (state.redoStack.length === 0) {
    showToast('Nothing to redo', 'info');
    return;
  }
  
  const currentState = JSON.stringify({ cells: state.cells });
  state.undoStack.push(currentState);
  
  const nextState = state.redoStack.pop();
  const data = JSON.parse(nextState);
  state.cells = data.cells;
  
  buildDependencyMap();
  renderGrid();
  showToast('Redo successful', 'success');
}

// ===== GRID RENDERING =====
function renderGrid() {
  const gridEl = document.getElementById('grid');
  gridEl.innerHTML = '';
  
  const table = document.createElement('table');
  table.className = 'excel-table';
  table.id = 'excelTable';
  
  // Header row with column letters
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  // Top-left corner cell
  const cornerTh = document.createElement('th');
  headerRow.appendChild(cornerTh);
  
  // Column headers (A, B, C, ...)
  for (let col = 0; col < COLS; col++) {
    const th = document.createElement('th');
    th.className = 'col-header';
    th.textContent = colToLetter(col);
    th.dataset.col = col;
    headerRow.appendChild(th);
  }
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Body rows
  const tbody = document.createElement('tbody');
  
  for (let row = 0; row < VISIBLE_ROWS; row++) {
    const tr = document.createElement('tr');
    
    // Row header (1, 2, 3, ...)
    const rowHeaderTd = document.createElement('td');
    rowHeaderTd.className = 'row-header';
    rowHeaderTd.textContent = row + 1;
    rowHeaderTd.dataset.row = row;
    tr.appendChild(rowHeaderTd);
    
    // Data cells
    for (let col = 0; col < COLS; col++) {
      const key = cellKey(col, row);
      const cell = state.cells[key] || { v: '', f: '' };
      
      const td = document.createElement('td');
      td.dataset.col = col;
      td.dataset.row = row;
      td.dataset.key = key;
      
      // Apply styles
      if (cell.style) {
        td.className = cell.style;
      }
      
      if (cell.f && cell.f.startsWith('=')) {
        td.classList.add('formula-cell');
      }
      
      // Add input
      const input = document.createElement('input');
      input.className = 'cell-content';
      input.type = 'text';
      input.value = cell.v || '';
      input.dataset.key = key;
      
      td.appendChild(input);
      tr.appendChild(td);
      
      // Mark selection
      if (key === state.selection.current) {
        td.classList.add('selected');
      }
    }
    
    tbody.appendChild(tr);
  }
  
  table.appendChild(tbody);
  gridEl.appendChild(table);
  
  // Attach event listeners
  attachGridEvents();
}

// ===== EVENT HANDLERS =====
function attachGridEvents() {
  const table = document.getElementById('excelTable');
  
  // Cell click
  table.addEventListener('click', (e) => {
    const td = e.target.closest('td[data-key]');
    if (td) {
      selectCell(td.dataset.key);
    }
  });
  
  // Cell input
  table.addEventListener('input', (e) => {
    if (e.target.classList.contains('cell-content')) {
      const key = e.target.dataset.key;
      updateCell(key, e.target.value, false);
    }
  });
  
  // Cell focus - update formula bar
  table.addEventListener('focus', (e) => {
    if (e.target.classList.contains('cell-content')) {
      const key = e.target.dataset.key;
      selectCell(key);
    }
  }, true);
  
  // Enter key - move down
  table.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('cell-content') && e.key === 'Enter') {
      e.preventDefault();
      const key = e.target.dataset.key;
      const parsed = parseCell(key);
      if (parsed && parsed.row < VISIBLE_ROWS - 1) {
        const nextKey = cellKey(parsed.col, parsed.row + 1);
        selectCell(nextKey);
        focusCell(nextKey);
      }
    }
  });
}

function selectCell(key) {
  state.selection.current = key;
  
  // Update UI
  document.querySelectorAll('.excel-table td.selected').forEach(td => {
    td.classList.remove('selected');
  });
  
  const td = document.querySelector(`td[data-key="${key}"]`);
  if (td) {
    td.classList.add('selected');
  }
  
  // Update formula bar
  const cell = state.cells[key] || { v: '', f: '' };
  document.getElementById('cellAddress').textContent = key;
  document.getElementById('formulaInput').value = cell.f || cell.v || '';
}

function focusCell(key) {
  const input = document.querySelector(`input[data-key="${key}"]`);
  if (input) {
    input.focus();
    input.select();
  }
}

function updateCell(key, value, isFormula = false) {
  if (!state.cells[key]) {
    state.cells[key] = {};
  }
  
  const cell = state.cells[key];
  
  if (value.startsWith('=') || isFormula) {
    // It's a formula
    cell.f = value;
    
    // Evaluate
    const parser = new FormulaParser();
    const ast = parser.parse(value);
    const evaluator = new FormulaEvaluator(k => state.cells[k]?.v || '');
    cell.v = evaluator.evaluate(ast);
  } else {
    // It's a plain value
    cell.v = value;
    cell.f = '';
  }
  
  // Update dependency map
  buildDependencyMap();
  
  // Recalculate dependents
  const changed = recalculateDependents(key);
  
  // Re-render affected cells
  changed.forEach(changedKey => {
    const input = document.querySelector(`input[data-key="${changedKey}"]`);
    if (input) {
      input.value = state.cells[changedKey]?.v || '';
    }
  });
  
  // Update current cell display
  const input = document.querySelector(`input[data-key="${key}"]`);
  if (input) {
    input.value = cell.v || '';
  }
}

function applyFormula() {
  const formulaInput = document.getElementById('formulaInput');
  const value = formulaInput.value;
  const key = state.selection.current;
  
  saveState();
  updateCell(key, value, value.startsWith('='));
  showToast('Formula applied', 'success');
}

// ===== FILL DOWN =====
function fillDown() {
  // This would be called from a button/shortcut
  // For now, it's a stub for the future implementation
  showToast('Fill down: Select a range first', 'info');
}

// ===== CSV IMPORT/EXPORT (Lazy loaded) =====
async function loadCsvModule() {
  showLoading('Loading CSV module...');
  try {
    const module = await import('/excel-csv.js');
    hideLoading();
    return module;
  } catch (e) {
    hideLoading();
    showToast('Failed to load CSV module', 'error');
    return null;
  }
}

// ===== FILTER MODULE (Lazy loaded) =====
async function loadFilterModule() {
  showLoading('Loading filters...');
  try {
    const module = await import('/excel-filters.js');
    hideLoading();
    return module;
  } catch (e) {
    hideLoading();
    showToast('Failed to load filter module', 'error');
    return null;
  }
}

// ===== PIVOT MODULE (Lazy loaded) =====
async function loadPivotModule() {
  showLoading('Loading pivot table...');
  try {
    const module = await import('/excel-pivot.js');
    hideLoading();
    return module;
  } catch (e) {
    hideLoading();
    showToast('Failed to load pivot module', 'error');
    return null;
  }
}

// ===== CHART MODULE (Lazy loaded) =====
async function loadChartModule() {
  showLoading('Loading charts...');
  try {
    const module = await import('/excel-charts.js');
    hideLoading();
    return module;
  } catch (e) {
    hideLoading();
    showToast('Failed to load chart module', 'error');
    return null;
  }
}

// ===== CONDITIONAL FORMAT MODULE (Lazy loaded) =====
async function loadCondFmtModule() {
  showLoading('Loading conditional formatting...');
  try {
    const module = await import('/excel-condfmt.js');
    hideLoading();
    return module;
  } catch (e) {
    hideLoading();
    showToast('Failed to load conditional formatting module', 'error');
    return null;
  }
}

// ===== PERSISTENCE =====
function saveToLocalStorage() {
  try {
    localStorage.setItem('excel_sandbox_v1', JSON.stringify({ cells: state.cells }));
    showToast('Saved', 'success');
  } catch (e) {
    showToast('Failed to save', 'error');
  }
}

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('excel_sandbox_v1');
    if (data) {
      const parsed = JSON.parse(data);
      state.cells = parsed.cells || {};
      buildDependencyMap();
      renderGrid();
      showToast('Loaded previous session', 'info');
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
}

function newSheet() {
  if (confirm('Create new sheet? Current data will be lost unless saved.')) {
    saveState();
    state.cells = {};
    state.depMap.clear();
    renderGrid();
    showToast('New sheet created', 'success');
  }
}

// ===== INITIALIZATION =====
function init() {
  // Initial render
  renderGrid();
  
  // Load saved data
  loadFromLocalStorage();
  
  // Setup toolbar buttons
  document.getElementById('btn-new').addEventListener('click', newSheet);
  document.getElementById('btn-undo').addEventListener('click', undo);
  document.getElementById('btn-redo').addEventListener('click', redo);
  
  document.getElementById('btn-import').addEventListener('click', async () => {
    const module = await loadCsvModule();
    if (module) module.importCSV(state, renderGrid, showToast);
  });
  
  document.getElementById('btn-export').addEventListener('click', async () => {
    const module = await loadCsvModule();
    if (module) module.exportCSV(state, showToast);
  });
  
  document.getElementById('btn-filter').addEventListener('click', async () => {
    const module = await loadFilterModule();
    if (module) module.showFilterDialog(state, renderGrid, showToast);
  });
  
  document.getElementById('btn-pivot').addEventListener('click', async () => {
    const module = await loadPivotModule();
    if (module) module.showPivotDialog(state, showToast);
  });
  
  document.getElementById('btn-chart').addEventListener('click', async () => {
    const module = await loadChartModule();
    if (module) module.showChartDialog(state, showToast);
  });
  
  document.getElementById('btn-condfmt').addEventListener('click', async () => {
    const module = await loadCondFmtModule();
    if (module) module.showCondFmtDialog(state, renderGrid, showToast);
  });
  
  // Formula bar
  document.getElementById('formulaApply').addEventListener('click', applyFormula);
  document.getElementById('formulaInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFormula();
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z') {
        e.preventDefault();
        undo();
      } else if (e.key === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 's') {
        e.preventDefault();
        saveToLocalStorage();
      }
    }
  });
  
  // Auto-save every 30 seconds
  setInterval(saveToLocalStorage, 30000);
  
  // Select A1 initially
  selectCell('A1');
  focusCell('A1');
  
  console.log('Excel Sandbox initialized');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
