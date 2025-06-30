# <img src="https://github.com/Sahil7475/productive-ai/blob/pa-readme/public/productiveai-logo.png" alt="Productive AI Logo" width="30" height="30"> Productive AI

**An AI-powered product that compares your project with open source repositories and delivers feature-based insights, similarity scores, gaps, and smart competitive analysis to level up your product.**

Productive AI delivers AI-generated insights from GitHub repos so you can improve your project and make data-driven decisions instantly.

## Features

- **Smart Repository Comparison**: Compares your project to all GitHub repositories using feature-based semantic analysis
- **Comprehensive Analysis**: Provides similarity scores, overlapping features, missing features, and extra features
- **Competitive Intelligence**: Generates intelligent competitive analysis summaries
- **Repository Status Check**: Shows status (active/archived) of compared repositories

## Prerequisites

- **Node.js** 18.0.0+
- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Cohere AI SDK**
- Personal Access Token for:
  - GitHub REST and GraphQL APIs
- API key for:
  - Cohere AI

## Quick Start

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/extinctsion/productiveai.git
cd productiveai
```

2. **Install dependencies**
```bash
npm install
```

### Configuration

Create a `.env.local` file with the following variables and insert your github Token and cohere-ai API key:

```env
GITHUB_TOKEN=your_github_token
COHERE_API_KEY=your_cohere_api_key
```

### Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## API Usage

This project interacts with the GitHub API using both **GraphQL** and **REST** endpoints.

### Endpoints

#### GitHub GraphQL API
```http
POST https://api.github.com/graphql
```
#### GitHub REST API – Code Search in Repository 
```http
GET https://api.github.com/search/code
```
#### Base GitHub REST API
```http
GET https://api.github.com
```

## Development

### Project Structure
```
productiveai/
├── app/
│   ├── api/           # API route handlers
│   ├── compare/[id]   # Dynamic route for comparing product by ID
├── components/        # Component files and folder
├── hooks/             # hooks files
├── lib/               # Utility functions, API clients, or configurations
├── public/            # Static files like images, favicons, logos
└── README.md          # Project overview
```

### Running Tests
```bash
# Tests coming soon
```

## Contributions

We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Submit a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](https://github.com/extinctsion/productiveai/blob/main/LICENSE) file for details.

## Acknowledgments

- Cohere AI for powerful language models
- GitHub for providing comprehensive repository data
- All contributors who help improve this project

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
- **Email**: info.productiveai@gmail.com

---

**Turning open-source code into insights — built to help you compare and improve your product, with ❤️ by Productive AI.**

