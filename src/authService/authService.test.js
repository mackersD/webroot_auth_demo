describe("authService", () => {
  let authService;
  let mockHashPasswordAsync = jest.fn(() => Promise.resolve(""));
  let mockCheckPasswordAsync = jest.fn(() => Promise.resolve(true));
  let mockAddUserAsync = jest.fn(() =>
    Promise.resolve({ username: "username" })
  );
  let mockGetUserAsync = jest.fn(() =>
    Promise.resolve({ username: "username" })
  );

  beforeAll(() => {
    jest.mock("./passwordHelper", () => ({
      hashPasswordAsync: mockHashPasswordAsync,
      checkPasswordAsync: mockCheckPasswordAsync
    }));

    jest.mock("./userStore", () => ({
      addUserAsync: mockAddUserAsync,
      getUserAsync: mockGetUserAsync
    }));

    authService = require("./authService").default;
  });

  afterEach(() => {
    mockHashPasswordAsync.mockClear();
    mockCheckPasswordAsync.mockClear();
    mockAddUserAsync.mockClear();
    mockGetUserAsync.mockClear();
  });

  afterAll(() => {
    jest.unmock("./passwordHelper");
    jest.unmock("./userStore");
  });

  it("registerAsync hashes password and stores", done => {
    mockHashPasswordAsync.mockImplementationOnce(() =>
      Promise.resolve("dummy hash")
    );

    const username = "test_username";
    const password = "P@55w0Rd";

    return authService.registerAsync(username, password).then(() => {
      expect(mockAddUserAsync).toHaveBeenCalledWith(username, "dummy hash");
      done();
    });
  });

  it("registerAsync fails when unable to store", () => {
    const error = new Error("dummy error");
    mockAddUserAsync.mockImplementationOnce(() => Promise.reject(error));

    const username = "test_username";
    const password = "P@55w0Rd";

    return expect(
      authService.registerAsync(username, password)
    ).rejects.toEqual(error);
  });

  it("loginAsync fails with generic error when it doesn't find user", () => {
    const username = "test_username";

    mockGetUserAsync.mockImplementationOnce(() => Promise.resolve(undefined));

    return expect(authService.loginAsync(username)).rejects.toThrow(
      "username/password"
    );
  });

  it("loginAsync fails with generic error when password check fails", () => {
    const username = "test_username";
    const password = "test_password";
    const hash = "test_hash";
    mockGetUserAsync.mockImplementationOnce(() =>
      Promise.resolve({
        username,
        hash
      })
    );
    mockCheckPasswordAsync.mockImplementationOnce(() => Promise.resolve(false));
    return expect(authService.loginAsync(username, password))
      .rejects.toThrow("username/password")
      .then(() => {
        expect(mockGetUserAsync).toHaveBeenCalledWith(username);
        expect(mockCheckPasswordAsync).toHaveBeenCalledWith(password, hash);
      });
  });

  it("loginAsync succeeds", () => {
    const username = "test_username";
    const password = "test_password";
    mockGetUserAsync.mockImplementationOnce(() =>
      Promise.resolve({ username })
    );
    return expect(authService.loginAsync(username, password)).resolves.toEqual({
      username
    });
  });
});
