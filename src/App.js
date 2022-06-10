import React, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData, getWeatherData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

function App() {

    const [places, setPlaces] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null)

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    const filterOutInvalidPlaces = (place) => {
        return place.name
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoordinates({ lat: latitude, lng: longitude})
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating)
        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        setFilteredPlaces(places.filter((place) => place.rating > rating))
        setIsLoading(false)
    }, [places])

    useEffect(() => {
        setIsLoading(true)
        if (!bounds.sw || !bounds.ne) return
        getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data))
            .catch((err) => console.log(err.response))

        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => setPlaces(data?.filter(filterOutInvalidPlaces)))
    }, [type, bounds])

    return <>
        <CssBaseline/>
        <Header
            setCoordinates={setCoordinates}
            setBounds={setBounds}
        />
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                    weatherData={weatherData}
                />
            </Grid>
        </Grid>
    </>
}

export default App