function numberToWords(n) {
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const scales = ["", "thousand", "million", "billion"];

  if (n === 0) return "zero";

  function chunkToWords(num) {
    let words = "";
    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }
    if (num >= 20) {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += "-" + ones[num % 10];
      }
    } else if (num > 0) {
      words += ones[num];
    }
    return words.trim();
  }

  let parts = [];
  let chunkIndex = 0;
  while (n > 0) {
    const chunk = n % 1000;
    if (chunk > 0) {
      parts.unshift(`${chunkToWords(chunk)} ${scales[chunkIndex]}`.trim());
    }
    n = Math.floor(n / 1000);
    chunkIndex++;
  }
  return parts.join(" ").trim();
}

function convert() {
  const input = document.getElementById("amount").value.trim();
  const output = document.getElementById("output");

  if (!input || isNaN(input)) {
    output.textContent = "❌ Please enter a valid number.";
    return;
  }

  const value = parseFloat(input);
  if (value < 0 || value > 1000000000) {
    output.textContent = "❌ Enter a number between 0 and 1,000,000,000.";
    return;
  }

  const dollars = Math.floor(value);
  const cents = Math.round((value - dollars) * 100);

  let text = "";
  if (dollars > 0) {
    text += numberToWords(dollars) + " dollar" + (dollars !== 1 ? "s" : "");
  }

  if (cents > 0) {
    if (text) text += " ";
    text += numberToWords(cents) + " cent" + (cents !== 1 ? "s" : "");
  }

  if (value === 0) {
    text = "zero dollars";
  }

  output.textContent = "✅ " + text;
}

function resetFields() {
  document.getElementById("amount").value = "";
  document.getElementById("output").textContent = "";
}
