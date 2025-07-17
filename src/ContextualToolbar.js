import React from 'react';
import { Code, Settings, MoreHorizontal, Zap } from 'lucide-react';
import './ContextualToolbar.css';

export default function ContextualToolbar({ 
  position, 
  onToolMode, 
  isToolModeEnabled = false,
  onCode, 
  onControls, 
  onMore 
}) {
  return (
    <div 
      className="contextual-toolbar"
      style={{
        left: position.x,
        top: position.y - 50 // Position above the component
      }}
    >
      <button 
        className={`toolbar-btn ${isToolModeEnabled ? 'toolbar-btn-active' : ''}`}
        onClick={onToolMode}
        title="Tool Mode"
      >
        <Zap size={14} />
        <span>Tool Mode</span>
      </button>
      
      <div className="toolbar-separator" />
      
      <button 
        className="toolbar-btn"
        onClick={onCode}
        title="Code"
      >
        <Code size={14} />
        <span>Code</span>
      </button>
      
      <button 
        className="toolbar-btn"
        onClick={onControls}
        title="Controls"
      >
        <Settings size={14} />
        <span>Controls</span>
      </button>
      
      <div className="toolbar-separator" />
      
      <button 
        className="toolbar-btn toolbar-btn-icon"
        onClick={onMore}
        title="More options"
      >
        <MoreHorizontal size={14} />
      </button>
    </div>
  );
} 