export const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
console.log(fibonacci(10));`;

export const sampleBuggyCode = `function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + item.price;
  }, 0);
}

const cart = [
  { name: "Apple", cost: 1.5 },
  { name: "Orange", cost: 2.0 }
];

console.log(calculateTotal(cart));
// Error: Cannot read properties of undefined (reading 'price')`;

export const samplePrompts = [
  "Create a function that reverses a string",
  "Write a function to check if a number is prime",
  "Create a Todo list component in React",
  "Write a Python script to scrape a website",
];

export const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C",
  "C++",
  "PHP",
  "Ruby",
  "Go",
  "TypeScript",
  "Swift",
];