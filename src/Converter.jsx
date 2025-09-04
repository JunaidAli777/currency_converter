import { useState, useEffect, useCallback } from 'react'
const Converter = () => {

    const [currencyList, setCurrencyList] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("usd");
    const [toCurrency, setToCurrency] = useState("inr");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const getCurrencies = useCallback(async () => {
        try {
            const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`);
            const data = await res.json();
            setCurrencyList(Object.keys(data));
        }
        catch (err) {
            console.log('the error message is:', err);
        }
    }
    )

    const swap = () => {
        setFrom(to);
        setTo(from);
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    useEffect(() => {
        getCurrencies();
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.min.json`)
            .then(res => res.json())
            .then(res => {
                setTo((from * res[fromCurrency][toCurrency]).toFixed(4))
            })
            .catch(err => console.error(err))
    }, [fromCurrency, toCurrency, from , getCurrencies])

    return (
        <div className={`bg-[url('/decent.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center`}>
            <div
                className='bg-white/85 rounded-lg flex flex-col justify-center items-center p-10 gap-4 max-w-10/12'>
                <div className='sm:flex sm:gap-3 max-w-full'>
                    <input
                        className='px-4 py-3 border-2 border-gray-300 rounded w-96 max-w-full'
                        placeholder='From'
                        type="number"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        id="fromCurrency"
                        name="fromCurrency"
                    >
                        {currencyList.map(currency => {
                            return (
                                <option key={currency} value={currency}>{currency}</option>
                            )
                        })}
                    </select>
                </div>

                <button
                    onClick={swap}
                    className='cursor-pointer bg-blue-500 active:bg-blue-600 text-white sm:-my-5 px-2 py-0.5 rounded z-100'>
                    swap
                </button>

                <div className='sm:flex sm:gap-3 max-w-full'>
                    <input
                        className='px-4 py-3 border-2 border-gray-300 rounded w-96 max-w-full'
                        placeholder='To'
                        type="number"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        id="toCurrency"
                        name="toCurrency"
                    >
                        {currencyList.map(currency => {
                            return (
                                <option key={currency} value={currency}>{currency}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='text-gray-400'>* The exchange rates change on daily basis</div>
            </div>
        </div>
    )
}

export default Converter