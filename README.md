# Loyal Customer Finder

## Overview

This project identifies "loyal customers" based on log files from two different days. A loyal customer is defined as a customer who:
1. Visited the website on **both days**.
2. Visited at least **two unique pages** across the two days.

## Folder Structure

```bash
LoyalCustomers/
│
├── logs/
│   ├── day1.json      # Log file for Day 1
│   └── day2.json      # Log file for Day 2
│
├── src/
│   ├── index.js       # Main JavaScript code
│
└── README.md          # Documentation (This file)
'''

'''bash
//Compile and run
npm start
