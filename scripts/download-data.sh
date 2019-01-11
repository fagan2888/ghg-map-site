#!/usr/bin/env bash

mkdir -p public/data
curl https://raw.githubusercontent.com/ricklupton/ghg-map-2014-data/7b68cb2d23df2f50dade383af95f51179d80d552/sankey_data.json > public/data/sankey_data.json
