import React, { useState, useEffect } from 'react';
import './Donate.css'
import { useQuery } from '@apollo/client'
import CheckoutButton from './btn/CheckButton';

// --------------------------------------------------------------------------------
// Component
function Donate() {
    return (
        <>

            <div className='donate'>
                <h1>Donate</h1>
                <h2>Donate to our cause! <i class="fa-solid fa-circle-dollar-to-slot"></i></h2>
                <div className='why'>
                    <article>
                        <h1>Why Donate?</h1>
                        <p>We are a group of students that are just learning constantly to become the best junior
                            Developers of our generation. We spend hours and hours a week studying, coding and reading through
                            one of the most challenging carrers out there and we are more than proud to be part of this family and
                            community. We are also very thankful for the opportunity to be able to learn and grow together as a team.
                        </p>
                    </article>
                    <article>
                        <h1>What did we learned through this amazing 6 months?</h1>
                        <p>
                            We learned how to work as a team, how to communicate with each other, how to solve problems and how to
                            be patient and kind to each other. We learned how to use different technologies and how to implement them
                            into our projects. We learned how to be a better person and how to be a better developer. We learned how to
                            be a better version of ourselves.
                            <h3>What technologies did we learned?</h3>
                            <div className='imagenes'>
                                <img src='https://www.svgrepo.com/show/349419/javascript.svg' ></img>
                                <img src='https://www.svgrepo.com/show/303205/html-5-logo.svg' ></img>
                                <img src='https://www.svgrepo.com/show/452185/css-3.svg' ></img>
                                <img src='https://www.svgrepo.com/show/354259/react.svg' ></img>
                                <img src='https://www.svgrepo.com/show/373644/graphql.svg' ></img>
                                <img src='https://www.svgrepo.com/show/354118/nodejs.svg' ></img>
                                <img src='https://www.svgrepo.com/show/421381/api-app-coding-2.svg' ></img>
                                <img src='https://www.svgrepo.com/show/331488/mongodb.svg' ></img>
                                <img src='https://www.svgrepo.com/show/303251/mysql-logo.svg' ></img>
                                <img src='' ></img>
                            </div>

                        </p>
                    </article>
                </div>



                <CheckoutButton />

            </div>

        </>
    )

}

export default Donate;