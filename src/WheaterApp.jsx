import { useState } from "react"


export const WheaterApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'a66d4a02a4f6adf0248dbcd7301a1537'
    const difKelvin = 273.15
    const [ciudad, setCiudad] = useState('') // [valor, funcion que cambia el valor
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.trim().length > 1) {
            fetchClima()
            setCiudad('')
        }
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error('Ocurrio el siguiente promblema: ', error)
        }

        
    }

  return (
    <div className="container">
        <h1>Aplicacion de clima</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" 
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>
                            Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C
                        </p>
                        <p>Condición: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                    </div>
                )
            }
    </div>
  )
}
