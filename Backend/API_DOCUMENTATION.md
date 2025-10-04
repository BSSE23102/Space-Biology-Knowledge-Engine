# Space Biology Knowledge Engine - API Documentation

## Overview

The Space Biology Knowledge Engine API provides comprehensive endpoints for data exploration, text preprocessing, and article management. The API is built with FastAPI and provides automatic interactive documentation.

## Base URL

```
http://localhost:8000
```

## API Documentation

- **Interactive Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Authentication

Currently, the API does not require authentication. In production, implement proper authentication mechanisms.

## API Endpoints

### 1. Data Exploration Endpoints (`/api/v1/data/`)

#### Get Dataset Overview

```http
GET /api/v1/data/overview?file_path=optional_path
```

Returns basic dataset information including shape, columns, and data types.

#### Analyze Data Quality

```http
GET /api/v1/data/quality?file_path=optional_path
```

Analyzes data completeness, missing values, and column statistics.

#### Analyze Text Content

```http
GET /api/v1/data/text-analysis?file_path=optional_path
```

Analyzes text columns including length statistics and word counts.

#### Analyze Publication Trends

```http
GET /api/v1/data/publication-trends?file_path=optional_path
```

Analyzes publication trends over time if date information is available.

#### Analyze Journal Distribution

```http
GET /api/v1/data/journal-distribution?file_path=optional_path
```

Analyzes journal distribution and top publishing journals.

#### Analyze Author Distribution

```http
GET /api/v1/data/author-distribution?file_path=optional_path
```

Analyzes author distribution and top authors.

#### Get Comprehensive Analysis

```http
GET /api/v1/data/comprehensive-analysis?file_path=optional_path
```

Returns all analysis results in a single response.

#### Get Sample Data

```http
GET /api/v1/data/sample?n=5&file_path=optional_path
```

Returns sample records from the dataset.

#### Upload Dataset

```http
POST /api/v1/data/upload
Content-Type: multipart/form-data

file: CSV file
```

Upload and analyze a CSV dataset.

#### Export Cleaned Dataset

```http
POST /api/v1/data/export-cleaned?file_path=optional_path&output_path=optional_path
```

Export a cleaned version of the dataset.

#### Get Dataset Columns

```http
GET /api/v1/data/columns?file_path=optional_path
```

Get detailed information about dataset columns.

### 2. Text Preprocessing Endpoints (`/api/v1/preprocessing/`)

#### Process Dataset

```http
POST /api/v1/preprocessing/process-dataset?file_path=optional_path
```

Process dataset for text preprocessing including cleaning, tokenization, and stemming.

#### Perform Topic Modeling

```http
POST /api/v1/preprocessing/topic-modeling?n_topics=5&file_path=optional_path
```

Perform LDA topic modeling on processed text.

#### Get Vocabulary Analysis

```http
GET /api/v1/preprocessing/vocabulary?file_path=optional_path
```

Get vocabulary analysis including word frequencies.

#### Get Preprocessing Summary

```http
GET /api/v1/preprocessing/summary?file_path=optional_path
```

Get summary of preprocessing results.

#### Clean Text

```http
POST /api/v1/preprocessing/clean-text
Content-Type: application/json

{
  "text": "Text to clean"
}
```

Clean and process a single text string.

#### Create TF-IDF Matrix

```http
GET /api/v1/preprocessing/tfidf-matrix?max_features=1000&file_path=optional_path
```

Create TF-IDF matrix for topic modeling.

#### Get Topics

```http
GET /api/v1/preprocessing/topics?file_path=optional_path
```

Get topic modeling results and distribution.

#### Get Word Frequency

```http
GET /api/v1/preprocessing/word-frequency?top_n=50&file_path=optional_path
```

Get word frequency analysis.

### 3. Article Management Endpoints (`/api/v1/articles/`)

#### List Articles

```http
GET /api/v1/articles?limit=10&offset=0
```

Get paginated list of articles.

#### Get Article by ID

```http
GET /api/v1/articles/{article_id}
```

Get specific article by ID.

#### Create Article

```http
POST /api/v1/articles
Content-Type: application/json

{
  "title": "Article Title",
  "authors": ["Author 1", "Author 2"],
  "abstract": "Article abstract...",
  "journal": "Journal Name",
  "keywords": ["keyword1", "keyword2"]
}
```

Create a new article.

#### Update Article

```http
PUT /api/v1/articles/{article_id}
Content-Type: application/json

{
  "title": "Updated Title",
  "abstract": "Updated abstract..."
}
```

Update an existing article.

#### Delete Article

```http
DELETE /api/v1/articles/{article_id}
```

Delete an article.

#### Search Articles

```http
GET /api/v1/articles/search?q=search_query&limit=10&similarity_threshold=0.7
```

Search articles by keyword with optional semantic similarity.

#### Get Similar Articles

```http
GET /api/v1/articles/similarity/{article_id}?limit=5&threshold=0.7
```

Find articles similar to a given article.

#### Get Articles by Topic

```http
GET /api/v1/articles/topic/{topic_id}?limit=10
```

Get articles belonging to a specific topic.

#### Get Article Statistics

```http
GET /api/v1/articles/stats
```

Get comprehensive article statistics.

## Response Formats

### Success Response

```json
{
  "data": {...},
  "message": "Success message",
  "timestamp": "2023-12-01T10:00:00Z"
}
```

### Error Response

```json
{
  "detail": "Error message",
  "status_code": 400
}
```

## Data Processing Pipeline

### 1. Data Exploration

1. Load CSV dataset
2. Analyze data quality and completeness
3. Identify text columns and patterns
4. Generate comprehensive analysis report

### 2. Text Preprocessing

1. Clean text (remove HTML, URLs, special characters)
2. Tokenize text into words
3. Remove stop words
4. Apply stemming and lemmatization
5. Create processed dataset

### 3. Topic Modeling

1. Create TF-IDF matrix
2. Apply LDA topic modeling
3. Assign topics to documents
4. Generate topic analysis

### 4. Similarity Search

1. Generate text embeddings
2. Create similarity matrix
3. Implement fast search algorithms
4. Return ranked results

## Usage Examples

### Python Client Example

```python
import requests

# Get dataset overview
response = requests.get("http://localhost:8000/api/v1/data/overview")
overview = response.json()

# Process dataset
response = requests.post("http://localhost:8000/api/v1/preprocessing/process-dataset")
results = response.json()

# Search articles
response = requests.get("http://localhost:8000/api/v1/articles/search?q=microgravity")
articles = response.json()
```

### cURL Examples

```bash
# Get comprehensive analysis
curl -X GET "http://localhost:8000/api/v1/data/comprehensive-analysis"

# Process dataset
curl -X POST "http://localhost:8000/api/v1/preprocessing/process-dataset"

# Search articles
curl -X GET "http://localhost:8000/api/v1/articles/search?q=space%20biology"
```

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

## Rate Limiting

Currently, no rate limiting is implemented. In production, implement appropriate rate limiting.

## CORS

CORS is enabled for all origins. Configure appropriately for production use.

## File Uploads

- Maximum file size: 100MB
- Supported formats: CSV only
- Files are processed temporarily and cleaned up automatically

## Data Storage

- Processed datasets are saved to the `data/` directory
- TF-IDF matrices and models are saved as pickle files
- Database files are stored as SQLite databases

## Performance Considerations

- Large datasets are processed in chunks
- TF-IDF matrices are cached for reuse
- Background tasks are used for long-running operations
- Async processing is used where possible

## Security Notes

- Input validation is performed on all endpoints
- File uploads are validated for type and size
- SQL injection protection is implemented
- XSS protection is in place

## Monitoring and Logging

- All API calls are logged
- Error tracking is implemented
- Performance metrics are collected
- Health check endpoint available at `/health`
