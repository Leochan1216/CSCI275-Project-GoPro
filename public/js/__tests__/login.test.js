import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { JSDOM } from "jsdom";

// Mock Firebase methods
jest.mock("https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js", () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
}));

describe("login.js", () => {
  let dom;
  let document;

  beforeEach(() => {
    // Set up the simulated DOM
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <form id="login-form">
          <input type="email" id="email" value="test@example.com" />
          <input type="password" id="password" value="!Test123" />
          <button type="button" id="submit">Login</button>
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

    // Require login.js after setting up the DOM
    require("../login.js");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call signInWithEmailAndPassword and redirect on successful login", async () => {
    // Mock successful Firebase response
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "123" },
    });

    // Simulate button click
    const submitButton = document.getElementById("submit");
    const event = new dom.window.Event("click", { bubbles: true, cancelable: true });
    submitButton.dispatchEvent(event);

    await new Promise(process.nextTick); // Wait for async code

    // Verify Firebase method is called with correct parameters
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "test@example.com",
      "!Test123"
    );

    // Verify redirection happens
    expect(global.location.href).toBe("indexC(login).html");
  });

  it("should handle errors from signInWithEmailAndPassword and show an alert", async () => {
    // Mock Firebase error
    signInWithEmailAndPassword.mockRejectedValue({
      message: "Error: Invalid email or password",
    });

    // Simulate button click
    const submitButton = document.getElementById("submit");
    const event = new dom.window.Event("click", { bubbles: true, cancelable: true });
    submitButton.dispatchEvent(event);

    await new Promise(process.nextTick); // Wait for async code

    // Verify Firebase method is called with correct parameters
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "test@example.com",
      "!Test123"
    );

    // Verify error alert is shown
    expect(global.alert).toHaveBeenCalledWith("Error: Invalid email or password");
  });
});
