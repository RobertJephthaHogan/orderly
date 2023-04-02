#!/bin/bash 


echo "Running test.bat"

# Start the React App
npm start &

# Wait for the React app to start
while ! nc -z localhost 3000; do
  sleep 0.1
done

npm test