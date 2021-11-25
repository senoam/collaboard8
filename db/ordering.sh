#!/bin/bash

tables_ordered=("user" "whiteboard" "history")
len=${#tables_ordered[*]}

i=1
for table in "${tables_ordered[@]}"
do
    mv "/docker-entrypoint-initdb.d/temp/tables/$table.sql" "/docker-entrypoint-initdb.d/$i-$table.sql"
    i=$((i+1))
done
