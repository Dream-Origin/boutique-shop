import React from 'react';
import './FilterChip.css';

export default function FilterChip({ label, onRemove }) {
  return (
    <span className="filter-chip">
      {label}
      <button className="filter-chip-remove" onClick={onRemove} aria-label={`Remove ${label}`}>
        ×
      </button>
    </span>
  );
}
