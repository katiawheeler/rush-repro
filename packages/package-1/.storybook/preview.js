import React from 'react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { initializeRTL } from 'storybook-addon-rtl';
import { Container } from '../src/components';
// adds global styles like font and color defaults to each story
import '../src/css/globals.css';

// initialize RTL addon
initializeRTL();

const withContainer = (Story) => {
    return (
        <Container>
            <Story />
        </Container>
    )
}

export const decorators = [withContainer]

const viewports = {
    Tablet: {
        name: 'Tablet',
        styles: {
            width: '768px',
            height: '100%'
        },
        type: 'tablet'
    },
    MobileXL: {
        name: 'Mobile XL',
        styles: {
            width: '576px',
            height: '100%'
        },
        type: 'mobile'
    },
    Mobile: {
        name: 'Mobile',
        styles: {
            width: '375px',
            height: '100%'
        },
        type: 'mobile'
    }
}

// sort the stories alphabetically within their category
export const parameters = {
    viewport: {
        viewports,
    },
    options: {
        // https://storybook.js.org/docs/configurations/options-parameter/#sorting-stories
        storySort: (a, b) => a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
    docs: {
        container: DocsContainer,
        page: DocsPage
    },
}
