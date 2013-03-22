#! /bin/sh

# Params
YEAR=2013
MONTH=03

MONTHURL="http://calendar.duke.edu/events/index?date_span=month&user_date=$MONTH%2F01%2F$YEAR"

# Current Day URL
DAYURL="http://calendar.duke.edu/events/index.json?date_span=day"

# Generate Time stamp
TIMESTAMP=$(date +%s)

# Generate Output File name
OUTPUT="$TIMESTAMP".json

URL=$DAYURL
# URL=$MONTHURL

curl -H 'Accept: application/json' -s "$URL"  | python -mjson.tool > $OUTPUT

node processAndDumpToDb.js $OUTPUT

# Clean up
# rm $OUTPUT