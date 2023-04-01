import React from 'react'
export default function PageHeader(props) {

    const { title, description, icon } = props;
    return (
        <div>
            <div className='border-b-2 flex'>
                <div >
                    {icon}
                </div>
                <div className='m-3'>
                    <h1 className='inline font-medium text-xl text-gray-700'>{title}</h1>
                    <h2>{description}</h2>
                </div>
            </div>
        </div>
    )
}
