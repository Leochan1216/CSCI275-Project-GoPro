module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFiles: ["<rootDir>/jest.setup.js"], // Optional global setup
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    moduleNameMapper: {
      "^https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js$": "<rootDir>/__mocks__/firebase-app.js",
      "^https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js$": "<rootDir>/__mocks__/firebase-auth.js",
    },
  };
  