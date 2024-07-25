
//UTILITY FUNCTION
function noInputtedWord() {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false;
}

//BUSINESS LOGIC
function wordCounter(text) {
  if (noInputtedWord(text)) {
     return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function (word) {
    if (word.trim().length !== 0 && !Number(word)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function (element) {
    if (word.toLowerCase() === element.toLowerCase()) {
      wordCount++
    }
  });
  return wordCount;
}

function maskBadWords(sentence) {
  // Convert the sentence into an array of words
  let words = sentence.split(' ');
  let badWords = ['zoinks', 'loopdaloop', 'biffaroni', 'muppeteer'];
  // Iterate through each word in the sentence
  for (let i = 0; i < words.length; i++) {
    // Check each word against the list of bad words
    if (badWords.includes(words[i].toLowerCase())) {
      // Mask the bad word
      let maskedWord = words[i][0] + '*'.repeat(words[i].length - 2) + words[i].slice(-1);
      words[i] = maskedWord;
    }
  }
  // Join the words back into a sentence and return the result
  return words.join(' ');
}



function wordSearch(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (element.toLowerCase() === word.toLowerCase()) {
      const regex = new RegExp(word, "gi");
      let matchArray = element.match(regex);
      element = element.replace(matchArray[0], "<b style='background-color: green; padding: 2px;'>" +
        matchArray[0] +
        "</b>")
      htmlString = htmlString.concat(element);
    }
    else if (element.toLowerCase().includes(word.toLowerCase())) {
      const regex = new RegExp(word, "gi");
      let matchArray = element.match(regex);
      element = element.replace(matchArray[0], "<b style='background-color: #ffdd4b; padding: 2px;'>" +
        matchArray[0] +
        "</b>")
      htmlString = htmlString.concat(element);
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== textArray.length - 1) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function topThree(sentence) {
  if (noInputtedWord(sentence)) {
    return;
  }
  // Convert the sentence to lowercase and remove punctuation
  const newSentence = sentence.toLowerCase().replace(/[^\w\s]/g, '');
  const words = newSentence.split(/\s+/);

  // Create a unique array of words
  const uniqueWords = [...new Set(words)];

  // Create an array to store each word and its count
  const wordCountsArray = [];

  // Count the occurrence of each word
  uniqueWords.forEach((uniqueWord) => {
    let count = 0;
    words.forEach((word) => {
      if (uniqueWord === word) {
        count++;
      }
    });
    wordCountsArray.push([uniqueWord, count]);
  });

  // Sort the wordCountsArray by count in descending order
  wordCountsArray.sort((a, b) => b[1] - a[1]);

  // Get the top three most common words and their counts
  const topWords = wordCountsArray.slice(0, 3);

  // Initialize an HTML list with <ul> tag
  let topList = "<ul>";

  // Loop through the top three words and create <li> tags
  topWords.forEach(element => {
    topList += "<li>" + element[0] + ":" + element[1] + "</li>";
  });

  // Close the HTML list with </ul> tag
  topList += "</ul>";

  // Return the full list as an HTML string
  return topList;
}


//UI
$(document).ready(function () {
  $("#mark").click(function () {
    $( ".Michael").show()
    $("#mark").hide()
    $(".back").hide()
  })

  let myText = document.getElementById("userText");
  let searchButton2 = document.getElementById("ana");
  let searchButton = document.getElementById("search");
  let maskedSentence;
  searchButton2.addEventListener("click", () => {
    let count = wordCounter(myText.value);
    maskedSentence = maskBadWords(myText.value)
    document.getElementById("textdisplayed").innerHTML = maskedSentence;
    document.getElementById("characters").textContent = `Total  Word Count: ${count}`;
    document.getElementById("three").innerHTML = topThree(myText.value);
  });
  searchButton.addEventListener("click", () => {
    console.log("clicked")
    let textToSearch = document.getElementById("text-to-search").value;
    if (noInputtedWord(textToSearch)) {
      return;
    }
    maskedSentence = maskBadWords(myText.value)
    let searchSentence = wordSearch(textToSearch, maskedSentence);
    document.getElementById("textdisplayed").innerHTML = searchSentence
    let wordCount = numberOfOccurrencesInText(textToSearch, myText.value);
    document.getElementById("paragraphs").textContent = `Total  Word Occurence: ${wordCount}`;
  });
})