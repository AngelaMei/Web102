import React from "react";

const Answer = ({handleChange, color}) => {
    return (
        <div className="answer-form">
        <h3>The dog's breed is :</h3>
        <form>
            <input
                type="text" 
                placeholder='Enter Here'
                onChange={handleChange}
                style={{backgroundColor: color}}
                />
        </form>
        </div>
    );
};

export default Answer;