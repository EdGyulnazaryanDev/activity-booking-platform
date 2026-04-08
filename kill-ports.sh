#!/bin/bash

echo "Killing all activity-booking processes..."

# Kill all related processes
pkill -f "nest start"
pkill -f "react-scripts" 
pkill -f "activity-booking"

# Kill specific ports if still in use
lsof -ti:3010 | xargs -r kill -9
lsof -ti:3000 | xargs -r kill -9
lsof -ti:3002 | xargs -r kill -9

echo "All processes killed. Ports are now free!"

# Show status
echo "Checking port status..."
ss -tulpn | grep -E ":(3000|3010|3002)" || echo "All ports are free!"
