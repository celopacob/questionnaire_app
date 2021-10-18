from api.models import Person, StreamService
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory


class PersonTestCase(APITestCase):
    def test_get_person_list(self):
        response = self.client.get('/persons/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_insert_person(self):
        data = {
            "first_name": "Hello",
            "last_name": "World",
            "email": "helloworld@test.com"
        }
        response = self.client.post('/persons/', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['first_name'], "Hello")


class QuestionnaireTestCase(APITestCase):
    def setUp(self):
        # Setting a user
        self.person_1 = Person.objects.create(
            first_name="Hello",
            last_name="World",
            email="helloworld@test.com"
        )

        # Setting Stream Services
        self.spotify = StreamService.objects.create(name="Spotify")
        self.google_music = StreamService.objects.create(name="Google Music")
        self.pandora = StreamService.objects.create(name="Pandora")
        

    def test_get_answers_list(self):
        response = self.client.get('/questionnaire/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_insert_answer(self):
        data = {
            "person": self.person_1.id,
            "stream_service": self.spotify.id,
            "answer": True
        }
        response = self.client.post('/questionnaire/', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['person'], self.person_1.id)
        self.assertEqual(response.data['stream_service'], self.spotify.id)
        self.assertEqual(response.data['answer'], True)