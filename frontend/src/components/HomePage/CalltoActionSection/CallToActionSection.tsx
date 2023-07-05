import React from 'react'

export const CallToActionSection = () => {
    return (
        <div className='subscribe-section bg-with-black'>
            <div className='container'>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="subscribe-head">
                            <h2> DO you need more tips? </h2>
                            <p>Sign up free and get the latest tips.</p>
                            <form className='form-section'>
                                <input type="email" placeholder='Your Email...' name='email' />
                                <input type="submit" value='Yes. I want' name='subscribe' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
