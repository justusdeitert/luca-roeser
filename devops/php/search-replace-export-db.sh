#!/bin/bash

# Export the database with search-replace for production
echo "Exporting database..."
wp search-replace "$SEARCH_STRING" "$REPLACE_STRING" --export="$DB_EXPORT_FILE" --allow-root
echo "Database exported to $DB_EXPORT_FILE"
