#!/bin/bash

curl -H "Accept: application/json" -H "Content-Type: application/json" -d @root.json http://54.38.190.167:20022/users/auth/root >> token.txt

token=`cat token.txt`
echo $token

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "authorization: Bearer ${token}" -d @rufus.json http://54.38.190.167:20022/users

rm token.txt
