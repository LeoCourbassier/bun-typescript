#!/bin/bash

name=$1
template=$2

if [ -z "$name" ]; then
    echo "Domain name is required"
    exit 1
fi

if [ -z "$template" ]; then
    template="health-check"
fi

echo "Creating new domain $name from template $template..."

prefix="src/apps/$name"

folders=(
  "adapters/http/controllers"
  "adapters/http/routes"
  "adapters/http/views/request"
  "adapters/http/views/response"
  "applications"
  "models"
  "repositories"
)

# Create folders
for folder in "${folders[@]}"; do
    # Create folder
    mkdir -p "$prefix/$folder"

    # Create .gitkeep
    touch "$prefix/$folder/.gitkeep"
done

configs=(
    "@$name/controllers/*:apps/$name/adapters/http/controllers/*"
    "@$name/routes/*:apps/$name/adapters/http/routes/*"
    "@$name/views/*:apps/$name/adapters/http/views/*"
    "@$name/applications/*:apps/$name/applications/*"
    "@$name/models/*:apps/$name/models/*"
    "@$name/repositories/*:apps/$name/repositories/*"
)

tsconfig=$(cat tsconfig.json)

echo "Adding paths to tsconfig.json..."
# Add to tsconfig.json
for config in "${configs[@]}"; do
    key=$(echo $config | cut -d':' -f1)
    value=$(echo $config | cut -d':' -f2)
    tsconfig=$(echo $tsconfig | jq --arg key "$key" --arg value "$value" '.compilerOptions.paths += {
        ($key): [
            $value
        ]
    }')
done

cp tsconfig.json tsconfig.json.bak
echo $tsconfig | jq . > tsconfig.json

echo "Done!"