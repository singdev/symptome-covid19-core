#!/bin/bash

curl -H "Accept: application/json" -H "Content-Type: application/json" -d @root.json http://localhost:3001/users/auth/root >> token.txt

token=`cat token.txt`;

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @orphee.json http://localhost:3001/users

rm token.txt
