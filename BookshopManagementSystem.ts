
// Bookshop Management System in TypeScript

import * as readline from 'readline';

// Book class definition
class Book {
    author: string;
    title: string;
    publisher: string;
    price: number;
    stock: number;

    constructor() {
        this.author = '';
        this.title = '';
        this.publisher = '';
        this.price = 0;
        this.stock = 0;
    }

    feedData(author: string, title: string, publisher: string, price: number, stock: number): void {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.price = price;
        this.stock = stock;
    }

    editData(author: string, title: string, publisher: string, price: number, stock: number): void {
        this.feedData(author, title, publisher, price, stock);
    }

    showData(): void {
        console.log('\nBook Information:');
        console.log(`Author: ${this.author}`);
        console.log(`Title: ${this.title}`);
        console.log(`Publisher: ${this.publisher}`);
        console.log(`Price: $${this.price.toFixed(2)}`);
        console.log(`Stock: ${this.stock}`);
    }

    search(title: string, author: string): boolean {
        return this.title === title && this.author === author;
    }

    buyBook(quantity: number): void {
        if (this.stock >= quantity) {
            this.stock -= quantity;
            const totalCost = this.price * quantity;
            console.log(`Book bought successfully. Total cost: $${totalCost.toFixed(2)}`);
        } else {
            console.log('Requested quantity not in stock.');
        }
    }
}

// Utility: Input handler using Promises
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

// Main logic
async function main() {
    const books: Book[] = [];
    let choice: number;

    do {
        console.log(`\n------ Bookshop Management System ------`);
        console.log(`1. Add Book Information`);
        console.log(`2. Display All Books`);
        console.log(`3. Search Book`);
        console.log(`4. Buy Book`);
        console.log(`5. Edit Book Information`);
        console.log(`6. Exit`);
        const input = await askQuestion("Enter your choice: ");
        choice = parseInt(input);

        switch (choice) {
            case 1:
                const newBook = new Book();
                const a = await askQuestion("Enter Author Name: ");
                const t = await askQuestion("Enter Title Name: ");
                const p = await askQuestion("Enter Publisher Name: ");
                const pr = parseFloat(await askQuestion("Enter Price: "));
                const s = parseInt(await askQuestion("Enter Stock: "));
                newBook.feedData(a, t, p, pr, s);
                books.push(newBook);
                break;

            case 2:
                if (books.length === 0) {
                    console.log("No books available.");
                } else {
                    books.forEach((b, index) => {
                        console.log(`\nBook ${index + 1}:`);
                        b.showData();
                    });
                }
                break;

            case 3:
                const stitle = await askQuestion("Enter Title to Search: ");
                const sauthor = await askQuestion("Enter Author to Search: ");
                let found = false;
                for (const b of books) {
                    if (b.search(stitle, sauthor)) {
                        console.log("Book Found:");
                        b.showData();
                        found = true;
                        break;
                    }
                }
                if (!found) console.log("Book not found.");
                break;

            case 4:
                const btitle = await askQuestion("Enter Title to Buy: ");
                const bauthor = await askQuestion("Enter Author to Buy: ");
                const qty = parseInt(await askQuestion("Enter Quantity: "));
                let purchased = false;
                for (const b of books) {
                    if (b.search(btitle, bauthor)) {
                        b.buyBook(qty);
                        purchased = true;
                        break;
                    }
                }
                if (!purchased) console.log("Book not available.");
                break;

            case 5:
                const etitle = await askQuestion("Enter Title to Edit: ");
                const eauthor = await askQuestion("Enter Author to Edit: ");
                let edited = false;
                for (const b of books) {
                    if (b.search(etitle, eauthor)) {
                        const ea = await askQuestion("Enter New Author Name: ");
                        const et = await askQuestion("Enter New Title Name: ");
                        const ep = await askQuestion("Enter New Publisher Name: ");
                        const epr = parseFloat(await askQuestion("Enter New Price: "));
                        const es = parseInt(await askQuestion("Enter New Stock: "));
                        b.editData(ea, et, ep, epr, es);
                        console.log("Book information updated.");
                        edited = true;
                        break;
                    }
                }
                if (!edited) console.log("Book not found.");
                break;

            case 6:
                console.log("Exiting program...");
                rl.close();
                break;

            default:
                console.log("Invalid choice.");
        }
    } while (choice !== 6);
}

main();
