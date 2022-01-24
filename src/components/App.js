import React, { useState, useEffect } from 'react';
import Header from './Header'
import axios from 'axios';
import { Card, Input, Image } from 'semantic-ui-react'
import placeholderImage from '../images/placeholder.png'

export default function App() {

    const [apiData, setAPIData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const [photoData, setPhotoData] = useState([]);

    useEffect(() => { // get user data
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
               setAPIData(response.data);
            })
    }, [])

    useEffect(() => { // get photo data
         axios.get("https://jsonplaceholder.typicode.com/photos")
            .then((response) => {
               setPhotoData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
            setSearchInput(searchValue)
            if (searchInput !== '') { // if our search is empty
                 const filteredData = apiData.filter((item) => { // show all the data
                     return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
                }) // get values from the object item, convert the values to a string, change string values to lowercase,
                // check if string includes user's search input, and finally convert to lowercase (for a more effective search)
                setFilteredResults(filteredData) // set the state of filtered data
           } else { // otherwise filter according to search input
                setFilteredResults(apiData)
           }
     }

    return (
        <div style={{ padding: 20 }}>
          <center>
            <Header />
            <Input icon='search'
                placeholder='Search names...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <Card.Group itemsPerRow={1} style={{ marginTop: 20 }} className="cardGroup" >
               {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                         return (
                              <center>
                              <Card className="cardStyle">
                                <Card.Content>
                                <div className="container">
                                   <Image src={placeholderImage} alt="" value="placeholder" size="small" wrapped href="" target="_blank" />
                                   <br/>
                                    <Card.Header className="cardHeader"><strong>{item.name}</strong></Card.Header> / <br/>
                                    <Card.Description>
                                        {item.email}
                                    </Card.Description>
                                    <br/>
                                   </div>
                                </Card.Content>
                            </Card>
                            </center>
                         )
                    })
               ) : (
                    apiData.map((item, key) => {
                       return (
                            <center>
                           <Card>
                               <Card.Content>
                               <div className="container">
                                  <Image src={placeholderImage} alt="" value="placeholder" size="small" wrapped href="" target="_blank" />
                                   <br/>
                                   <Card.Header className="cardHeader"><strong>{item.name}</strong></Card.Header> / <br/>
                                   <Card.Description>
                                       {item.email}
                                   </Card.Description>
                                   <br/>
                               </div>
                               </Card.Content>
                           </Card>
                           </center>
                       )
                   })
               )}
            </Card.Group>
          </center>
        </div>
    )
}
