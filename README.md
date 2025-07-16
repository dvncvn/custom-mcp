# MCP Server Builder

A visual tool for creating and managing Model Context Protocol (MCP) servers with an intuitive drag-and-drop interface.

## Features

- **Visual Server Creation**: Build MCP servers using a drag-and-drop interface
- **Real-time Preview**: See your server configuration as you build
- **Multiple Authentication Methods**: Support for API keys, OAuth, and custom authentication
- **Tool Management**: Add, configure, and organize server tools
- **Server Templates**: Quick start with pre-built server templates
- **Live Testing**: Test your servers directly in the builder
- **Export & Deploy**: Generate server code and deployment configurations

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dvncvn/custom-mcp.git
cd custom-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Create a New Server**: Click "Create Custom MCP Server" to start building
2. **Configure Settings**: Set your server name, authentication method, and basic configuration
3. **Add Tools**: Use the visual interface to add and configure tools for your server
4. **Test & Preview**: Use the integrated testing tools to verify your server functionality
5. **Export**: Generate the server code and deployment files

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Create React App](https://create-react-app.dev/) - Build tooling

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Connect your GitHub repository to Vercel
2. Configure the build settings (automatically detected)
3. Deploy with a single click

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About MCP

The Model Context Protocol (MCP) is an open standard that enables seamless integration between AI assistants and external data sources and tools. Learn more at [modelcontextprotocol.io](https://modelcontextprotocol.io). 