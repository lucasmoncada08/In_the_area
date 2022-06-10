const axios = require("axios");

export const getPlacesData = async (type, sw, ne) => {

    if (!sw || !ne) {
        console.log('No sw or ne')
        return []
    }
    
    const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
        },
        headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    })

    return data
}

export const getWeatherData = async(lat, lng) => {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: {
            lon: lng,
            lat: lat,
        },
        headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    })

    return data
}