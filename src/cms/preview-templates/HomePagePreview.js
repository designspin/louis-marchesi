import React from 'react';

import { HomePageTemplate } from '../../templates/home-page';

const HomePagePreview = ({ entry }) => {
    return (
    <HomePageTemplate
        fullImage={entry.getIn(['data', 'full_image'])}
        heading={entry.getIn(['data', 'heading'])}
    />
    )
}

export default HomePagePreview;