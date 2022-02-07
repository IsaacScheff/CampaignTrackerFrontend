import React from "react";

export function SearchErrorMessage () {

    return (
        <div>
            <span className="close">  </span>
            <p>Campaign not found.</p>
            <p>Campaign search is case sensitive.</p>
        </div>
  );
}

export default SearchErrorMessage;