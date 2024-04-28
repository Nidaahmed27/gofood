import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
// import Crousel from '../Components/Crousel'

function Home() {
    const [search, setSearch] = useState('');
    const [foodcategory, setfoodcategory] = useState([]);
    const [fooditems, setfooditems] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/FoodItems", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        // console.log(response[0], response[1]);
        setfooditems(response[0])
        setfoodcategory(response[1])

    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
                <div className="carousel-inner" id='banner' >
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" style={{}}>
                        <img src="https://source.unsplash.com/random/300×1800/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×1800/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×1800/?pasta" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "contain" }} />
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="container">
                {
                    foodcategory.length !== 0
                        ? foodcategory.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>{data.category}</div>
                                <hr />
                                {fooditems.length !== 0 ? fooditems.filter((items) => items.category === data.category && items.name.toLowerCase().includes(search.toLowerCase())).map(filteritems => {
                                    // console.log(filteritems)
                                    return (

                                        <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card filteritems={filteritems} options={filteritems.options[0]} />
                                        </div>
                                    )
                                }) : ""
                                }

                            </div>
                            )
                        })
                        : ""

                }

            </div >

            <Footer />
        </div >
    )
}

export default Home
