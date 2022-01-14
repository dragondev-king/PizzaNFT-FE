import React from 'react';

const DefaultLayout = (ViewComponent) => {
    return class extends React.Component {
        render() {
            return (
                <div className="formCell">
                    <ViewComponent />
                </div>
            )
        }
    }
};

export default DefaultLayout;