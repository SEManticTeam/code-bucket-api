#!/bin/sh
curl --include --request POST http://localhost:3000/books \
--header "Authorization: Token token=OUaccsIM5T0BvBDadrd1Tx5lkeEQ1r1vbEgdDRFLe3s=--/cm1hyLoOOJb1R2w2eBgJgVT1aym8ulln/tn+twtR48=" \
--header "Content-Type: application/json" \
--data '{
  "book": {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 100.00
  }
}'
