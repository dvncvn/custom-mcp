import React, { useState } from 'react';
import { Search, Settings2, Plus, ExternalLink, AlertTriangle, Star, MoreHorizontal, Key } from 'lucide-react';
import { BlocksIcon } from './icons';
import './ServerManagement.css';

export default function ServerManagement({ 
  servers = [], 
  onAddServer, 
  onServerSelect,
  selectedServerId,
  isSidebarOpen = true
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusDotClass = (status) => {
    return status === 'online' ? 'status-dot-online' : 'status-dot-offline';
  };

  const getTypeIcon = (server) => {
    if (server.type === 'project') {
      return <BlocksIcon size={16} className="type-icon" />;
    }
    return null;
  };

  const getTypeBadge = (server) => {
    if (server.type === 'custom') {
      return <span className="type-badge custom">Custom</span>;
    }
    return null;
  };

  return (
    <div className={`server-management${!isSidebarOpen ? ' sidebar-collapsed' : ''}`}>
      <div className="server-management-header">
        <div className="header-left">
          <h1 className="page-title">MCP Servers</h1>
          <p className="page-description">Manage your MCP server connections and configurations</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={onAddServer}>
            <Plus size={16} />
            Add Server
          </button>
        </div>
      </div>

      <div className="server-management-content">
        <div className="content-header">
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="view-controls">
            <button className="btn-icon" title="Settings">
              <Settings2 size={16} />
            </button>
          </div>
        </div>

        <div className="servers-table">
          <div className="table-header">
            <div className="table-col name">Name</div>
            <div className="table-col tools"># Tools</div>
            <div className="table-col connected">Connected to</div>
            <div className="table-col actions"></div>
          </div>
          
          <div className="table-body">
            {filteredServers.length > 0 ? (
              filteredServers.map((server) => (
                <div 
                  key={server.id}
                  className={`table-row ${selectedServerId === server.id ? 'selected' : ''}`}
                  onClick={() => onServerSelect(server)}
                >
                  <div className="table-col name">
                    <div className="server-name-cell">
                      <div className="server-name-row">
                        <span className={`status-dot ${getStatusDotClass(server.status)}`}></span>
                        <span className="server-name">{server.name}</span>
                        {server.authType && server.authType !== 'none' && (
                          <Key size={12} className="auth-key-icon" title={`Authentication: ${server.authType}`} />
                        )}
                      </div>
                      {server.warning && (
                        <div className="server-warning">
                          <AlertTriangle size={14} className="warning-icon" />
                          <span className="warning-text">{server.warning}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="table-col tools">
                    <span className="tools-count">{server.tools} tools</span>
                  </div>
                  
                  <div className="table-col connected">
                    <button className="favorite-btn" title="Add to favorites">
                      <Star size={16} />
                    </button>
                  </div>
                  
                  <div className="table-col actions">
                    <button className="connect-btn">
                      Connect
                    </button>
                    <button 
                      className="more-actions-btn" 
                      title="More actions"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-empty">
                <div className="empty-state">
                  <p className="empty-message">
                    {searchQuery ? 'No servers match your search.' : 'No servers configured yet.'}
                  </p>
                  {!searchQuery && (
                    <button className="btn-primary" onClick={onAddServer}>
                      <Plus size={16} />
                      Add Your First Server
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 