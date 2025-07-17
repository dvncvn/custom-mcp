import React from 'react';
import { Plus, Folder, Users, FileText, File } from 'lucide-react';
import { McpIcon } from './icons';
import './ProjectSidebar.css';

const projectItems = [
  { key: 'rag-project', icon: <Folder size={16} />, label: 'RAG project' },
  { key: 'project-name', icon: <Folder size={16} />, label: 'Project name' },
  { key: 'agents', icon: <Users size={16} />, label: 'Agents' },
  { key: 'text-extraction', icon: <FileText size={16} />, label: 'Text Extraction' },
];

const navigationItems = [
  { key: 'mcp-servers', icon: <McpIcon size={16} />, label: 'MCP Servers', active: true },
  { key: 'files', icon: <File size={16} />, label: 'Files' },
];

export default function ProjectSidebar() {
  return (
    <aside className="project-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span className="sidebar-section-title">Projects</span>
          <button className="sidebar-add-btn" title="Add Project">
            <Plus size={16} />
          </button>
        </div>
        <div className="sidebar-section-list">
          {projectItems.map((item) => (
            <div key={item.key} className="sidebar-section-item">
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-list">
          {navigationItems.map((item) => (
            <div 
              key={item.key} 
              className={`sidebar-section-item ${item.active ? 'active' : ''}`}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
} 