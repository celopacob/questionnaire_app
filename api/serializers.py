from django.db import models
from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers

from .models import Person, StreamService, QuestionnaireAnswer


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class StreamServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreamService
        fields = ('id', 'name')


class PersonAnswerSerializer(serializers.ModelSerializer):
    stream_service_name = serializers.CharField(read_only=True, source='stream_service.name')

    class Meta:
        model = QuestionnaireAnswer
        fields = (
            "person",
            "stream_service",
            "stream_service_name",
            "answer"
        )

   
class PersonAnswerSummarySerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()

    def get_answers(self, obj):
        answers = QuestionnaireAnswer.objects.filter(person=obj, answer=True)
        return PersonAnswerSerializer(answers, many=True).data

    class Meta:
        model = Person
        fields = (
            "id",
            "first_name",
            "middle_initial",
            "last_name",
            "email",
            "answers"
        )

    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        person = Person.objects.create(**validated_data)
        
        for answer in answers_data:
            QuestionnaireAnswer.objects.create(person=person, **answer)
        return person