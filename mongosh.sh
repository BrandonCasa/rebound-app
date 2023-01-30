#!/bin/bash
echo Input Database Password: 
read passname
mongosh -u myUserAdmin -p $passname --authenticationDatabase admin rebound