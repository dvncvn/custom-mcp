import React, { useState } from 'react';
import './App.css';
import {
  Home,
  Search,
  Plus,
  User,
  Database,
  Layers,
  Code,
  File,
  MessageSquare,
  Bell,
  Github,
  HelpCircle,
  Zap,
  GripHorizontal,
  Settings2,
  ExternalLink,
  MoreHorizontal,
  LogIn,
  LogOut,
  StickyNote,
  Bot,
  Play,
  Share,
  ChevronDown,
  FileText,
  Terminal,
  ZoomIn,
  ZoomOut,
  Focus,
  Minus,
  X,
  Type,
  Square,
  PlayCircle,
  Network,
  Book,
  Keyboard,
  Bug,
  Download,
  ArrowUpRight,
} from 'lucide-react';
import { McpIcon, AgentIcon, ComponentsIcon, BlocksIcon, NotesIcon, FlowIcon, ExtensionsIcon, AnnotationsIcon } from './icons';
import AddMcpServerDialog from './AddMcpServerDialog';
import McpServerBuilder from './McpServerBuilder';
import ServerNameDialog from './ServerNameDialog';
import McpServerSidePanel from './McpServerSidePanel';
import McpServerComponent from './McpServerComponent';
import ContextualToolbar from './ContextualToolbar';
import AddToolsDialog from './AddToolsDialog';
import ServerManagement from './ServerManagement';
import ProjectSidebar from './ProjectSidebar';

const leftNavItems = [
  { key: 'agent', icon: <AgentIcon size={20} />, label: 'Agents' },
  { key: 'component', icon: <ComponentsIcon size={20} />, label: 'Components' },
  { key: 'mcp', icon: <McpIcon size={20} />, label: 'MCP Servers' },
  { key: 'extensions', icon: <ExtensionsIcon size={20} />, label: 'Extensions' },
  { key: 'annotations', icon: <AnnotationsIcon size={20} />, label: 'Annotations' },
];

const componentsSidebarItems = [
  { key: 'input', icon: <LogIn size={16} />, label: 'Input' },
  { key: 'output', icon: <LogOut size={16} />, label: 'Output' },
  { key: 'language-model', icon: <User size={16} />, label: 'Language Model' }, // Custom icon in Figma
  { key: 'embedding-model', icon: <Database size={16} />, label: 'Embedding Model' },
  { key: 'vector-store', icon: <Layers size={16} />, label: 'Vector Store' },
  { key: 'api-request', icon: <Code size={16} />, label: 'API Request' },
  { key: 'file', icon: <File size={16} />, label: 'File' },
  { key: 'news-search', icon: <MessageSquare size={16} />, label: 'News Search' },
  { key: 'web-search', icon: <Search size={16} />, label: 'Web Search' },
  { key: 'webhook', icon: <Plus size={16} />, label: 'Webhook' },
];

const annotationItems = [
  { key: 'sticky-note', icon: <StickyNote size={16} />, label: 'Sticky Note' },
  { key: 'text', icon: <Type size={16} />, label: 'Text' },
  { key: 'section', icon: <Square size={16} />, label: 'Section' },
  { key: 'readme', icon: <FileText size={16} />, label: 'README' },
];

function TopNav({ tabs, selectedTab, setSelectedTab, onCloseTab }) {
  return (
    <nav className="top-nav">
      <div className="window-controls">
        <span className="window-dot red" />
        <span className="window-dot yellow" />
        <span className="window-dot green" />
      </div>
      <div className="top-nav-tabs-section">
        <button className="top-nav-home-btn" title="Home">
          <Home size={20} />
        </button>
        <div className="top-nav-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`top-nav-tab${selectedTab === tab.id ? ' selected' : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.icon}
              <span className="top-nav-tab-label">{tab.label}</span>
              <button 
                className="top-nav-tab-close" 
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
              >
                &times;
              </button>
            </div>
          ))}
          <button className="top-nav-tab-add">+</button>
        </div>
      </div>
      <div className="top-nav-utility">
        <Github size={18} />
        <span className="top-nav-utility-count">52.2k</span>
        <span className="top-nav-utility-divider" />
        <MessageSquare size={18} />
        <span className="top-nav-utility-count">16k</span>
        <span className="top-nav-utility-divider" />
        <Bell size={18} />
        <span className="top-nav-utility-divider" />
        <span className="top-nav-utility-contributors">
          {/* Placeholder for contributors avatars */}
          <span className="contributor-avatar" />
        </span>
      </div>
    </nav>
  );
}

function LeftNav({ focused, setFocused, isSidebarOpen, setIsSidebarOpen }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleClick = (itemKey) => {
    if (itemKey === focused) {
      // If clicking the currently focused item, toggle the sidebar
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // If clicking a new item, set focus and ensure sidebar is open
      setFocused(itemKey);
      setIsSidebarOpen(true);
    }
  };

  return (
    <aside className="left-nav">
      {leftNavItems.map((item) => (
        <div key={item.key} className="left-nav-item-container">
          <button
            className={`left-nav-btn${isSidebarOpen && focused === item.key ? ' focused' : ''}`}
            onClick={() => handleClick(item.key)}
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {React.cloneElement(item.icon, {
              color: isSidebarOpen && focused === item.key ? '#fff' : '#A1A1AA'
            })}
          </button>
          {hoveredItem === item.key && !isSidebarOpen && (
            <div className="left-nav-tooltip">
              {item.label}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

function ComponentsSidebar() {
  return (
    <aside className="components-sidebar">
      <div className="sidebar-search-row">
        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search"
          />
          <span className="sidebar-search-slash">/</span>
        </div>
      </div>
      <div className="sidebar-header">COMPONENTS</div>
      <div className="sidebar-list">
        {componentsSidebarItems.map((item) => (
          <div className="sidebar-item" key={item.key}>
            <div className="sidebar-item-content">
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              <span className="sidebar-grip"><GripHorizontal size={16} /></span>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-item">
          <div className="sidebar-item-content">
            <span className="sidebar-icon"><BlocksIcon size={16} /></span>
            <span className="sidebar-label">Browse extensions</span>
          </div>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-content">
            <span className="sidebar-icon"><Plus size={16} /></span>
            <span className="sidebar-label">Custom component</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function McpServersSidebar({ onAddServer, onManageServers, servers }) {
  return (
    <aside className="components-sidebar mcp-servers-sidebar">
      <div className="sidebar-search-row">
        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search"
          />
          <span className="sidebar-search-slash">/</span>
        </div>
      </div>
      <div className="sidebar-header">
        <span>MCP SERVERS</span>
        <button className="mcp-servers-settings-btn" title="Settings">
          <Settings2 size={16} />
        </button>
      </div>
      <div className="sidebar-list">
        {servers.map((server, index) => (
          <div key={index} className="mcp-server-item">
            <div className="mcp-server-item-content">
              <div className="mcp-server-item-row1">
                <span className={`status-dot ${server.status}`}></span>
                <span className="sidebar-label">{server.name}</span>
                {server.type === 'custom' && <span className="custom-badge">Custom</span>}
                {server.type === 'project' && <BlocksIcon className="project-icon" />}
                <GripHorizontal size={16} className="sidebar-grip-icon" />
              </div>
              <div className="mcp-server-item-row2">
                <span className="tools-count">{server.tools} tools</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-item" onClick={onAddServer}>
          <div className="sidebar-item-content">
            <span className="sidebar-icon"><Plus size={16} /></span>
            <span className="sidebar-label">Add MCP Server</span>
          </div>
        </div>
        <div className="sidebar-item" onClick={onManageServers}>
          <div className="sidebar-item-content">
            <span className="sidebar-icon"><ExternalLink size={16} /></span>
            <span className="sidebar-label">Manage Servers</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BlocksSidebar() {
  return (
    <aside className="components-sidebar">
      <div className="sidebar-search-row">
        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search"
          />
          <span className="sidebar-search-slash">/</span>
        </div>
      </div>
      <div className="sidebar-header">EXTENSIONS</div>
      <div className="sidebar-list">
        {/* Placeholder for extensions */}
      </div>
    </aside>
  );
}

function NotesSidebar() {
  return (
    <aside className="components-sidebar">
      <div className="sidebar-search-row">
        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search"
          />
          <span className="sidebar-search-slash">/</span>
        </div>
      </div>
      <div className="sidebar-header">ANNOTATIONS</div>
      <div className="sidebar-list">
        {annotationItems.map((item) => (
          <div className="sidebar-item" key={item.key}>
            <div className="sidebar-item-content">
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              <span className="sidebar-grip"><GripHorizontal size={16} /></span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

const agentTemplates = [
  { 
    key: 'starter-agent', 
    icon: <AgentIcon size={16} />, 
    label: 'Starter Agent',
    description: 'Basic conversational agent',
    type: 'starter'
  },
  { 
    key: 'coding-assistant', 
    icon: <Code size={16} />, 
    label: 'Coding Assistant',
    description: 'Helps with programming tasks',
    type: 'template'
  },
  { 
    key: 'research-agent', 
    icon: <Search size={16} />, 
    label: 'Research Agent',
    description: 'Gathers and analyzes information',
    type: 'template'
  },
  { 
    key: 'data-analyst', 
    icon: <Database size={16} />, 
    label: 'Data Analyst',
    description: 'Processes and visualizes data',
    type: 'template'
  },
  { 
    key: 'content-writer', 
    icon: <FileText size={16} />, 
    label: 'Content Writer',
    description: 'Creates engaging written content',
    type: 'template'
  },
  { 
    key: 'customer-support', 
    icon: <MessageSquare size={16} />, 
    label: 'Customer Support',
    description: 'Handles customer inquiries',
    type: 'template'
  }
];

function AgentSidebar() {
  return (
    <aside className="components-sidebar">
      <div className="sidebar-search-row">
        <div className="sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Search"
          />
          <span className="sidebar-search-slash">/</span>
        </div>
      </div>
      <div className="sidebar-header">AGENTS</div>
      <div className="sidebar-list">
        {agentTemplates.map((agent) => (
          <div className="sidebar-item" key={agent.key}>
            <div className="sidebar-item-content">
              <span className="sidebar-icon">{agent.icon}</span>
              <div className="agent-info">
                <span className="sidebar-label">{agent.label}</span>
                <span className="agent-description">{agent.description}</span>
              </div>
              {agent.type === 'starter' && <span className="starter-badge">Starter</span>}
              <span className="sidebar-grip"><GripHorizontal size={16} /></span>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-item">
          <div className="sidebar-item-content">
            <span className="sidebar-icon"><Plus size={16} /></span>
            <span className="sidebar-label">New Agent</span>
          </div>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-content">
            <span className="sidebar-icon"><ExternalLink size={16} /></span>
            <span className="sidebar-label">Browse Templates</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FlowCanvasControls({ onLogsToggle, isLogsOpen, onHelpToggle, isHelpMenuOpen, isSidebarOpen, showServerSidePanel, sidePanelWidth }) {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);

  const mockLogs = [
    { id: 1, timestamp: '12:34:56.789', level: 'INFO', source: 'MCP Server', message: 'Connected to Gmail MCP server successfully' },
    { id: 2, timestamp: '12:34:57.123', level: 'DEBUG', source: 'Agent', message: 'Processing user request: "Create a draft email"' },
    { id: 3, timestamp: '12:34:57.456', level: 'INFO', source: 'Tool', message: 'Executing GMAIL_CREATE_EMAIL_DRAFT with parameters' },
    { id: 4, timestamp: '12:34:57.789', level: 'SUCCESS', source: 'Tool', message: 'Email draft created successfully with ID: draft_abc123' },
    { id: 5, timestamp: '12:34:58.012', level: 'INFO', source: 'Agent', message: 'Task completed: Email draft ready for review' },
    { id: 6, timestamp: '12:34:58.345', level: 'WARN', source: 'MCP Server', message: 'Rate limit warning: 85% of quota used' },
    { id: 7, timestamp: '12:34:58.678', level: 'DEBUG', source: 'System', message: 'Memory usage: 245MB, CPU: 12%' },
    { id: 8, timestamp: '12:34:59.001', level: 'ERROR', source: 'Tool', message: 'Failed to access calendar: Authentication expired' },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return '#ef4444';
      case 'WARN': return '#f59e0b';
      case 'SUCCESS': return '#22c55e';
      case 'INFO': return '#3b82f6';
      case 'DEBUG': return '#71717a';
      default: return '#a1a1aa';
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownOpen && !event.target.closest('.flow-canvas-share-container')) {
        setShareDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [shareDropdownOpen]);

  return (
    <>
      {/* Top right controls */}
      <div className="flow-canvas-top-controls">
        <button className="flow-canvas-btn playground-btn">
          <Play size={16} />
          Playground
        </button>
        <div className="flow-canvas-share-container">
          <button 
            className="flow-canvas-btn share-btn"
            onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
          >
            <Share size={16} />
            Share
            <ChevronDown size={16} />
          </button>
          {shareDropdownOpen && (
            <div className="share-dropdown">
              <div className="share-dropdown-item">
                <span>Copy link</span>
              </div>
              <div className="share-dropdown-item">
                <span>Export</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom left controls - zoom and logs stacked */}
      <div 
        className={`flow-canvas-bottom-controls${isLogsOpen ? ' logs-open' : ''}`}
        style={{
          left: `${isSidebarOpen ? 296 : 8}px`, // 8px from sidebar edge when open, 8px from window edge when closed
          ...(isLogsOpen ? {
            right: `${showServerSidePanel ? sidePanelWidth : 8}px`
          } : {})
        }}
      >
        {/* Zoom controls group */}
        <div className="zoom-controls-block">
          <div className="zoom-control-group">
            <button className="flow-canvas-btn zoom-btn" title="Zoom">
              <ZoomIn size={16} />
            </button>
            <div className="zoom-hover-controls">
              <button className="flow-canvas-btn zoom-in-btn" title="Zoom In">
                <Plus size={16} />
              </button>
              <button className="flow-canvas-btn zoom-out-btn" title="Zoom Out">
                <Minus size={16} />
              </button>
            </div>
          </div>
          <button className="flow-canvas-btn fit-screen-btn" title="Fit to Screen">
            <Focus size={16} />
          </button>
        </div>

        {/* Logs container */}
        <div 
          className={`logs-container${isLogsOpen ? ' expanded' : ''}`}
          onClick={!isLogsOpen ? onLogsToggle : undefined}
        >
          {/* Button state (collapsed) */}
          {!isLogsOpen && (
            <div className="logs-button">
              <Terminal size={16} />
              <span>Logs</span>
            </div>
          )}
          
          {/* Panel state (expanded) */}
          {isLogsOpen && (
            <>
              <div className="logs-panel-header">
                <button className="logs-tab-button" onClick={onLogsToggle}>
                  <Terminal size={16} />
                  <span>Logs</span>
                  <span className="logs-count">({mockLogs.length})</span>
                </button>
                <div className="logs-controls">
                  <button className="logs-clear-btn">Clear</button>
                  <button className="logs-close-btn" onClick={onLogsToggle}>
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="logs-content">
                <div className="logs-table">
                  {mockLogs.map((log) => (
                    <div key={log.id} className="log-entry">
                      <span className="log-timestamp">{log.timestamp}</span>
                      <span 
                        className="log-level" 
                        style={{ color: getLevelColor(log.level) }}
                      >
                        {log.level}
                      </span>
                      <span className="log-source">{log.source}</span>
                      <span className="log-message">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom right help button */}
      <div className={`help-menu-container${isLogsOpen ? ' logs-open' : ''}`}>
        <button 
          className={`flow-canvas-help-btn${isHelpMenuOpen ? ' active' : ''}`} 
          onClick={onHelpToggle}
          title="Help"
        >
          <HelpCircle size={16} />
        </button>
        {isHelpMenuOpen && (
          <div className="help-menu">
            <div className="help-menu-item">
              <PlayCircle size={16} />
              <span>Quickstart tutorial</span>
            </div>
            <div className="help-menu-item">
              <Network size={16} />
              <span>Connection colors legend</span>
              <ArrowUpRight size={14} className="help-menu-external" />
            </div>
            <div className="help-menu-item">
              <Book size={16} />
              <span>Docs</span>
            </div>
            <div className="help-menu-item">
              <Keyboard size={16} />
              <span>Shortcuts</span>
            </div>
            <div className="help-menu-item">
              <Bug size={16} />
              <span>Report a bug</span>
            </div>
            <div className="help-menu-item">
              <Download size={16} />
              <span>Get Langflow Desktop</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}



function App() {
  const [focused, setFocused] = useState(leftNavItems[0].key);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddMcpServerDialogOpen, setIsAddMcpServerDialogOpen] = useState(false);
  const [isServerNameDialogOpen, setIsServerNameDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [showServerSidePanel, setShowServerSidePanel] = useState(false);
  const [sidePanelWidth, setSidePanelWidth] = useState(400);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [showAddToolsDialog, setShowAddToolsDialog] = useState(false);
  const [isToolModeEnabled, setIsToolModeEnabled] = useState(false);
  
  // Canvas components management
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [nextComponentId, setNextComponentId] = useState(1);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  
  // Available servers (existing + custom)
  const [availableServers, setAvailableServers] = useState([
    { 
      id: 1, 
      name: 'supabase-hybrid', 
      status: 'online', 
      tools: 10,
      authType: 'apiKey',
      description: 'Supabase database integration with hybrid authentication',
      toolList: ['create_table', 'insert_data', 'query_data', 'update_record', 'delete_record', 'create_index', 'backup_database', 'restore_database', 'manage_users', 'set_permissions']
    },
    { 
      id: 2, 
      name: 'ragbot_project', 
      status: 'online', 
      tools: 8, 
      warning: 'No auth',
      authType: 'none',
      description: 'RAG-based chatbot with document processing capabilities',
      toolList: ['index_documents', 'search_documents', 'generate_response', 'update_index', 'delete_documents', 'get_metadata', 'process_pdf', 'extract_text']
    },
    { 
      id: 3, 
      name: 'google_maps', 
      status: 'online', 
      tools: 15,
      authType: 'apiKey',
      description: 'Google Maps integration for location services and geocoding',
      toolList: ['geocode_address', 'reverse_geocode', 'get_directions', 'find_places', 'get_place_details', 'calculate_distance', 'get_elevation', 'get_timezone', 'street_view', 'static_map', 'roads_api', 'places_autocomplete', 'nearby_search', 'text_search', 'place_photos']
    },
    { 
      id: 4, 
      name: 'notion', 
      status: 'online', 
      tools: 3,
      authType: 'bearer',
      description: 'Notion workspace integration for content management',
      toolList: ['create_page', 'update_page', 'query_database']
    },
  ]);
  
  // Tab management
  const [tabs, setTabs] = useState([
    { id: 1, label: 'MCP Flow', icon: <FlowIcon size={16} color="#fff" />, type: 'flow' },
  ]);
  const [selectedTab, setSelectedTab] = useState(1);
  const [nextTabId, setNextTabId] = useState(10);

  const handleCreateMcpServer = () => {
    setIsAddMcpServerDialogOpen(false);
    setIsServerNameDialogOpen(true);
  };

  const handleServerNameBack = () => {
    setIsServerNameDialogOpen(false);
    setIsAddMcpServerDialogOpen(true);
  };

  const handleServerCreate = (serverName) => {
    const serverData = {
      id: nextTabId,
      name: serverName,
      status: 'online',
      tools: 6,
      type: 'custom',
      authType: 'none'
    };
    
    // Add server to available servers list
    setAvailableServers(prev => [...prev, serverData]);
    
    // Create a canvas component with the new server selected
    const newComponent = {
      id: nextComponentId,
      type: 'mcp-server',
      position: { x: 200, y: 150 },
      selectedServerId: serverData.id,
      props: {}
    };
    
    setCanvasComponents(prev => [...prev, newComponent]);
    
    // Show the side panel with the new server selected
    setSelectedServer(serverData);
    setShowServerSidePanel(true);
    
    setIsServerNameDialogOpen(false);
    setNextTabId(prev => prev + 1);
    setNextComponentId(prev => prev + 1);
  };

  const handleEditServer = (serverData) => {
    const newTab = {
      id: nextTabId,
      label: `Edit ${serverData.name}`,
      icon: <McpIcon size={16} color="#fff" />,
      type: 'mcp-builder',
      data: serverData
    };
    
    setTabs(prev => [...prev, newTab]);
    setSelectedTab(nextTabId);
    setNextTabId(prev => prev + 1);
    setShowServerSidePanel(false);
  };

  const handleDeleteServer = (serverData) => {
    // TODO: Implement server deletion
    console.log('Deleting server:', serverData);
    setShowServerSidePanel(false);
  };

  const handleCloseSidePanel = () => {
    setShowServerSidePanel(false);
    setSelectedServer(null);
  };

  const handleLogsToggle = () => {
    setIsLogsOpen(!isLogsOpen);
  };

  const handleHelpToggle = () => {
    setIsHelpMenuOpen(!isHelpMenuOpen);
  };

  // Close help menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (isHelpMenuOpen && !event.target.closest('.help-menu-container')) {
        setIsHelpMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHelpMenuOpen]);

  const handleOpenAddTools = () => {
    setShowAddToolsDialog(true);
  };

  const handleCloseAddTools = () => {
    setShowAddToolsDialog(false);
  };

  const handleSaveTools = (selectedTools, toolConfig) => {
    console.log('Tools saved:', { selectedTools, toolConfig });
    // TODO: Implement tool saving logic
    setShowAddToolsDialog(false);
  };

  const handleCloseTab = (tabId) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      
      // If we're closing the selected tab, select another tab
      if (selectedTab === tabId && newTabs.length > 0) {
        setSelectedTab(newTabs[0].id);
      }
      
      return newTabs;
    });
  };

  const handleSaveMcpServer = (serverData) => {
    // TODO: Implement saving MCP server
    console.log('Saving MCP server:', serverData);
    
    // For now, just close the tab
    handleCloseTab(selectedTab);
  };

  const handleCloseMcpBuilder = () => {
    handleCloseTab(selectedTab);
  };

  // Canvas component handlers
  const handleComponentServerChange = (componentId, serverId) => {
    setCanvasComponents(prev =>
      prev.map(comp =>
        comp.id === componentId
          ? { ...comp, selectedServerId: serverId }
          : comp
      )
    );
  };

  const handleComponentRemove = (componentId) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== componentId));
  };

  const handleComponentPositionChange = (componentId, position) => {
    setCanvasComponents(prev =>
      prev.map(comp =>
        comp.id === componentId
          ? { ...comp, position }
          : comp
      )
    );
  };

  const handleComponentSelect = (componentId) => {
    setSelectedComponentId(componentId);
  };

  const handleCanvasClick = (e) => {
    // Deselect component when clicking on empty canvas
    if (e.target === e.currentTarget) {
      setSelectedComponentId(null);
    }
  };

  // Contextual toolbar handlers
  const handleToolbarEditServer = () => {
    const selectedComponent = canvasComponents.find(comp => comp.id === selectedComponentId);
    if (selectedComponent) {
      const serverData = availableServers.find(server => server.id === selectedComponent.selectedServerId);
      if (serverData) {
        setSelectedServer(serverData);
        setShowServerSidePanel(true);
      }
    }
  };

  const handleToolbarCode = () => {
    console.log('Code action triggered');
    // TODO: Implement code view/edit functionality
  };

  const handleToolbarControls = () => {
    console.log('Controls action triggered');
    // TODO: Implement controls functionality
  };

  const handleToolbarMore = () => {
    console.log('More actions triggered');
    // TODO: Implement more actions menu
  };

  const handleToolbarToolMode = () => {
    setIsToolModeEnabled(!isToolModeEnabled);
  };

  const handleManageServers = () => {
    const newTab = {
      id: nextTabId,
      label: 'Manage Servers',
      icon: <Settings2 size={16} color="#fff" />,
      type: 'server-management'
    };
    
    setTabs(prev => [...prev, newTab]);
    setSelectedTab(nextTabId);
    setNextTabId(prev => prev + 1);
  };

  const handleServerManagementSelect = (serverData) => {
    setSelectedServer(serverData);
    setShowServerSidePanel(true);
  };

  const sidebarComponents = {
    agent: <AgentSidebar />,
    component: <ComponentsSidebar />,
    mcp: <McpServersSidebar onAddServer={() => setIsAddMcpServerDialogOpen(true)} onManageServers={handleManageServers} servers={availableServers} />,
    extensions: <BlocksSidebar />,
    annotations: <NotesSidebar />,
  };

  const renderMainContent = () => {
    const currentTab = tabs.find(tab => tab.id === selectedTab);
    
    if (!currentTab) {
      return (
        <main 
          className={`main-content${showServerSidePanel ? ' side-panel-open' : ''}`}
          style={{ marginRight: showServerSidePanel ? `${sidePanelWidth}px` : '0' }}
        >
          {/* No tab selected */}
        </main>
      );
    }

    if (currentTab.type === 'mcp-builder') {
      return (
        <McpServerBuilder
          onClose={handleCloseMcpBuilder}
          onSave={handleSaveMcpServer}
          initialData={currentTab.data}
        />
      );
    }



    return (
      <main 
        className={`main-content${showServerSidePanel ? ' side-panel-open' : ''}`} 
        style={{ marginRight: showServerSidePanel ? `${sidePanelWidth}px` : '0' }}
        onClick={handleCanvasClick}
      >
        <FlowCanvasControls 
          onLogsToggle={handleLogsToggle}
          isLogsOpen={isLogsOpen}
          onHelpToggle={handleHelpToggle}
          isHelpMenuOpen={isHelpMenuOpen}
          isSidebarOpen={isSidebarOpen}
          showServerSidePanel={showServerSidePanel}
          sidePanelWidth={sidePanelWidth}
        />
        {/* Canvas components */}
        {canvasComponents.map((component) => {
          if (component.type === 'mcp-server') {
            return (
              <McpServerComponent
                key={component.id}
                position={component.position}
                selectedServerId={component.selectedServerId}
                servers={availableServers}
                isSelected={selectedComponentId === component.id}
                onServerChange={(serverId) => handleComponentServerChange(component.id, serverId)}
                onRemove={() => handleComponentRemove(component.id)}
                onPositionChange={(position) => handleComponentPositionChange(component.id, position)}
                onSelect={() => handleComponentSelect(component.id)}
                onEditServer={handleToolbarEditServer}
              />
            );
          }
          return null;
        })}
        
        {/* Contextual toolbar */}
        {selectedComponentId && (
          <ContextualToolbar
            position={canvasComponents.find(comp => comp.id === selectedComponentId)?.position || { x: 0, y: 0 }}
            onToolMode={handleToolbarToolMode}
            isToolModeEnabled={isToolModeEnabled}
            onCode={handleToolbarCode}
            onControls={handleToolbarControls}
            onMore={handleToolbarMore}
          />
        )}
      </main>
    );
  };

  const renderSidebar = () => {
    return (
      <div className={`sidebar-container${!isSidebarOpen ? ' collapsed' : ''}`}>
        {sidebarComponents[focused]}
      </div>
    );
  };

  const currentTab = tabs.find(tab => tab.id === selectedTab);
  
  // Render MCP builder with sidebar
  if (currentTab && currentTab.type === 'mcp-builder') {
    return (
      <div className="app-prototype">
        {isAddMcpServerDialogOpen && (
          <AddMcpServerDialog 
            onClose={() => setIsAddMcpServerDialogOpen(false)}
            onCreateCustomServer={handleCreateMcpServer}
          />
        )}
        {isServerNameDialogOpen && (
          <ServerNameDialog 
            onClose={() => setIsServerNameDialogOpen(false)}
            onCreate={handleServerCreate}
            onBack={handleServerNameBack}
          />
        )}
        {showServerSidePanel && selectedServer && (
          <McpServerSidePanel 
            serverData={selectedServer}
            onClose={handleCloseSidePanel}
            onEdit={handleEditServer}
            onDelete={handleDeleteServer}
            onWidthChange={setSidePanelWidth}
            onOpenAddTools={handleOpenAddTools}
          />
        )}
        <TopNav 
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onCloseTab={handleCloseTab}
        />
        <div className={`main-layout${!isSidebarOpen ? ' sidebar-collapsed' : ''}`}>
          <LeftNav
            focused={focused}
            setFocused={setFocused}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className={`sidebar-container${!isSidebarOpen ? ' collapsed' : ''}`}>
            <McpServersSidebar onAddServer={() => setIsAddMcpServerDialogOpen(true)} onManageServers={handleManageServers} servers={availableServers} />
          </div>
          <McpServerBuilder
            onClose={handleCloseMcpBuilder}
            onSave={handleSaveMcpServer}
            initialData={currentTab.data}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    );
  }

  // Render Server Management with sidebar
  if (currentTab && currentTab.type === 'server-management') {
    return (
      <div className="app-prototype">
        {isAddMcpServerDialogOpen && (
          <AddMcpServerDialog 
            onClose={() => setIsAddMcpServerDialogOpen(false)}
            onCreateCustomServer={handleCreateMcpServer}
          />
        )}
        {isServerNameDialogOpen && (
          <ServerNameDialog 
            onClose={() => setIsServerNameDialogOpen(false)}
            onCreate={handleServerCreate}
            onBack={handleServerNameBack}
          />
        )}
        {showServerSidePanel && selectedServer && (
          <McpServerSidePanel 
            serverData={selectedServer}
            onClose={handleCloseSidePanel}
            onEdit={handleEditServer}
            onDelete={handleDeleteServer}
            onWidthChange={setSidePanelWidth}
            onOpenAddTools={handleOpenAddTools}
          />
        )}
        <TopNav 
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onCloseTab={handleCloseTab}
        />
        <div className={`main-layout${!isSidebarOpen ? ' sidebar-collapsed' : ''}`}>
          <LeftNav
            focused={focused}
            setFocused={setFocused}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className={`sidebar-container${!isSidebarOpen ? ' collapsed' : ''}`}>
            <ProjectSidebar />
          </div>
          <ServerManagement
            servers={availableServers}
            onAddServer={() => setIsAddMcpServerDialogOpen(true)}
            onServerSelect={handleServerManagementSelect}
            selectedServerId={selectedServer?.id}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    );
  }

  // Render normal layout for other tab types
  return (
    <div className="app-prototype">
      {isAddMcpServerDialogOpen && (
        <AddMcpServerDialog 
          onClose={() => setIsAddMcpServerDialogOpen(false)}
          onCreateCustomServer={handleCreateMcpServer}
        />
      )}
      {isServerNameDialogOpen && (
        <ServerNameDialog 
          onClose={() => setIsServerNameDialogOpen(false)}
          onCreate={handleServerCreate}
          onBack={handleServerNameBack}
        />
      )}
      {showServerSidePanel && selectedServer && (
        <McpServerSidePanel 
          serverData={selectedServer}
          onClose={handleCloseSidePanel}
          onEdit={handleEditServer}
          onDelete={handleDeleteServer}
          onOpenAddTools={handleOpenAddTools}
        />
      )}
      <TopNav 
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onCloseTab={handleCloseTab}
      />
      <div className={`main-layout${!isSidebarOpen ? ' sidebar-collapsed' : ''}`}>
        <LeftNav
          focused={focused}
          setFocused={setFocused}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {renderSidebar()}
        {renderMainContent()}
      </div>

      {showAddToolsDialog && (
        <AddToolsDialog 
          onClose={handleCloseAddTools}
          onSave={handleSaveTools}
        />
      )}
    </div>
  );
}

export default App;
