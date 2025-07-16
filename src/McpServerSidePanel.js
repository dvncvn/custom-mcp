import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, MoreHorizontal, Info, Edit, Share2, GitBranch, Zap, Trash2, AlertTriangle } from 'lucide-react';
import './McpServerSidePanel.css';
import AddToolsDialog from './AddToolsDialog';

export default function McpServerSidePanel({ serverData, onClose, onEdit, onDelete }) {
  const [isRunning, setIsRunning] = useState(true);
  const [authType, setAuthType] = useState('none');
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [serverName, setServerName] = useState(serverData?.name || 'Figmail');
  const [panelWidth, setPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  
  // Confirmation dialog states
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [showAuthChangeConfirm, setShowAuthChangeConfirm] = useState(false);
  const [pendingAuthType, setPendingAuthType] = useState(null);
  
  // Add Tools dialog state
  const [showAddToolsDialog, setShowAddToolsDialog] = useState(false);
  
  // Authentication field states
  const [apiKeyHeader, setApiKeyHeader] = useState('');
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [basicUsername, setBasicUsername] = useState('');
  const [basicPassword, setBasicPassword] = useState('');
  const [iamEndpoint, setIamEndpoint] = useState('');
  const [iamApiKey, setIamApiKey] = useState('');
  const [iamToken, setIamToken] = useState('');
  
  const actionsMenuRef = useRef();
  const authDropdownRef = useRef();
  const panelRef = useRef();

  const tools = [
    'GMAIL_CREATE_EMAIL_DRAFT',
    'GMAIL_CREATE_LABEL', 
    'GMAIL_FETCH_EMAILS',
    'GMAIL_GET_CONTACTS',
    'GMAIL_GET_PROFILE',
    'GMAIL_LIST_LABELS'
  ];

  const toolCount = tools.length;
  const isToolsOverTooled = toolCount > 12;

  const authOptions = [
    { value: 'none', label: 'None' },
    { value: 'apiKey', label: 'API Key' },
    { value: 'basic', label: 'Basic' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'iam', label: 'IAM' }
  ];

  const MIN_WIDTH = 320;
  const MAX_WIDTH = 600;

  // Helper function to check if auth fields are populated
  const hasAuthFieldsPopulated = () => {
    switch (authType) {
      case 'apiKey':
        return apiKeyHeader.trim() !== '' || apiKeyValue.trim() !== '';
      case 'bearer':
        return bearerToken.trim() !== '';
      case 'basic':
        return basicUsername.trim() !== '' || basicPassword.trim() !== '';
      case 'iam':
        return iamEndpoint.trim() !== '' || iamApiKey.trim() !== '' || iamToken.trim() !== '';
      default:
        return false;
    }
  };

  const handleToggleStatus = () => {
    setShowStatusConfirm(true);
  };

  const confirmStatusToggle = () => {
    setIsRunning(!isRunning);
    setShowStatusConfirm(false);
  };

  const cancelStatusToggle = () => {
    setShowStatusConfirm(false);
  };

  const handleActionsClick = () => {
    setShowActionsMenu(!showActionsMenu);
  };

  const handleAuthClick = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };

  const handleAuthSelect = (value) => {
    if (hasAuthFieldsPopulated() && value !== authType) {
      setPendingAuthType(value);
      setShowAuthChangeConfirm(true);
      setShowAuthDropdown(false);
    } else {
      setAuthType(value);
      setShowAuthDropdown(false);
    }
  };

  const confirmAuthChange = () => {
    setAuthType(pendingAuthType);
    // Clear all auth fields when switching types
    setApiKeyHeader('');
    setApiKeyValue('');
    setBearerToken('');
    setBasicUsername('');
    setBasicPassword('');
    setIamEndpoint('');
    setIamApiKey('');
    setIamToken('');
    setShowAuthChangeConfirm(false);
    setPendingAuthType(null);
  };

  const cancelAuthChange = () => {
    setShowAuthChangeConfirm(false);
    setPendingAuthType(null);
  };

  const handleAddTools = () => {
    setShowAddToolsDialog(true);
  };

  const handleCloseAddTools = () => {
    setShowAddToolsDialog(false);
  };

  const handleSaveTools = (selectedTools, toolConfig) => {
    // TODO: Implement tool saving logic
    console.log('Selected tools:', selectedTools);
    console.log('Tool config:', toolConfig);
    setShowAddToolsDialog(false);
  };

  const handleResizeStart = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleResize = useCallback((e) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
    setPanelWidth(clampedWidth);
  }, [isResizing, MIN_WIDTH, MAX_WIDTH]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleActionSelect = (action) => {
    setShowActionsMenu(false);
    switch (action) {
      case 'edit':
        if (onEdit) onEdit(serverData);
        break;
      case 'delete':
        if (onDelete) onDelete(serverData);
        break;
      case 'connect':
        console.log('Connect action');
        break;
      case 'fork':
        console.log('Fork action');
        break;
      case 'useInFlow':
        console.log('Use in flow action');
        break;
      default:
        break;
    }
  };

  const renderAuthFields = () => {
    switch (authType) {
      case 'none':
        return (
          <div className="auth-warning">
            Public endpoint. Use only in dev or trusted envs.
          </div>
        );
      
      case 'apiKey':
        return (
          <div className="auth-fields">
            <div className="auth-field">
              <label className="auth-field-label">Header Name</label>
              <input
                type="text"
                className="side-panel-input"
                value={apiKeyHeader}
                onChange={(e) => setApiKeyHeader(e.target.value)}
                placeholder="X-API-Key"
              />
            </div>
            <div className="auth-field">
              <label className="auth-field-label">API Key Value</label>
              <input
                type="password"
                className="side-panel-input"
                value={apiKeyValue}
                onChange={(e) => setApiKeyValue(e.target.value)}
                placeholder="Enter your API key"
              />
            </div>
          </div>
        );
      
      case 'bearer':
        return (
          <div className="auth-fields">
            <div className="auth-field">
              <label className="auth-field-label">Token Value</label>
              <input
                type="password"
                className="side-panel-input"
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                placeholder="Enter your bearer token"
              />
            </div>
          </div>
        );
      
      case 'basic':
        return (
          <div className="auth-fields">
            <div className="auth-field">
              <label className="auth-field-label">Username</label>
              <input
                type="text"
                className="side-panel-input"
                value={basicUsername}
                onChange={(e) => setBasicUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="auth-field">
              <label className="auth-field-label">Password</label>
              <input
                type="password"
                className="side-panel-input"
                value={basicPassword}
                onChange={(e) => setBasicPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>
        );
      
      case 'iam':
        return (
          <div className="auth-fields">
            <div className="auth-field">
              <label className="auth-field-label">IAM Endpoint</label>
              <input
                type="text"
                className="side-panel-input"
                value={iamEndpoint}
                onChange={(e) => setIamEndpoint(e.target.value)}
                placeholder="https://iam.example.com"
              />
            </div>
            <div className="auth-field">
              <label className="auth-field-label">API Key</label>
              <input
                type="password"
                className="side-panel-input"
                value={iamApiKey}
                onChange={(e) => setIamApiKey(e.target.value)}
                placeholder="Enter IAM API key"
              />
            </div>
            <div className="auth-field">
              <label className="auth-field-label">Token</label>
              <input
                type="password"
                className="side-panel-input"
                value={iamToken}
                onChange={(e) => setIamToken(e.target.value)}
                placeholder="Enter IAM token"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target)) {
        setShowActionsMenu(false);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setShowAuthDropdown(false);
      }
    };

    if (showActionsMenu || showAuthDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showActionsMenu, showAuthDropdown]);

  // Handle resize mouse events
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', handleResizeEnd);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleResize, handleResizeEnd]);

    return (
    <div 
      className="mcp-server-side-panel" 
      ref={panelRef}
      style={{ width: panelWidth }}
    >
      <div 
        className="resize-handle"
        onMouseDown={handleResizeStart}
      />
      <div className="side-panel-header">
          <div className="side-panel-tabs">
            <div className="side-panel-tab active">Build</div>
            <div className="side-panel-tab">Logs</div>
          </div>
          <div className="side-panel-actions">
            <button 
              className="side-panel-more-btn"
              onClick={handleActionsClick}
            >
              <MoreHorizontal size={16} />
            </button>
            <button className="side-panel-close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          {showActionsMenu && (
            <div className="actions-dropdown">
              <div className="actions-dropdown-item" onClick={() => handleActionSelect('edit')}>
                <Edit size={16} />
                <span>Edit</span>
              </div>
              <div className="actions-dropdown-item" onClick={() => handleActionSelect('connect')}>
                <Share2 size={16} />
                <span>Connect</span>
              </div>
              <div className="actions-dropdown-item" onClick={() => handleActionSelect('fork')}>
                <GitBranch size={16} />
                <span>Fork</span>
              </div>
              <div className="actions-dropdown-item" onClick={() => handleActionSelect('useInFlow')}>
                <Zap size={16} />
                <span>Use in flow</span>
              </div>
              <div className="actions-dropdown-item delete" onClick={() => handleActionSelect('delete')}>
                <Trash2 size={16} />
                <span>Delete</span>
              </div>
            </div>
          )}
        </div>

        <div className="side-panel-content">
          <div className="side-panel-section">
            <label className="side-panel-label">
              Server Name
              <Info size={14} className="side-panel-info-icon" />
            </label>
            <input
              type="text"
              className="side-panel-input"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </div>

          <div className="side-panel-section">
            <label className="side-panel-label">
              Status
              <Info size={14} className="side-panel-info-icon" />
            </label>
            <div className="status-row">
              <div className="status-indicator">
                <div className={`status-dot ${isRunning ? 'running' : 'stopped'}`}></div>
                <span className="status-text">{isRunning ? 'Running' : 'Stopped'}</span>
              </div>
              <button 
                className="status-toggle-btn"
                onClick={handleToggleStatus}
              >
                {isRunning ? 'Stop' : 'Start'}
              </button>
            </div>
          </div>

          <div className="side-panel-section">
            <label className="side-panel-label">Authentication</label>
            <div className="auth-dropdown-container" ref={authDropdownRef}>
              <button 
                className="auth-dropdown-button"
                onClick={handleAuthClick}
              >
                {authOptions.find(option => option.value === authType)?.label}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  className={`auth-dropdown-arrow ${showAuthDropdown ? 'open' : ''}`}
                >
                  <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showAuthDropdown && (
                <div className="auth-dropdown">
                  {authOptions.map((option) => (
                    <div 
                      key={option.value}
                      className={`auth-dropdown-item ${authType === option.value ? 'selected' : ''}`}
                      onClick={() => handleAuthSelect(option.value)}
                    >
                      {option.label}
                      {authType === option.value && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.5 4.5L6 12l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {renderAuthFields()}
          </div>

          <div className="side-panel-section">
            <div className="tools-header">
              <div className="tools-label-container">
                <label className="side-panel-label">Tools ({toolCount})</label>
                {isToolsOverTooled && (
                  <AlertTriangle size={14} className="tools-warning-icon" title="Over-tooled server" />
                )}
              </div>
              <button className="add-tools-btn" onClick={handleAddTools}>+</button>
            </div>
            <div className={`tools-list ${isToolsOverTooled ? 'over-tooled' : ''}`}>
              {tools.map((tool, index) => (
                <div key={index} className="tool-item">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status confirmation dialog */}
        {showStatusConfirm && (
          <div className="confirmation-overlay">
            <div className="confirmation-dialog">
              <h3 className="confirmation-title">
                {isRunning ? 'Stop Server' : 'Start Server'}
              </h3>
              <p className="confirmation-message">
                Are you sure you want to {isRunning ? 'stop' : 'start'} this server?
              </p>
              <div className="confirmation-buttons">
                <button className="confirmation-btn secondary" onClick={cancelStatusToggle}>
                  Cancel
                </button>
                <button className="confirmation-btn primary" onClick={confirmStatusToggle}>
                  {isRunning ? 'Stop' : 'Start'}
                </button>
              </div>
            </div>
          </div>
        )}

                 {/* Auth change confirmation dialog */}
         {showAuthChangeConfirm && (
           <div className="confirmation-overlay">
             <div className="confirmation-dialog">
               <h3 className="confirmation-title">Change Authentication Type</h3>
               <p className="confirmation-message">
                 You have unsaved authentication data. Changing the authentication type will clear all current fields. Are you sure you want to continue?
               </p>
               <div className="confirmation-buttons">
                 <button className="confirmation-btn secondary" onClick={cancelAuthChange}>
                   Cancel
                 </button>
                 <button className="confirmation-btn primary" onClick={confirmAuthChange}>
                   Change Type
                 </button>
               </div>
             </div>
           </div>
         )}

         {/* Add Tools dialog */}
         {showAddToolsDialog && (
           <AddToolsDialog 
             onClose={handleCloseAddTools}
             onSave={handleSaveTools}
           />
         )}
      </div>
  );
} 