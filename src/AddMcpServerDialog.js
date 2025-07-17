import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, Plus, Plug } from 'lucide-react';
import { McpIcon } from './icons';
import './AddMcpServerDialog.css';

export default function AddMcpServerDialog({ onClose, onCreateCustomServer }) {
  const firstOptionRef = useRef(null);
  const secondOptionRef = useRef(null);

  useEffect(() => {
    // Focus first option on mount
    if (firstOptionRef.current) {
      firstOptionRef.current.focus();
    }

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (document.activeElement === firstOptionRef.current) {
          secondOptionRef.current?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (document.activeElement === secondOptionRef.current) {
          firstOptionRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCreateCustomServer = () => {
    if (onCreateCustomServer) {
      onCreateCustomServer();
    }
  };

  const handleConnectExisting = () => {
    // TODO: Implement connect existing server flow
    console.log('Connect existing server');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-title">
            <McpIcon />
            <span>Add MCP Server</span>
          </div>
          <button onClick={onClose} className="dialog-close-btn">
            <X size={18} />
          </button>
        </div>
        <div className="dialog-content">
          <div className="dialog-options">
            <div 
              className="dialog-option"
              ref={firstOptionRef}
              tabIndex={0}
              onClick={handleConnectExisting}
              onKeyDown={(e) => handleKeyPress(e, handleConnectExisting)}
            >
              <div className="option-icon">
                <Plug size={20} />
              </div>
              <div className="option-text">
                <div className="option-title">Connect existing MCP Server</div>
                <div className="option-description">Add JSON, HTTP, STDIO, SSE config</div>
              </div>
              <ArrowRight size={16} />
            </div>
            <div 
              className="dialog-option" 
              ref={secondOptionRef}
              tabIndex={0}
              onClick={handleCreateCustomServer}
              onKeyDown={(e) => handleKeyPress(e, handleCreateCustomServer)}
            >
              <div className="option-icon">
                <Plus size={20} />
              </div>
              <div className="option-text">
                <div className="option-title">Create Custom MCP Server</div>
                <div className="option-description">Configure auth, add tools</div>
              </div>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 