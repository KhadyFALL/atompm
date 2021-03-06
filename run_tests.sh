#!/bin/bash

#exit on errors
set -e

#run server
echo "Starting server..."
node httpwsd.js &
serverpid=$!
sleep 3

#check if server is dead
if ! kill -0 "$serverpid"; then
    wait $serverpid
    server_status=$?
    exit $server_status
fi

#run mt script
echo "Starting model transformation script..."
python2 mt/main.py &
mtpid=$!
sleep 3

#check if model transformer is dead
if ! kill -0 "$mtpid"; then
    wait $mtpid
    mt_status=$?
    exit $mt_status
fi

echo "Starting tests..."

#start nightwatch tests
nightwatch


echo "Stopping server and mt script..."
kill "$serverpid"
kill "$mtpid"



echo "Finished!"