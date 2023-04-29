import { useState } from 'react'
import './Container.css'

const Container = () => {

    const [result, setResult] = useState(0)

    const getURL = async (url) => {
        return(await fetch(url)).json()
    }
    const getCurrency = async () => {
        const rates = await getURL('https://v6.exchangerate-api.com/v6/f3b19b928f56925c20b8d793/latest/USD')
        const conversionRate = rates["conversion_rates"]["BRL"]
        console.log(conversionRate)
        return conversionRate
    }
    
    const handleButtonClick = async () => {
        const selectedOption = document.querySelector('#select').value
        const value = document.querySelector('#value').value
        const conversionRate = await getCurrency()

        console.log(conversionRate)
        if(selectedOption == 'realToDolar'){
            setResult("$USD  "+Math.floor(value/conversionRate*100)/100)
        }
        else{
            setResult("R$  "+Math.floor((value*conversionRate)*100)/100)
        }

        
    }



    return(
        <div className="container">
            <h1>Conversor de Moedas</h1>
            <input id='value' type="text" placeholder='Valor para converter'/>
            <select name="" id="select">
                <option value="realToDolar">Real para dólar</option>
                <option value="dolarToReal">Dólar para real</option>
            </select>
            <br />
            <button onClick={handleButtonClick}>Converter</button>
            <h3>Resultado: {result}</h3>
        </div>
        
    )
}

export default Container;