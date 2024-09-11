import fs from 'fs'
import path from 'path'

// Function to read JSON logs Timestamps, PageId, CustomerId
function readLogFile(filePath) {
    const data = fs.readFileSync(path.resolve(filePath), 'utf8');
    return JSON.parse(data);
}

// Function to group pages customer by customer
function groupPagesByCustomer(log) {
    return log.reduce((acc, entry) => {
        if (!acc[entry.customerId]) {
            acc[entry.customerId] = [];
        }
        acc[entry.customerId].push(entry.pageId);
        return acc;
    }, {});
}

// Function to find loyal customers who have visited the website on both days and different pages.
function findLoyalCustomers(day1Log, day2Log) {
    const customersDay1 = groupPagesByCustomer(day1Log);
    const customersDay2 = groupPagesByCustomer(day2Log);

    let loyalCustomers = [];

    for (const customerId in customersDay1) {
        if (customersDay2[customerId]) {
            const uniquePagesDay1 = new Set(customersDay1[customerId]);
            const uniquePagesDay2 = new Set(customersDay2[customerId]);

            const totalUniquePages = new Set([...uniquePagesDay1, ...uniquePagesDay2]);

            if (totalUniquePages.size >= 2) {
                loyalCustomers.push(customerId);
            }
        }
    }

    return loyalCustomers;
}

// Main function
function main() {
    const logDay1 = readLogFile('logs/day1.json');
    const logDay2 = readLogFile('logs/day2.json');

    const loyalCustomers = findLoyalCustomers(logDay1, logDay2);

    if (loyalCustomers.length > 0) {
        console.log("Loyal customers who visited both days and at least two unique pages: ");
        console.log(loyalCustomers);
    } else {
        console.log("No loyal customers found.");
    }
}

main();
