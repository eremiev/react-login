import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {


    return (
        <div className="Input">
            <input
                id={props.name}
                autoComplete="false"
                required
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    );
};

Input.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    placeholer: PropTypes.string
};

export default Input;