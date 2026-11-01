import { ELEMENTS } from './js/data/elements.js';
import { renderPeriodicTable, filterPeriodicTable, setupElementModal } from './js/ui/periodicTable.js';

renderPeriodicTable(ELEMENTS);
setupElementModal();
document.getElementById('elementSearch').addEventListener('input', (event) => filterPeriodicTable(event.target.value));

