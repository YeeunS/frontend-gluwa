import React, { useState, useEffect } from 'react';
import './style/index.scss';
import { TokenSelector } from './component/TokenSelector';

const App: React.FC = () => {
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const [payCurrency, setPayCurrency] = useState<string | null>(null);
  const [receiveCurrency, setReceiveCurrency] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [balance, setBalance] = useState<{ [key: string]: number }>({});
  const [currencyValues, setCurrencyValues] = useState<{ [key: string]: number }>({});
  const [calculatedReceiveAmount, setCalculatedReceiveAmount] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);

  // API 1: GET balance of currencies
  const fetchBalance = async () => {
    const response = await fetch('https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-balance');
    const data = await response.json();
    setBalance(data);
  };

  // API 2: GET value of currencies
  const fetchCurrencyValues = async () => {
    const response = await fetch('https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-price');
    const data = await response.json();
    setCurrencyValues(data);
  };

  // put the price
  const handlePayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    setPayAmount(amount);
  };

  // API 3: POST swap
  const handleSwap = async () => {
    if (payCurrency && receiveCurrency && calculatedReceiveAmount !== null) {
      setIsSwapping(true);
      await fetch('https://inhousedashboard-test-app.azurewebsites.net/api/Interview/post-swap', {
        method: 'POST',
        body: JSON.stringify({
          fromCurrency: payCurrency,
          toCurrency: receiveCurrency,
          amount: payAmount,
        }),
      });
      setIsSwapping(false);
    }
  };

  // calculate the currency
  useEffect(() => {
    if (payCurrency && receiveCurrency && currencyValues[payCurrency] && currencyValues[receiveCurrency]) {
      const totalValue = payAmount * currencyValues[payCurrency];
      const receiveAmount = totalValue / currencyValues[receiveCurrency];
      setCalculatedReceiveAmount(receiveAmount);
    }
  }, [payCurrency, receiveCurrency, payAmount, currencyValues]);

  // API call when component mounting
  useEffect(() => {
    fetchBalance();
    fetchCurrencyValues();
  }, []);

  return (
    <div>
      <section className="page swap-page">
        <div className="box-content">
          <div className="heading">
            <h2>Swap</h2>
          </div>

          <div className="swap-dashboard">
            {/* You pay currency */}
            <div className="swap-item active">
              <div className="title">
                <h3>You pay</h3>
              </div>
              <div className="amount-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="0"
                  value={payAmount}
                  onChange={handlePayAmountChange}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="currency-label"
                  onClick={() => setIsTokenSelectorOpen(true)}
                  style={{ marginLeft: '10px' }}
                >
                  {payCurrency || 'Select token'}
                </button>
              </div>
              <div className="balance" style={{ fontSize: '14px', color: '#777', textAlign: 'right', paddingBottom: '15px' }}>
                <span>Balance: {balance[payCurrency || '']}</span>
              </div>
            </div>

            {/* arrow */}
            <button type="button" className="mark" onClick={() => {
              const temp = payCurrency;
              setPayCurrency(receiveCurrency);
              setReceiveCurrency(temp);
            }}>
              <i className="blind">swap</i>
            </button>

            {/* You receive currency */}
            <div className="swap-item">
              <div className="title">
                <h3>You receive</h3>
              </div>
              <div className="amount-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="0"
                  value={calculatedReceiveAmount || 0}
                  readOnly
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="currency-label select"
                  onClick={() => setIsTokenSelectorOpen(true)}
                  style={{ marginLeft: '10px' }}
                >
                  {receiveCurrency || 'Select token'}
                </button>
              </div>
              <div className="balance" style={{ fontSize: '14px', color: '#777', textAlign: 'right', paddingBottom: '15px' }}>
                <span>Balance: {balance[receiveCurrency || '']}</span>
              </div>
            </div>

            {/* swap button */}
            <div className="button-wrap" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="normal"
                disabled={payAmount <= 0 || !payCurrency || !receiveCurrency || payAmount > balance[payCurrency || '']}
                onClick={handleSwap}
              >
                {isSwapping ? 'Swapping...' : 'Swap'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* token selection module */}
      {isTokenSelectorOpen && (
        <TokenSelector
          onClose={() => setIsTokenSelectorOpen(false)}
          setPayCurrency={setPayCurrency}
          setReceiveCurrency={setReceiveCurrency}
        />
      )}
    </div>
  );
}

export default App;
