# AuraAudit

Autonomous coding audit framework with AI-powered code analysis and quality assurance.

## Overview

AuraAudit is a comprehensive code auditing platform that combines automated analysis with AI-powered insights to help developers maintain high code quality standards. It features both a Python backend for deep code analysis and a modern Electron-based UI for an intuitive user experience.

## Features

### 🔍 **Code Analysis**
- Multi-language support (Python, JavaScript, TypeScript, React, Next.js)
- Automated bug detection and vulnerability scanning
- Code quality metrics and technical debt analysis
- Duplicate code detection and refactoring suggestions

### 🤖 **AI-Powered Insights**
- Integration with Claude AI for intelligent code review
- Automated fix suggestions and best practice recommendations
- Context-aware analysis based on project structure
- Learning from project-specific patterns

### 🎯 **Quality Assurance**
- Comprehensive test suite with pytest (backend) and Vitest (frontend)
- Accessibility compliance checking (WCAG 2.1 AA)
- Security vulnerability scanning
- Performance optimization recommendations

### 🛠️ **Developer Tools**
- Modern Electron-based user interface
- Terminal integration with XTerm.js
- Real-time file system monitoring
- Configurable audit rules and standards

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Python** >= 3.8.0
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MelroseSaint/AuraAudit.git
   cd AuraAudit
   ```

2. **Install dependencies**
   ```bash
   # Install Node.js dependencies
   npm install
   
   # Install Python dependencies
   cd Auto-Claude
   pip install -r auto-claude/requirements.txt
   cd ..
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run Python backend tests
npm run test:ui      # Run frontend tests

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

## Project Structure

```
AuraAudit/
├── Auto-Claude/                 # Python backend
│   ├── auto-claude/            # Core analysis engine
│   ├── tests/                  # Backend test suite
│   └── auto-claude-ui/         # Electron UI
├── comprehensive-audit-report.md # Detailed audit findings
├── package.json                # Root package configuration
├── README.md                   # This file
└── .env                       # Environment variables
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# AI Service Configuration
CLAUDE_API_KEY=your_claude_api_key
OPENAI_API_KEY=your_openai_api_key

# Development Settings
NODE_ENV=development
DEBUG=true

# Audit Configuration
AUDIT_STRICT_MODE=true
ACCESSIBILITY_CHECK=true
SECURITY_SCAN=true
```

### Audit Rules

Configure audit rules in `Auto-Claude/auto-claude/config/audit-rules.json`:

```json
{
  "security": {
    "enabled": true,
    "severity": "high"
  },
  "performance": {
    "enabled": true,
    "thresholds": {
      "bundleSize": "5MB",
      "loadTime": "3s"
    }
  },
  "accessibility": {
    "enabled": true,
    "standard": "WCAG21AA"
  }
}
```

## Usage

### Running Audits

1. **Initialize a new audit**
   ```bash
   npm run audit:init ./path/to/project
   ```

2. **Run comprehensive analysis**
   ```bash
   npm run audit:full
   ```

3. **Run specific checks**
   ```bash
   npm run audit:security
   npm run audit:performance
   npm run audit:accessibility
   ```

### Viewing Results

- **Web Interface**: Open `http://localhost:3000` for interactive dashboard
- **CLI Reports**: View detailed reports in terminal
- **Export**: Generate PDF/HTML reports with `npm run audit:export`

## Development

### Backend Development

```bash
cd Auto-Claude
python -m auto-claude.main
```

### Frontend Development

```bash
cd Auto-Claude/auto-claude-ui
npm run dev
```

### Testing

```bash
# Backend tests
npm test

# Frontend tests
npm run test:ui

# E2E tests
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **Python**: Follow PEP 8, use Black for formatting
- **TypeScript/JavaScript**: Use ESLint and Prettier
- **Commits**: Follow Conventional Commits specification
- **Tests**: Maintain >80% code coverage

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](Auto-Claude/agpl-3.0.txt) file for details.

## Support

- **Documentation**: See [Auto-Claude/docs/](Auto-Claude/docs/) for detailed documentation
- **Issues**: Report bugs via [GitHub Issues](https://github.com/MelroseSaint/AuraAudit/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/MelroseSaint/AuraAudit/discussions)

## Changelog

See [CHANGELOG.md](Auto-Claude/CHANGELOG.md) for version history and updates.

---

**Built with ❤️ by the AuraAudit team**
