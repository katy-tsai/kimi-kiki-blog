import React from 'react';

const View = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="view_layout">
            {children}
        </div>
    );
};

export default View;