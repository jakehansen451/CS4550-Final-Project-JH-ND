import React from "react";
import {Link} from "react-router-dom";

const HomeComponent = () => (
    <div>
        <div className="list-group">
            <Link className="list-group-item" to="/search/">Search</Link>
            <Link className="list-group-item" to="/results/">Results</Link>
            <Link className="list-group-item" to="/details/">Details</Link>
            <Link className="list-group-item" to="/login/">Login</Link>
        </div>
    </div>
);

export default HomeComponent;
