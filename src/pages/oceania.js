import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { FaGlobeAsia } from 'react-icons/fa'
import { motion } from 'framer-motion';

import Card from '../components/Card'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import MenuHamburger from '../components/MenuHamburger'

export default function Oceania() {
    
    const [countries, setCountries] = useState('')
    const [cases, setCases] = useState('')
    const [active, setActive] = useState('')
    const [todayCases, setTodayCases] = useState('')
    const [population, setPopulation] = useState('')
    const [deaths, setDeaths] = useState('')
    const [todayDeaths, setTodayDeaths] = useState('')

    useEffect(() => {
        axios
            .get('https://disease.sh/v3/covid-19/continents/Australia%2FOceania?yesterday=true&twoDaysAgo=true&strict=true')
            .then(res => {
            
                setCountries(res.data.countries)
                setCases(res.data.cases)
                setActive(res.data.active)
                setTodayCases(res.data.todayCases)
                setPopulation(res.data.population)
                setDeaths(res.data.deaths)
                setTodayDeaths(res.data.todayDeaths)
    
                // console.log(res.data)
            })
    }, [])

    return (
        <div>
            <MenuHamburger />
            <div className="container">
                <Menu />
                <motion.div 
                    transition={{ delay: 0.5, duration: 0.5 }}
                    variants={{
                        show: { opacity: 1 },
                        hidden: { opacity: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                    className="dataDiv"
                >
                    <h1>Oceania <FaGlobeAsia /></h1>
                    <div className="cards-container">
                        <Card title="Número atualizado de casos:" info={cases.toLocaleString('pt-BR')}/>
                        <div className="part">
                            <div>
                                <Card title="Número de países atingidos:" info={countries.length} />
                                <Card title="Número de casos ativos:" info={active.toLocaleString('pt-BR')} />
                                <Card title="Número de casos registrados hoje:" info={todayCases.toLocaleString('pt-BR')} />
                            </div>
                            <div>
                                <Card title="População:" info={population.toLocaleString('pt-BR')} />
                                <Card title="Número de mortes:" info={deaths.toLocaleString('pt-BR')} />
                                <Card title="Número de mortes registradas hoje:" info={todayDeaths.toLocaleString('pt-BR')} />
                            </div>
                        </div>
                    </div>
                </motion.div>  
            </div>
            <Footer />
        </div>
    )
}
