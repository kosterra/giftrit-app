import React from 'react';

const Loader = () => (
    <div id="loader" className="box" >
        <span className="letter">L</span>

        <div className="loaderCircle box">
            <div className="loaderInner box">
                <div className="loaderCore box"/>
            </div>
        </div>

        <span className="letter box">A</span>
        <span className="letter box">D</span>
        <span className="letter box">I</span>
        <span className="letter box">N</span>
        <span className="letter box">G</span>
    </div>

);

export default Loader;