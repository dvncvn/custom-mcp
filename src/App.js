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
} from 'lucide-react';
import { McpIcon, AgentIcon, ComponentsIcon, BlocksIcon, NotesIcon, FlowIcon, ExtensionsIcon, AnnotationsIcon } from './icons';
import AddMcpServerDialog from './AddMcpServerDialog';
import McpServerBuilder from './McpServerBuilder';
import ServerNameDialog from './ServerNameDialog';
import McpServerSidePanel from './McpServerSidePanel';
import McpServerComponent from './McpServerComponent';
import ContextualToolbar from './ContextualToolbar';

const leftNavItems = [
  { key: 'agent', icon: <AgentIcon size={20} />, label: 'Agent' },
  { key: 'component', icon: <ComponentsIcon size={20} />, label: 'Component' },
  { key: 'mcp', icon: <McpIcon size={20} />, label: 'MCP' },
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
        <button
          key={item.key}
          className={`left-nav-btn${isSidebarOpen && focused === item.key ? ' focused' : ''}`}
          onClick={() => handleClick(item.key)}
          title={item.label}
        >
          {React.cloneElement(item.icon, {
            color: isSidebarOpen && focused === item.key ? '#fff' : '#A1A1AA'
          })}
        </button>
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

function McpServersSidebar({ onAddServer, servers }) {
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
        <div className="sidebar-item">
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
        {/* Placeholder for annotations */}
      </div>
    </aside>
  );
}

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
      <div className="sidebar-header">AGENT</div>
      <div className="sidebar-list">
        {/* Placeholder for agent content */}
      </div>
    </aside>
  );
}

function FlowCanvasControls() {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);

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

      {/* Bottom left controls */}
      <div className="flow-canvas-bottom-controls">
        <button className="flow-canvas-btn logs-btn">
          <FileText size={16} />
          Logs
        </button>
      </div>

      {/* Bottom right help button */}
      <button className="flow-canvas-help-btn" title="Help">
        <HelpCircle size={16} />
      </button>
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
  
  // Canvas components management
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [nextComponentId, setNextComponentId] = useState(1);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  
  // Available servers (existing + custom)
  const [availableServers, setAvailableServers] = useState([
    { id: 1, name: 'supabase-mcp', status: 'online', tools: 17 },
    { id: 2, name: 'google-maps', status: 'online', tools: 8 },
    { id: 3, name: 'mem0-memory-mcp', status: 'online', tools: 8 },
    { id: 4, name: 'exa', status: 'online', tools: 8 },
    { id: 5, name: 'echo-mcp', status: 'offline', tools: 3 },
    { id: 6, name: 'github', status: 'online', tools: 18 },
    { id: 7, name: 'my-server', status: 'online', tools: 4, type: 'custom' },
    { id: 8, name: 'custom-server', status: 'online', tools: 7, type: 'custom' },
    { id: 9, name: 'my-project', status: 'online', tools: 32, type: 'project' },
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

  const sidebarComponents = {
    agent: <AgentSidebar />,
    component: <ComponentsSidebar />,
    mcp: <McpServersSidebar onAddServer={() => setIsAddMcpServerDialogOpen(true)} servers={availableServers} />,
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
        <FlowCanvasControls />
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
              />
            );
          }
          return null;
        })}
        
        {/* Contextual toolbar */}
        {selectedComponentId && (
          <ContextualToolbar
            position={canvasComponents.find(comp => comp.id === selectedComponentId)?.position || { x: 0, y: 0 }}
            onEditServer={handleToolbarEditServer}
            onCode={handleToolbarCode}
            onControls={handleToolbarControls}
            onMore={handleToolbarMore}
          />
        )}
      </main>
    );
  };

  const renderSidebar = () => {
    const currentTab = tabs.find(tab => tab.id === selectedTab);
    
    if (currentTab && currentTab.type === 'mcp-builder') {
      return (
        <div className="sidebar-container">
          <McpServersSidebar onAddServer={() => setIsAddMcpServerDialogOpen(true)} servers={availableServers} />
        </div>
      );
    }

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
          />
        )}
        {showServerSidePanel && selectedServer && (
          <McpServerSidePanel 
            serverData={selectedServer}
            onClose={handleCloseSidePanel}
            onEdit={handleEditServer}
            onDelete={handleDeleteServer}
            onWidthChange={setSidePanelWidth}
          />
        )}
        <TopNav 
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onCloseTab={handleCloseTab}
        />
        <div className="mcp-builder-layout">
          <div className="sidebar-container">
            <McpServersSidebar onAddServer={() => setIsAddMcpServerDialogOpen(true)} servers={availableServers} />
          </div>
          <McpServerBuilder
            onClose={handleCloseMcpBuilder}
            onSave={handleSaveMcpServer}
            initialData={currentTab.data}
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
        />
      )}
      {showServerSidePanel && selectedServer && (
        <McpServerSidePanel 
          serverData={selectedServer}
          onClose={handleCloseSidePanel}
          onEdit={handleEditServer}
          onDelete={handleDeleteServer}
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
    </div>
  );
}

export default App;
