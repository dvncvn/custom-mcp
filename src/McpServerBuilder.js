import React, { useState } from 'react';
import { ArrowLeft, Info, Plus } from 'lucide-react';
import './McpServerBuilder.css';

export default function McpServerBuilder({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    authType: 'apiKey',
    headerName: '',
    apiKeyValue: '',
    basicUsername: '',
    basicPassword: '',
    bearerToken: '',
    actions: []
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleAuthTypeChange = (authType) => {
    setFormData(prev => ({
      ...prev,
      authType
    }));
  };

  const handleAddActions = () => {
    // TODO: Implement actions dialog
    console.log('Add Actions clicked');
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.authType === 'apiKey' && !formData.headerName.trim()) {
      newErrors.headerName = 'Header name is required for API Key auth';
    }
    
    if (formData.authType === 'apiKey' && !formData.apiKeyValue.trim()) {
      newErrors.apiKeyValue = 'API Key value is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  return (
    <div className="mcp-server-builder">
      <div className="mcp-builder-header">
        <button className="mcp-builder-back-btn" onClick={onClose}>
          <ArrowLeft size={16} />
          New Custom MCP Server
        </button>
      </div>
      
      <div className="mcp-builder-content">
        <div className="mcp-builder-section">
          <h3 className="mcp-builder-section-title">Basic details</h3>
          
          <div className="mcp-builder-field">
            <label className="mcp-builder-label">
              Name
              <Info size={14} className="mcp-builder-info-icon" />
            </label>
            <input
              type="text"
              className={`mcp-builder-input ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Figmail"
            />
            {errors.name && <span className="mcp-builder-error">{errors.name}</span>}
          </div>
          
          <div className="mcp-builder-field">
            <label className="mcp-builder-label">
              Description
              <Info size={14} className="mcp-builder-info-icon" />
            </label>
            <input
              type="text"
              className="mcp-builder-input"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Server Name"
            />
          </div>
        </div>
        
        <div className="mcp-builder-section">
          <h3 className="mcp-builder-section-title">Authentication</h3>
          
          <div className="mcp-builder-auth-layout">
            <div className="mcp-builder-auth-options">
              <div className="mcp-builder-auth-option">
                <label className="mcp-builder-radio-label">
                  <input
                    type="radio"
                    name="authType"
                    value="apiKey"
                    checked={formData.authType === 'apiKey'}
                    onChange={(e) => handleAuthTypeChange(e.target.value)}
                  />
                  <span className="mcp-builder-radio-text">API Key</span>
                </label>
              </div>
              
              <div className="mcp-builder-auth-option">
                <label className="mcp-builder-radio-label">
                  <input
                    type="radio"
                    name="authType"
                    value="basic"
                    checked={formData.authType === 'basic'}
                    onChange={(e) => handleAuthTypeChange(e.target.value)}
                  />
                  <span className="mcp-builder-radio-text">Basic</span>
                </label>
              </div>
              
              <div className="mcp-builder-auth-option">
                <label className="mcp-builder-radio-label">
                  <input
                    type="radio"
                    name="authType"
                    value="bearerToken"
                    checked={formData.authType === 'bearerToken'}
                    onChange={(e) => handleAuthTypeChange(e.target.value)}
                  />
                  <span className="mcp-builder-radio-text">Bearer Token</span>
                </label>
              </div>
              
              <div className="mcp-builder-auth-option">
                <label className="mcp-builder-radio-label">
                  <input
                    type="radio"
                    name="authType"
                    value="iam"
                    checked={formData.authType === 'iam'}
                    onChange={(e) => handleAuthTypeChange(e.target.value)}
                  />
                  <span className="mcp-builder-radio-text">IAM</span>
                </label>
              </div>
              
              <div className="mcp-builder-auth-option">
                <label className="mcp-builder-radio-label">
                  <input
                    type="radio"
                    name="authType"
                    value="none"
                    checked={formData.authType === 'none'}
                    onChange={(e) => handleAuthTypeChange(e.target.value)}
                  />
                  <span className="mcp-builder-radio-text">None</span>
                </label>
              </div>
            </div>
            
            <div className="mcp-builder-auth-fields">
              {formData.authType === 'apiKey' && (
                <>
                  <div className="mcp-builder-field">
                    <label className="mcp-builder-label">
                      Header Name
                      <Info size={14} className="mcp-builder-info-icon" />
                    </label>
                    <input
                      type="text"
                      className={`mcp-builder-input ${errors.headerName ? 'error' : ''}`}
                      value={formData.headerName}
                      onChange={(e) => handleInputChange('headerName', e.target.value)}
                      placeholder="{json}"
                    />
                    {errors.headerName && <span className="mcp-builder-error">{errors.headerName}</span>}
                  </div>
                  
                  <div className="mcp-builder-field">
                    <label className="mcp-builder-label">
                      API Key Value
                      <Info size={14} className="mcp-builder-info-icon" />
                    </label>
                    <input
                      type="password"
                      className={`mcp-builder-input ${errors.apiKeyValue ? 'error' : ''}`}
                      value={formData.apiKeyValue}
                      onChange={(e) => handleInputChange('apiKeyValue', e.target.value)}
                      placeholder="{json}"
                    />
                    {errors.apiKeyValue && <span className="mcp-builder-error">{errors.apiKeyValue}</span>}
                  </div>
                </>
              )}
              
              {formData.authType === 'basic' && (
                <>
                  <div className="mcp-builder-field">
                    <label className="mcp-builder-label">Username</label>
                    <input
                      type="text"
                      className="mcp-builder-input"
                      value={formData.basicUsername}
                      onChange={(e) => handleInputChange('basicUsername', e.target.value)}
                      placeholder="Enter username"
                    />
                  </div>
                  
                  <div className="mcp-builder-field">
                    <label className="mcp-builder-label">Password</label>
                    <input
                      type="password"
                      className="mcp-builder-input"
                      value={formData.basicPassword}
                      onChange={(e) => handleInputChange('basicPassword', e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                </>
              )}
              
              {formData.authType === 'bearerToken' && (
                <div className="mcp-builder-field">
                  <label className="mcp-builder-label">Bearer Token</label>
                  <input
                    type="password"
                    className="mcp-builder-input"
                    value={formData.bearerToken}
                    onChange={(e) => handleInputChange('bearerToken', e.target.value)}
                    placeholder="Enter bearer token"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mcp-builder-section">
          <h3 className="mcp-builder-section-title">Tools</h3>
          
          <div className="mcp-builder-tools-empty">
            <p className="mcp-builder-tools-empty-text">No actions added to this server.</p>
            <button className="mcp-builder-add-actions-btn" onClick={handleAddActions}>
              <Plus size={16} />
              Add Actions
            </button>
          </div>
        </div>
      </div>
      
      <div className="mcp-builder-footer">
        <button className="mcp-builder-cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button className="mcp-builder-create-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
} 