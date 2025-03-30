# frontend-gluwa

# Currency Swap Application

This is a currency swap application where users can exchange two or more currencies with each other. The application integrates with APIs to fetch the balance and values of currencies and performs the necessary calculations to display the amount the user will receive after swapping currencies.

## Features

- **View Currency Balance**: The user's currency balances are fetched via **API 1** and displayed for each selected currency.
- **Enter Amount**: The user can input an amount in the "You pay" field to specify how much they want to swap.
- **Currency Selector**: By clicking on the currency selector, the user can select either the "You pay" currency or the "You receive" currency. The selected currency will be displayed on the screen.
- **Balance Validation**: If the entered amount exceeds the user's balance for a particular currency, the "Swap" button will be disabled.
- **Swap Currencies**: Clicking the arrow between the "You pay" and "You receive" sections will swap the positions of the selected currencies.
- **Calculation of Swap Amount**: If both the "You pay" and "You receive" currencies are selected and a valid amount is entered, the application will calculate and display the amount the user will receive in the "You receive" field. This calculation is based on the current values of the currencies, fetched via **API 2**.
  
  - Calculation Formula:
    - **Total Value of 'You pay'** = (Amount of 'You pay' currency) * (Value of 'You pay' currency)
    - **Amount of 'You receive'** = Total Value of 'You pay' / Value of 'You receive'
  
- **Swap Transaction**: Once the "Swap" button is enabled, clicking it triggers a call to **API 3**, which processes the swap request.

## APIs

1. **API 1: Get Currency Balances**
   - **URL**: `GET https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-balance`
   - **Response**: A JSON object with the user's balances for each currency.
   
2. **API 2: Get Currency Values**
   - **URL**: `GET https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-price`
   - **Response**: A JSON object with the current values of each currency in USD.
     ```json
     {
       "CTC": "0.4577328",
       "USDC": "0.9998875",
       "USDT": "1.0001031",
       "WCTC": "0.4577328"
     }
     ```
     
3. **API 3: Perform Currency Swap**
   - **URL**: `POST https://inhousedashboard-test-app.azurewebsites.net/api/Interview/post-swap`
   - **Body**:
     ```json
     {
       "fromCurrency": "CTC",
       "toCurrency": "USDC",
       "amount": 10
     }
     ```
   - **Response**: Confirmation of the swap transaction.

## Usage

1. Upon loading the application, the user's balance and available currencies are fetched via **API 1** and **API 2**.
2. The user selects a currency for both "You pay" and "You receive" using the currency selector.
3. The user enters the amount they wish to swap in the "You pay" field. If the entered amount exceeds the balance, the "Swap" button is disabled.
4. The user can click the arrow in the center to swap the "You pay" and "You receive" currencies.
5. The application calculates the amount the user will receive in the "You receive" field based on the entered amount and currency values.
6. Once everything is set, the user can click the "Swap" button to trigger the transaction, which sends a POST request to **API 3**.

## Requirements

- A modern browser (e.g., Chrome, Firefox, Edge).
- Internet connection to fetch data from the APIs.

## How to Run

- Clone the repository:
```bash
   git clone https://github.com/your-username/frontend-gluwa.git
   npm start
   npm run dev

## References

The following external resources were used in this project:

1. [React Docs](https://reactjs.org/docs/getting-started.html) - Official documentation for React for basic usage.
2. [MDN Web Docs](https://developer.mozilla.org/en-US/) - Documentation for JavaScript and web technologies.

## License

This project is licensed under the MIT License. Please refer to the [LICENSE](LICENSE) file for more details.


    Clone the repository:
    e.g.) cd Your Desktop/frontend-gluwa
    npm start
    npm run dev
