import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';

export const PERSON_ENDPOINT = 'http://localhost:8000/persons/';
export const STREAM_SERVICE_ENDPOINT = 'http://localhost:8000/stream-services/';
export const ANSWERS_ENDPOINT = 'http://localhost:8000/questionnaire/';
export const HEADERS = { "Content-type": "application/json; charset=UTF-8" };


// Post Person Data
export function addPerson(dispatch, person) {
    fetch(PERSON_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(person),
        headers: HEADERS
    })
        .then((response) => response.json())
        .then(json => {
            dispatch(Actions.setCurrentPerson(json));
        })
        .catch(err => console.log(err));
}

// Post Answer Data
export function addAnswer(personAnswer) {
    let person = personAnswer.person;
    personAnswer.answers.forEach(function (answer) {
        let data = {
            "person": person.id,
            "stream_service": answer,
            "answer": true
        };
        fetch(ANSWERS_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(data),
            headers: HEADERS
        })
            .then((response) => response.json())
            .then(json => {
                console.log("Insert Answer OK....");
            })
            .catch(err => console.log(err));
    });

}

// Fetch Person Summary 
export function fetchPersonSummary(person) {
    const url = PERSON_ENDPOINT + person.id + "/summary/";
    const response = fetch(url, {
        method: "GET",
        headers: HEADERS
    })
        .then((response) => response.json())
        .then(json => {
            console.log("Fetch OK....");
            return json;
        })
        .catch(err => console.log(err));

    return response;
}

// Fetch Total Summary 
export function fetchTotalSummary() {
    const url = ANSWERS_ENDPOINT + "summary/";
    const response = getJsonFromFetch(url);
    return response;
}

// Fetch Stream Service List 
export function* fetchStreamServiceList() {
    const response = yield call(fetch, STREAM_SERVICE_ENDPOINT);
    const data = yield response.json();
    yield put({ type: Actions.RENDER_STREAM_LIST, streamServiceList: data });
}

export function* loadStreamServiceList() {
    yield takeEvery(Actions.LOAD_STREAM_LIST, fetchStreamServiceList);
}

export default function* rootSaga() {
    yield all([
        loadStreamServiceList()
    ]);
}

export function getJsonFromFetch(url) {
    const jsonData = fetch(url)
        .then((response) => response.json())
        .then(json => {
            console.log("Fetch OK....");
            return json;
        })
        .catch(err => console.log(err));

    return jsonData;
}
