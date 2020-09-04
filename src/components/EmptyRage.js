import React from 'react';

function EmptyPage ({ text }) {
    return <div className='empty-cart'>
        <span>{ text }</span>
    </div>;
}

export default EmptyPage;