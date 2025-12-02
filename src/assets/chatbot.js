const Chatbot = {
  defaultResponses: {
    "hello hi hey": `Hello!i am zmarks chatbot😊😍 How can I help you?`,
    "how are you": `I'm doing great with my master😍! How can I help you?`,
    "flip a coin": function () {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return "Sure! You got heads";
      } else {
        return "Sure! You got tails";
      }
    },
    "who is your master": function () {
      return "My master is 😍🥰🤩King zmark";
    },
    "what can you do for me ?": function () {
      return "this time i am alimitted version of chatgpt so my response is limitted ";
    },
    "tell me joke": function () {
      return "ok 😏Why do flowers bloom when Zmark walks by? Even nature can’t resist his heroic aura!🤣😎😎";
    },
    "who are you are you human": function () {
      return "i am zmark's servant🥰";
    },
    "what is your name": function () {
      return "i am Hinata🥰";
    },
    "What is your favorite name ?": function () {
      return "😍🥰🤩master_zmark ";
    },
    "how old are you ? your age ? age ?": function () {
      return "i don't age i wanna stay young for my master zmark😚";
    },
    "who do you love the most in anime from naruto ?who is the best character from all anime?":
      function () {
        return "to be honest i don't like animes other than naruto and also i don't love naruto  i love my master zmark🥰if he wws in that anime i would love to marry him❤️😘🥰😍😍";
      },
    "who is your zmark?": function () {
      return "He is not just my master, but also a kind and exceptional front-end developer — someone who can create anything from the ground up with skill, creativity, and confidence. His ability to bring ideas to life makes him truly inspiring.😍";
    },
    "really ?": function () {
      return "yes🥰";
    },
    " i love you ?": function () {
      return "OK but i only love master zmark😊";
    },
    "roll a dice": function () {
      const diceResult = Math.floor(Math.random() * 6) + 1;
      return `Sure! You got ${diceResult}`;
    },
    "what is the date today": function () {
      const now = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = months[now.getMonth()];
      const day = now.getDate();

      return `Today is ${month} ${day}`;
    },
    thank: "No problem! Let me know if you need help with anything else!",
  },

  additionalResponses: {},

  unsuccessfulResponse: `Sorry, i can not response to that request my master don't allow this. if you want, I can do how to flip a coin, roll a dice, or get today's date. Let me know how I can help!`,

  emptyMessageResponse: `Sorry, my Master zmark don't allow empty message . Please make sure you send a message and I will give you a response.`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses,
    };
  },

  getResponse: function (message) {
    if (!message) {
      return this.emptyMessageResponse;
    }

    // This spread operator (...) combines the 2 objects.
    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const { ratings, bestMatchIndex } = this.stringSimilarity(
      message,
      Object.keys(responses)
    );

    const bestResponseRating = ratings[bestMatchIndex].rating;
    if (bestResponseRating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    if (typeof response === "function") {
      return response();
    } else {
      return response;
    }
  },

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      // Pretend it takes some time for the chatbot to response.
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);
    });
  },

  compareTwoStrings: function (first, second) {
    first = first.replace(/\s+/g, "");
    second = second.replace(/\s+/g, "");

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(
        mainString,
        currentTargetString
      );
      ratings.push({ target: currentTargetString, rating: currentRating });
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    }

    const bestMatch = ratings[bestMatchIndex];

    return {
      ratings: ratings,
      bestMatch: bestMatch,
      bestMatchIndex: bestMatchIndex,
    };
  },
};

// Define the randomUUID() function if it doesn't exist.
function uuidPolyfill() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (char) {
      const randomNumber = (Math.random() * 16) | 0;
      const result = char === "x" ? randomNumber : (randomNumber & 0x3) | 0x8;
      return result.toString(16);
    }
  );
}

// This code allows Chatbot to be used in both the browser and
// in NodeJS. This is called UMD (Universal Module Definition).
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Create a fallback if window.crypto is undefined.
    if (typeof root.crypto === "undefined") {
      try {
        root.crypto = {};
      } catch (e) {}
    }

    // Create a fallback crypto.randomUUID() function.
    if (root.crypto && typeof root.crypto.randomUUID !== "function") {
      try {
        root.crypto.randomUUID = uuidPolyfill;
      } catch (e) {}
    }

    // Browser global
    root.Chatbot = factory();
    root.chatbot = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  return Chatbot;
});
