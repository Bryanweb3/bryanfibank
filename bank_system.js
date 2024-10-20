class User {
    constructor(name, initialBalance = 0) {
        this.name = name;
        this.balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    getBalance() {
        return this.balance;
    }
}

class Bank {
    constructor() {
        this.users = new Map();
    }

    registerUser(name, initialBalance = 0) {
        if (!this.users.has(name)) {
            this.users.set(name, new User(name, initialBalance));
            return true;
        }
        return false;
    }

    transfer(fromUser, toUser, amount) {
        if (this.users.has(fromUser) && this.users.has(toUser)) {
            const sender = this.users.get(fromUser);
            const receiver = this.users.get(toUser);
            
            if (sender.withdraw(amount)) {
                if (receiver.deposit(amount)) {
                    return true;
                } else {
                    sender.deposit(amount); // Refund if deposit fails
                }
            }
        }
        return false;
    }
}


const bank = new Bank();


bank.registerUser("bryan", 1000);
bank.registerUser("lapshak", 500);
const bryan = bank.users.get("bryan");
const lapshak = bank.users.get("lapshak");

console.log(`bryan's balance: $${bryan.getBalance()}`);
console.log(`lapshak's balance: $${lapshak.getBalance()}`);

bryan.deposit(200);
console.log(`bryan's balance after deposit: $${bryan.getBalance()}`);

lapshak.withdraw(100);
console.log(`lapshak's balance after withdrawal: $${lapshak.getBalance()}`);

bank.transfer("bryan", "lapshak", 300);
console.log(`bryan's balance after transfer: $${bryan.getBalance()}`);
console.log(`lapshak's balance after transfer: $${lapshak.getBalance()}`);
