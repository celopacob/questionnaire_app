export const ADD_PERSON = 'ADD_PERSON';
export const ADD_ANSWER = 'ADD_ANSWER';

export const DOWNLOAD_SUMMARY_CSV = 'DOWNLOAD_SUMMARY_CSV';
export const DOWNLOAD_ALL_DATA_CSV = 'DOWNLOAD_ALL_DATA_CSV';

export const SET_CURRENT_PERSON = 'SET_CURRENT_PERSON';
export const SET_PERSON_SUMMARY = 'SET_PERSON_SUMMARY';
export const SET_TOTAL_SUMMARY = 'SET_TOTAL_SUMMARY';

export const LOAD_STREAM_LIST = 'LOAD_STREAM_LIST';
export const RENDER_STREAM_LIST = 'RENDER_STREAM_LIST';


export function addPerson(dispatch, person) {
    return {
        type: ADD_PERSON,
        dispatch,
        person
    };
}

export function setCurrentPerson(person) {
    return {
        type: SET_CURRENT_PERSON,
        person
    };
}

export function loadStreamList() {
    return {
        type: LOAD_STREAM_LIST
    };
}

export function addAnswer(personAnswer) {
    return {
        type: ADD_ANSWER,
        personAnswer
    };
}

export function setPersonSummary(person) {
    return {
        type: SET_PERSON_SUMMARY,
        person
    };
}

export function setTotalSummary() {
    return {
        type: SET_TOTAL_SUMMARY,
    };
}

