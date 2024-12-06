import { setupEventListeners } from "../register.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { JSDOM } from "jsdom";

// Mock Firebase methods
jest.mock("https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js", () => ({
  getAuth: jest.fn(() => ({})),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe("register.js", () => {
  let dom;
  let document;

  beforeEach(() => {
    // Set up DOM structure before testing
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <form id="login-form">
          <input type="email" id="email" value="test@example.com" />
          <input type="password" id="password" value="!Test123" />
          <button type="button" id="submit">Sign Up</button>
        </form>
      </body>
      </html>
    `);

    // Assign simulated DOM to global objects
    document = dom.window.document;
    global.window = dom.window;
    global.document = dom.window.document;

    // Mock global alert and location
    global.alert = jest.fn();
    global.location = { href: "" };

    // Explicitly call setupEventListeners after DOM setup
    setupEventListeners();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call createUserWithEmailAndPassword and alert on successful registration", async () => {
    // Mock successful Firebase response
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: "123" },
    });

    // Simulate button click
    const submitButton = document.getElementById("submit");
    const event = new dom.window.Event("click", { bubbles: true, cancelable: true });
    submitButton.dispatchEvent(event);

    await new Promise(process.nextTick); // Wait for async code

    // Verify Firebase method is called with correct parameters
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "test@example.com",
      "!Test123"
    );

    // Verify success alert is shown
    expect(global.alert).toHaveBeenCalledWith("Creating Account...");
    expect(global.location.href).toBe("indexC(login).html");
  });

  it("should handle Firebase errors and show an alert", async () => {
    // Mock Firebase error
    createUserWithEmailAndPassword.mockRejectedValue({
      message: "Error: Invalid email or password",
    });

    // Simulate button click
    const submitButton = document.getElementById("submit");
    const event = new dom.window.Event("click", { bubbles: true, cancelable: true });
    submitButton.dispatchEvent(event);

    await new Promise(process.nextTick); // Wait for async code

    // Verify Firebase method is called with correct parameters
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "test@example.com",
      "!Test123"
    );

    // Verify error alert is shown
    expect(global.alert).toHaveBeenCalledWith("Error: Invalid email or password");
  });
});
