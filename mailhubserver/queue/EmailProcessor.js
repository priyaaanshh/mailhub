/*
    EmailProcessor is a subclass of MessageProcessor.
    It implements the `process` method to simulate sending an email with a delay.
    This adheres to the Open/Closed Principle, allowing extension without modifying the MessageQueue.
*/

import MessageProcessor from "./MessageProcessor.js";

export default class EmailProcessor extends MessageProcessor {
    // Simulates processing a message (sending an email).
    // The process method returns a promise and resolves after a delay.
    async process(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Sending email: ${message.data}`);
                resolve();  // Simulate email sent successfully
            }, message.delay || 1000); // Default delay of 1 second if not provided
        });
    }
}