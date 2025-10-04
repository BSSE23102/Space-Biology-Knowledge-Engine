# Space Biology Knowledge Engine

A comprehensive knowledge engine for exploring and analyzing space biology research publications.

## Project Overview

The Space Biology Knowledge Engine is designed to help researchers, students, and enthusiasts explore the vast landscape of space biology research. It provides powerful search capabilities, topic modeling, and visualization tools to understand research trends and find relevant publications.

## Features

### 🔍 **Intelligent Search**

- Keyword-based search across titles and abstracts
- Semantic similarity search using embeddings
- Topic-based article filtering
- Advanced filtering by publication date, journal, and authors

### 📊 **Analytics & Visualization**

- Topic modeling using LDA (Latent Dirichlet Allocation)
- Research trend analysis over time
- Word clouds and frequency analysis
- Interactive visualizations of research clusters

### 🚀 **Modern Architecture**

- FastAPI backend with async support
- SQLite database for efficient storage
- RESTful API with comprehensive documentation
- Modular design for easy extension

## Project Structure

```
SpaceBio-KnowledgeEngine/
│
├── Backend/                          # Python Backend (FastAPI)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # API entry point
│   │   ├── models/                   # Data models / schemas
│   │   │   └── article.py
│   │   ├── routes/                   # API endpoints
│   │   │   └── articles.py
│   │   ├── services/                 # Business logic
│   │   │   └── article_service.py
│   │   ├── database/                 # DB connection
│   │   │   └── db.py
│   │   ├── utils/                    # Helpers (scrapers, preprocessors)
│   │   │   ├── text_cleaner.py
│   │   │   └── nlp_utils.py
│   │   └── config.py
│   ├── requirements.txt              # Python dependencies
│   └── tests/
│       └── test_articles.py
│
├── Research/                         # Jupyter/Colab Notebooks
│   ├── 01_data_exploration.ipynb     # Load & clean CSV
│   ├── 02_text_preprocessing.ipynb   # Tokenization, stopwords, stemming
│   ├── 03_topic_modeling.ipynb       # LDA, clustering
│   ├── 04_embeddings.ipynb           # BERT/SciBERT embeddings
│   ├── 05_similarity_search.ipynb    # Vector similarity (FAISS)
│   ├── 06_visualizations.ipynb       # t-SNE, word clouds, topic trends
│   └── datasets/
│       └── SB_publication_PMC.csv
│
├── Frontend/                         # Angular Frontend (User Implementation)
│   └── (To be implemented by Ahmad)
│
└── README.md
```

## Quick Start

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Space-Biology-Knowledge-Engine
   ```

2. **Set up Python environment**

   ```bash
   cd Backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run the API server**

   ```bash
   python -m app.main
   ```

   The API will be available at `http://localhost:8000`

   - API Documentation: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

### Research Notebooks

1. **Set up Jupyter environment**

   ```bash
   cd Research
   pip install jupyter notebook
   ```

2. **Run notebooks in sequence**

   ```bash
   jupyter notebook
   ```

   Execute notebooks in order:

   - `01_data_exploration.ipynb`
   - `02_text_preprocessing.ipynb`
   - `03_topic_modeling.ipynb`
   - `04_embeddings.ipynb`
   - `05_similarity_search.ipynb`
   - `06_visualizations.ipynb`

## API Endpoints

### Articles

- `GET /api/v1/articles` - List all articles
- `GET /api/v1/articles/{id}` - Get specific article
- `POST /api/v1/articles` - Create new article
- `PUT /api/v1/articles/{id}` - Update article
- `DELETE /api/v1/articles/{id}` - Delete article

### Search

- `GET /api/v1/articles/search?q={query}` - Search articles
- `GET /api/v1/articles/similarity/{id}` - Find similar articles
- `GET /api/v1/articles/topic/{topic_id}` - Get articles by topic
- `GET /api/v1/articles/stats` - Get article statistics

## Data Processing Pipeline

1. **Data Exploration** - Analyze dataset structure and quality
2. **Text Preprocessing** - Clean, tokenize, and normalize text
3. **Topic Modeling** - Identify research themes using LDA
4. **Embeddings** - Generate semantic embeddings for similarity search
5. **Similarity Search** - Implement fast vector search with FAISS
6. **Visualizations** - Create comprehensive visualizations

## Technologies Used

### Backend

- **FastAPI** - Modern, fast web framework
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **NLTK** - Natural language processing
- **scikit-learn** - Machine learning utilities
- **NumPy/Pandas** - Data processing

### Research

- **Jupyter Notebooks** - Interactive analysis
- **Matplotlib/Seaborn** - Visualization
- **WordCloud** - Text visualization
- **FAISS** - Vector similarity search (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- PubMed Central (PMC) for providing the research dataset
- The space biology research community
- Open source libraries and tools used in this project

## Support

For questions, issues, or contributions, please:

- Open an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` directory

---

**Note**: The frontend implementation is left for the user to complete as requested. The backend API is fully functional and ready for frontend integration.
