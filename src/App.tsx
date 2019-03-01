import * as React from 'react';
import './App.css';
import GeolocationLoader from './components/geolocation-loader/geolocation-loader';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={createMuiTheme()}>
                <div>
                    <header>
                        AdSets
                    </header>
                    <article>
                        <GeolocationLoader />
                    </article>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
