import { useState, useEffect } from "react";
import axios from "axios";
import styles from './index.module.css';

const TableRate = () => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://api.currencyfreaks.com/latest?apikey=58e6c611899244bb901387891b45d958&symbols=CAD,IDR,JPY,CHF,EUR,GBP')
        .then((response) => {
            setRates(response.data.rates);
            setLoading(false);
        })
    }, []);

    const percentage = (value, opr) => {
        let dataToFloat = parseFloat(value);
        if(opr === 'sum'){
            return (dataToFloat + (dataToFloat * 5 / 100)).toFixed(4); 
        }
        return (dataToFloat - (dataToFloat * 5 / 100)).toFixed(4);
    }

    return(
        <div>
            <table className="table">
                <thead>
                    <tr className={styles.textColor}>
                        <th scope="col">Currency</th>
                        <th scope="col">We Buy</th>
                        <th scope="col">Exchange Rate</th>
                        <th scope="col">We Sell</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ? <tr className={styles.textColor}><td>Loading...</td></tr> :
                    Object.keys(rates).map((data) => {
                        return(
                            <tr key={data} className={styles.textColor}>
                                <th scope="row">{data}</th>
                                <td>{percentage(rates[data], 'sum')}</td>
                                <td>{rates[data]}</td>
                                <td>{percentage(rates[data])}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <br></br>
            <p className={styles.textColor}>Rates are based from 1 USD
            <br></br>
            This application user API from https://currencyfreaks.com
            </p>
        </div>
    );
}

export default TableRate;