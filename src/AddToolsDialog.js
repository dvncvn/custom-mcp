import React, { useState, useRef, useEffect } from 'react';
import { X, Search, HelpCircle, MoreHorizontal } from 'lucide-react';
import './AddToolsDialog.css';

const mockServers = [
  { id: 1, name: 'gmail-mcp', tools: 6, selected: true },
  { id: 2, name: 'google-maps', tools: 8, selected: false },
  { id: 3, name: 'mem0-memory-mcp', tools: 8, selected: false },
  { id: 4, name: 'my-project', tools: 32, selected: false },
  { id: 5, name: 'my-project', tools: 32, selected: false },
  { id: 6, name: 'my-project', tools: 32, selected: false },
  { id: 7, name: 'my-project', tools: 32, selected: false },
];

const mockTools = [
  { id: 1, name: 'Fetch Emails', slug: 'GMAIL_FETCH_EMAILS', server: 'Gmail', selected: true },
  { id: 2, name: 'Send Email', slug: 'GMAIL_SEND_EMAIL', server: 'Gmail', selected: true },
  { id: 3, name: 'Get Gmail Attachment', slug: 'GMAIL_GET_ATTACHMENT', server: 'Gmail', selected: true },
  { id: 4, name: 'Fetch Message by Message ID', slug: 'GMAIL_FETCH_MESSAGE_BY_MESSAGE_ID', server: 'Gmail', selected: true },
  { id: 5, name: 'Get Profile', slug: 'GMAIL_GET_PROFILE', server: 'Gmail', selected: true },
  { id: 6, name: 'Create Email Draft', slug: 'GMAIL_CREATE_EMAIL_DRAFT', server: 'Gmail', selected: true },
  { id: 7, name: 'Fetch Message by Thread ID', slug: 'GMAIL_FETCH_MESSAGE_BY_THREAD_ID', server: 'Gmail', selected: false },
  { id: 8, name: 'Reply to Email Thread', slug: 'GMAIL_REPLY_TO_THREAD', server: 'Gmail', selected: false },
  { id: 9, name: 'List Threads', slug: 'GMAIL_LIST_THREADS', server: 'Gmail', selected: false },
  { id: 10, name: 'Modify Label to Email', slug: 'GMAIL_ADD_LABEL_TO_EMAIL', server: 'Gmail', selected: false },
  { id: 11, name: 'Modify Thread Labels', slug: 'GMAIL_MODIFY_THREAD_LABELS', server: 'Gmail', selected: false },
  { id: 12, name: 'List Gmail Labels', slug: 'GMAIL_LIST_LABELS', server: 'Gmail', selected: false },
  { id: 13, name: 'Get People', slug: 'GMAIL_GET_PEOPLE', server: 'Gmail', selected: false },
  { id: 14, name: 'Create Label', slug: 'GMAIL_CREATE_LABEL', server: 'Gmail', selected: false },
  { id: 15, name: 'Search People', slug: 'GMAIL_SEARCH_PEOPLE', server: 'Gmail', selected: false },
  { id: 16, name: 'Get Contacts', slug: 'GMAIL_GET_CONTACTS', server: 'Gmail', selected: false },
  { id: 17, name: 'Remove Label', slug: 'GMAIL_REMOVE_LABEL', server: 'Gmail', selected: false },
];

const toolParameters = {
  'GMAIL_CREATE_LABEL': {
    name: 'Create Label',
    description: 'Action to create a new label in gmail.',
    parameters: [
      { 
        name: 'Label Name', 
        key: 'labelName',
        type: 'text', 
        required: true,
        description: 'Name of the label to create'
      },
      { 
        name: 'User ID', 
        key: 'userId',
        type: 'text', 
        required: false,
        defaultValue: 'me',
        description: 'Gmail user ID'
      },
      { 
        name: 'Label List Visibility', 
        key: 'labelListVisibility',
        type: 'select', 
        required: false,
        defaultValue: 'labelShow',
        options: ['labelShow', 'labelHide'],
        description: 'Visibility in label list'
      },
      { 
        name: 'Message List Visibility', 
        key: 'messageListVisibility',
        type: 'select', 
        required: false,
        defaultValue: 'show',
        options: ['show', 'hide'],
        description: 'Visibility in message list'
      }
    ]
  }
};

export default function AddToolsDialog({ onClose, onSave }) {
  const [selectedServer, setSelectedServer] = useState(mockServers[0]);
  const [selectedTool, setSelectedTool] = useState(mockTools.find(tool => tool.slug === 'GMAIL_CREATE_LABEL'));
  const [tools, setTools] = useState(mockTools);
  const [searchQuery, setSearchQuery] = useState('');
  const [toolConfig, setToolConfig] = useState({});
  
  const modalRef = useRef();

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedToolsCount = tools.filter(tool => tool.selected).length;
  const totalToolsCount = tools.length;
  const isOverTooled = selectedToolsCount > 12; // Warning threshold

  const handleToolToggle = (toolId) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId ? { ...tool, selected: !tool.selected } : tool
    ));
  };

  const handleSelectAll = () => {
    const allSelected = filteredTools.every(tool => tool.selected);
    setTools(prev => prev.map(tool => {
      if (filteredTools.find(filtered => filtered.id === tool.id)) {
        return { ...tool, selected: !allSelected };
      }
      return tool;
    }));
  };

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    // Initialize config for this tool if it has parameters
    if (toolParameters[tool.slug]) {
      const initialConfig = {};
      toolParameters[tool.slug].parameters.forEach(param => {
        initialConfig[param.key] = param.defaultValue || '';
      });
      setToolConfig(initialConfig);
    }
  };

  const handleConfigChange = (key, value) => {
    setToolConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    const selectedTools = tools.filter(tool => tool.selected);
    if (onSave) {
      onSave(selectedTools, toolConfig);
    }
    onClose();
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const selectedToolParams = selectedTool ? toolParameters[selectedTool.slug] : null;

  return (
    <div className="add-tools-overlay">
      <div className="add-tools-dialog" ref={modalRef}>
        <div className="add-tools-header">
          <div className="header-left">
            <h2>Add Tools</h2>
            <span className="total-tools-count">{selectedToolsCount} of {totalToolsCount} tools selected</span>
          </div>
          <button className="add-tools-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="add-tools-content">
          {/* Left sidebar - Servers */}
          <div className="add-tools-servers">
            <div className="servers-header">TOOLS</div>
            <div className="servers-list">
              {mockServers.map((server) => (
                <div 
                  key={server.id}
                  className={`server-item ${selectedServer.id === server.id ? 'selected' : ''}`}
                  onClick={() => setSelectedServer(server)}
                >
                  <div className="server-info">
                    <span className="server-name">{server.name}</span>
                    <span className="server-tools-count">{server.tools} tools</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Tools list */}
          <div className="add-tools-main">
            <div className="tools-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="tools-table">
              <div className="tools-table-header">
                <div className="table-col-checkbox">
                  <input
                    type="checkbox"
                    checked={filteredTools.length > 0 && filteredTools.every(tool => tool.selected)}
                    onChange={handleSelectAll}
                    title="Select all tools"
                  />
                </div>
                <div className="table-col-name">Name</div>
                <div className="table-col-slug">Slug</div>
                <div className="table-col-count"></div>
              </div>
              
              <div className="tools-table-body">
                {filteredTools.map((tool) => (
                  <div 
                    key={tool.id} 
                    className={`tool-row ${selectedTool?.id === tool.id ? 'selected' : ''}`}
                    onClick={() => handleToolSelect(tool)}
                  >
                    <div className="table-col-checkbox">
                      <input
                        type="checkbox"
                        checked={tool.selected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToolToggle(tool.id);
                        }}
                      />
                    </div>
                    <div className="table-col-name">{tool.name}</div>
                    <div className="table-col-slug">{tool.slug}</div>
                    <div className="table-col-count"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar - Tool configuration */}
          <div className="add-tools-config">
            {selectedTool && selectedToolParams ? (
              <>
                <div className="config-header">
                  <h3>{selectedToolParams.name}</h3>
                  <button className="config-more-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <p className="config-description">{selectedToolParams.description}</p>
                
                <div className="config-section">
                  <h4>Parameters</h4>
                  <p className="config-section-desc">Manage inputs for this action</p>
                  
                  <div className="config-fields">
                    {selectedToolParams.parameters.map((param) => (
                      <div key={param.key} className="config-field">
                        <label className="config-label">
                          {param.name}
                          {param.required && <span className="required">*</span>}
                          <HelpCircle size={12} className="help-icon" title={param.description} />
                        </label>
                        
                        {param.type === 'select' ? (
                          <select
                            className="config-input"
                            value={toolConfig[param.key] || param.defaultValue || ''}
                            onChange={(e) => handleConfigChange(param.key, e.target.value)}
                          >
                            {param.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="config-input"
                            value={toolConfig[param.key] || param.defaultValue || ''}
                            onChange={(e) => handleConfigChange(param.key, e.target.value)}
                            placeholder={param.defaultValue}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : selectedTool ? (
              <div className="config-placeholder">
                <h3>{selectedTool.name}</h3>
                <p>No configuration options available for this tool.</p>
              </div>
            ) : (
              <div className="config-placeholder">
                <p>Select a tool to configure its parameters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Over-tooled warning */}
        {isOverTooled && (
          <div className="over-tooled-warning">
            <div className="warning-content">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="warning-icon">
                <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
              </svg>
              <span className="warning-text">
                <strong>Over-tooled server:</strong> {selectedToolsCount} tools selected. 
                Consider reducing to improve performance and maintainability.
              </span>
            </div>
          </div>
        )}

        <div className="add-tools-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className={`btn-primary ${isOverTooled ? 'btn-warning' : ''}`} onClick={handleSave}>
            {isOverTooled ? 'Add Tools (Over-tooled)' : 'Add Selected Tools'}
          </button>
        </div>
      </div>
    </div>
  );
} 