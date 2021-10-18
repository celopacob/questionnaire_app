import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import * as Pages from './pages';
import history from './history';


class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Pages.Home />
                        </Route>
                        <Route path="/personal-info">
                            <Pages.PersonalInfo />
                        </Route>
                        <Route path="/music-preference">
                            <Pages.MusicPreference />
                        </Route>
                        <Route path="/summary">
                            <Pages.Summary />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
