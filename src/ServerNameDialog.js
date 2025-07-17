import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { McpIcon } from './icons';
import './AddMcpServerDialog.css';

export default function ServerNameDialog({ onClose, onCreate, onBack }) {
  const [serverName, setServerName] = useState('');
  const [error, setError] = useState(null);

  const handleCreate = () => {
    if (!serverName.trim()) {
      setError('Server name is required');
      return;
    }
    
    if (onCreate) {
      onCreate(serverName.trim());
    }
  };

  const handleInputChange = (e) => {
    setServerName(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          {onBack && (
            <button onClick={onBack} className="dialog-back-btn">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="dialog-title">
            <McpIcon />
            <span>Create Custom MCP Server</span>
          </div>
          <button onClick={onClose} className="dialog-close-btn">
            <X size={18} />
          </button>
        </div>
        <div className="dialog-content">
          <div className="server-name-field">
            <label className="server-name-label">Server Name</label>
            <input
              type="text"
              className={`server-name-input ${error ? 'error' : ''}`}
              value={serverName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter server name"
              autoFocus
            />
            {error && <span className="server-name-error">{error}</span>}
          </div>
          <div className="dialog-actions">
            <button className="dialog-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="dialog-create-btn" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 