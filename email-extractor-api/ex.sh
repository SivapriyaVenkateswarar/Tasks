#!/bin/bash

# File containing the email
EMAIL_FILE="em.txt"

# Check if the file exists
if [ ! -f "$EMAIL_FILE" ]; then
  echo "Error: $EMAIL_FILE not found."
  exit 1
fi

# Read and escape email content for JSON
EMAIL_CONTENT=$(<"$EMAIL_FILE")
EMAIL_JSON=$(printf '%s' "$EMAIL_CONTENT" | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

# API endpoint
URL="http://localhost:3000/extract-email-details"

# Send POST request and capture both response and HTTP code
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"gemini\",\"prompt\":\"$EMAIL_JSON\"}")

# Separate JSON and HTTP code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

# Output HTTP code and result
echo "HTTP Status: $HTTP_CODE"
echo "Response:"
echo "$HTTP_BODY" | jq . 2>/dev/null || echo "$HTTP_BODY"
