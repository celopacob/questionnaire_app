import * as Actions from '../actions';
import {
    addPerson,
    addAnswer,
    fetchPersonSummary,
    fetchTotalSummary
} from '../sagas';

const initialState = {
    streamServiceList: [],
    currentPerson: null,
    summary: null,
    totalSummary: []
};

export default function questionnaireReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.RENDER_STREAM_LIST:
            return {
                ...state,
                streamServiceList: action.streamServiceList
            };

        case Actions.ADD_PERSON:
            addPerson(action.dispatch, action.person);
            return state;

        case Actions.ADD_ANSWER:
            addAnswer(action.personAnswer);
            return state;

        case Actions.SET_CURRENT_PERSON:
            return {
                ...state,
                currentPerson: action.person,
            };

        case Actions.SET_PERSON_SUMMARY:
            const summary = fetchPersonSummary(action.person);
            console.log(summary);
            return {
                ...state,
                summary: summary,
            };

        case Actions.SET_TOTAL_SUMMARY:
            const totalSummary = fetchTotalSummary();
            console.log(totalSummary);
            return {
                ...state,
                totalSummary: totalSummary,
            };

        default:
            return state;
    }
}
