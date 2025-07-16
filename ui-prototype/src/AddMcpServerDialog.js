import React from 'react';
import { X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { McpIcon } from './icons';
import './AddMcpServerDialog.css';

export default function AddMcpServerDialog({ onClose, onCreateCustomServer }) {
  const handleCreateCustomServer = () => {
    if (onCreateCustomServer) {
      onCreateCustomServer();
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
          <p className="dialog-description">
            Save MCP Servers. Manage added connections in <button className="dialog-settings-link">settings</button>.
          </p>
          <div className="dialog-options">
            <div className="dialog-option">
              <div className="option-text">
                <div className="option-title">Connect existing MCP Server</div>
                <div className="option-description">Add JSON, HTTP, STDIO, SSE config</div>
              </div>
              <ArrowRight size={16} />
            </div>
            <div className="dialog-option" onClick={handleCreateCustomServer}>
              <div className="option-text">
                <div className="option-title">Create Custom MCP Server</div>
                <div className="option-description">Configure auth, add tools</div>
              </div>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 