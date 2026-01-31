#!/bin/bash

# Import the database with search-replace from production
echo "Importing database..."
wp db import "$DB_IMPORT_FILE" --allow-root
wp search-replace "$REPLACE_STRING" "$SEARCH_STRING" --allow-root
echo "Database imported and search-replace completed"
