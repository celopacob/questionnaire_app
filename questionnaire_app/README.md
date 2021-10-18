# Questionnaire APP

Questionnaire APP is a simple App to acquire users data and some questionnaire answers.

## Dependencies
- Python 3.8.5
- pyenv 1.2.22
- Linux or Mac

## Getting the project up and running
- To get the project:
    ```
    Unzip the contents
    ```
- To enter the project:
    ```
    cd questionnaire_app
    ```

## Creating and Activating the Virtual Environment
- To create the virtual environment:
    ```
    pyenv virtualenv env
    ```
- To activate the virtual environment:
    ```
    pyenv local env
    ```

## Downloading dependencies and running the project (Backend)
- To download dependencies:
    ```
    pip install -r requirements.txt
    ```

- To run the project:
    ```
    python manage.py migrate
    python manage.py createsuperuser (insert your super user)
    python manage.py runserver

    Server should be running on localhost:8000
    ```

## Downloading dependencies and running the project (Frontend)

- The frontend app is inside 'frontend' folder;

- To download dependencies:
    ```
    npm install
    ```

- To run the project:
    ```
    npm start

    Server should be running on localhost:3000
    ```

## Database
- The database is a SQLite implementation, for simplicity
- There's also all the proposed options for stream services

## Testing
- I wrote a few tests (really few) for the time being, but I hope they are considered, hehe.

- To run tests, just execute:
```
python manage.py test
```

<br>

## Routes

### Persons

```
http://localhost:8000/persons/ (GET)

This will give you a list of persons that submitted responses to the forms
[
    {
        "id": 1,
        "first_name": "John",
        "middle_initial": "S",
        "last_name": "Doe",
        "email": "johndoe@gmail.com"
    },
    {
        "id": 2,
        "first_name": "Joanna",
        "middle_initial": "P",
        "last_name": "Doe",
        "email": "joannadoe@gmail.com"
    },
]
```

```
http://localhost:8000/persons/ (POST)

This will insert a person in the database

{
    "first_name": "John",
    "middle_initial": "S",
    "last_name": "Doe",
    "email": "johndoe@gmail.com"
}
```

```
http://localhost:8000/persons/{id}/ (GET)

This will return one person by one's id
{
    "id": 1,
    "first_name": "John",
    "middle_initial": "S",
    "last_name": "Doe",
    "email": "johndoe@gmail.com"
}
```

```
http://localhost:8000/persons/{id}/summary (GET)

This will return the form answers by a person's id

{
    "id": 1,
    "first_name": "John",
    "middle_initial": "S",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "answers": [
        {
            "person": 1,
            "stream_service": 1,
            "stream_service_name": "Spotify",
            "answer": true
        },
        {
            "person": 1,
            "stream_service": 2,
            "stream_service_name": "Google Music",
            "answer": true
        },
        {
            "person": 1,
            "stream_service": 4,
            "stream_service_name": "Other",
            "answer": true
        }
    ]
}
```


### Questionnaire

```
http://localhost:8000/questionaire/ (GET)

This will return a list of all questionnaire answers submited

[
    {
        "person": 1,
        "stream_service": 1,
        "stream_service_name": "Spotify",
        "answer": true
    },
    {
        "person": 1,
        "stream_service": 2,
        "stream_service_name": "Google Music",
        "answer": true
    },
    {
        "person": 2,
        "stream_service": 2,
        "stream_service_name": "Google Music",
        "answer": true
    },
]
```

```
http://localhost:8000/questionaire/ (POST)

This will insert an questionnaire answer in the database

{
    "person": 1,
    "stream_service": 1,
    "answer": true
}

```


```
http://localhost:8000/questionaire/{id}/ (GET)

This will return one questionnaire answer based on its id

{
    "person": 1,
    "stream_service": 1,
    "stream_service_name": "Spotify",
    "answer": true
}

```

```
http://localhost:8000/questionaire/summary/ (GET)

This will return a summary list of all questionnaire answers submited

[
    {
        "name": "Spotify",
        "count": 4
    },
    {
        "name": "Google Music",
        "count": 3
    },
    {
        "name": "Pandora",
        "count": 1
    },
    {
        "name": "Other",
        "count": 3
    }
]
```

```
http://localhost:8000/questionaire/total-answers-csv/ (GET)

This will return a CSV file with one line, containing the total number of answers submited to the form, and the total count and percentage of the total answers for each Stream Service saved on the database
```

```
http://localhost:8000/questionaire/all-data-csv/ (GET)

This will return a CSV file containing all the data saved on the forms, described below:

First name, last name, email, answers for all services saved on the database
```
