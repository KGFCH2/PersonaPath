# Use official lightweight Python image
FROM python:3.11-slim

# Set environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y --no-install-recommends build-essential gcc && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy app
COPY . /app

# Expose port (Vercel will ignore this but useful locally)
EXPOSE 5000

# Use gunicorn to serve the Flask app
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000", "--workers", "2"]
