Welcome to the webroot_auth_demo

This demo was built using react and electron. I capped the effort to building this demo to less than 8 hours. As such, there are characteristics that I would add if I had more time. I attempted to express through this demo my general understanding of design, testing, and security characteristics.

Security Characteristics

- storage of passwords as hashed values
- obscure wrong password or wrong user as a user/password combination
- prevent account enumeration by not indicating if an account already exists on registration
- minimum password requirements

Testing Characteristics

- success and failure scenarios
- minimize implementation details

If I had more time:

- further test coverage
- persistent storage of passwords
- cross-platform builds
- further separation of concerns and more thorough application of SOLID principles

To run the demo:

1. In Windows, run the .exe. file in the /dist folder.

To run the dev environment:

1. Install nodejs and yarn.
2. Clone this repo.
3. In a terminal, navigate to the root folder of this repo.
4. Execute `yarn` to install dependencies.
5. Execute `yarn electron-dev` to start the develompment environment
6. To run tests, execute `yarn test`.
