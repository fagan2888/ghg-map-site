#!/usr/bin/env bash

mkdir -p public/data
curl https://raw.githubusercontent.com/ricklupton/ghg-map-2014-data/v1.0/sankey_data.json > public/data/sankey_data.json
