import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Settings, X, MoreHorizontal, Edit } from 'lucide-react';
import { McpIcon } from './icons';
import './McpServerComponent.css';

export default function McpServerComponent({ 
  position = { x: 100, y: 100 }, 
  selectedServerId, 
  servers = [],
  onServerChange,
  onRemove,
  onPositionChange,
  isSelected = false,
  onSelect,
  onEditServer
}) {
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [componentPosition, setComponentPosition] = useState(position);
  
  const dropdownRef = useRef();
  const componentRef = useRef();

  const selectedServer = servers.find(server => server.id === selectedServerId) || servers[0];

  const handleServerSelect = (serverId) => {
    if (onServerChange) {
      onServerChange(serverId);
    }
    setShowServerDropdown(false);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.server-dropdown-container') || e.target.closest('.component-actions')) {
      return; // Don't start drag if clicking on dropdowns or actions
    }
    
    // Select component on click
    if (onSelect) {
      onSelect();
    }
    
    setIsDragging(true);
    const rect = componentRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    
    setComponentPosition(newPosition);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onPositionChange) {
        onPositionChange(componentPosition);
      }
    }
  };

  // Handle mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, dragOffset, componentPosition]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServerDropdown(false);
      }
    };

    if (showServerDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showServerDropdown]);

  return (
    <div 
      ref={componentRef}
      className={`mcp-server-component ${isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
      style={{ 
        left: componentPosition.x, 
        top: componentPosition.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="component-header">
        <div className="component-icon">
          <McpIcon size={16} color="#fff" />
        </div>
        <span className="component-title">MCP Server</span>
        <div className="component-actions">
          <button className="component-action-btn" title="Settings">
            <Settings size={14} />
          </button>
          <button className="component-action-btn" title="More">
            <MoreHorizontal size={14} />
          </button>
          <button className="component-action-btn remove" onClick={onRemove} title="Remove">
            <X size={14} />
          </button>
        </div>
      </div>
      
      <div className="component-content">
        <div className="component-field">
          <label className="component-label">Server</label>
          <div className="server-field-row">
            <div className="server-dropdown-container" ref={dropdownRef}>
              <button 
                className="server-dropdown-button"
                onClick={() => setShowServerDropdown(!showServerDropdown)}
              >
                <span className="server-name">{selectedServer?.name || 'Select Server'}</span>
                {selectedServer?.type === 'custom' && (
                  <span className="server-badge">Custom</span>
                )}
                <ChevronDown 
                  size={16} 
                  className={`dropdown-arrow ${showServerDropdown ? 'open' : ''}`}
                />
              </button>
            
            {showServerDropdown && (
              <div className="server-dropdown">
                {servers.map((server) => (
                  <div 
                    key={server.id}
                    className={`server-dropdown-item ${selectedServerId === server.id ? 'selected' : ''}`}
                    onClick={() => handleServerSelect(server.id)}
                  >
                    <div className="server-item-content">
                      <span className={`status-dot ${server.status}`}></span>
                      <span className="server-item-name">{server.name}</span>
                      {server.type === 'custom' && (
                        <span className="server-badge">Custom</span>
                      )}
                    </div>
                    <span className="server-tools-count">{server.tools} tools</span>
                    {selectedServerId === server.id && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="check-icon">
                        <path d="M13.5 4.5L6 12l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
            </div>
            
            {selectedServer && onEditServer && (
              <button 
                className="edit-server-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditServer();
                }}
                title="Edit Server"
              >
                <Edit size={14} />
              </button>
            )}
          </div>
        </div>
        
        <div className="component-status">
          <div className="status-indicator">
            <div className={`status-dot ${selectedServer?.status || 'offline'}`}></div>
            <span className="status-text">
              {selectedServer?.status === 'online' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <span className="tools-count">{selectedServer?.tools || 0} tools</span>
        </div>
      </div>
      
      <div className="component-connectors">
        <div className="connector input" title="Input"></div>
        <div className="connector output" title="Output"></div>
      </div>
    </div>
  );
} 