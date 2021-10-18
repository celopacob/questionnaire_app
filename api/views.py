from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import (
    PersonSerializer, 
    PersonAnswerSerializer, 
    PersonAnswerSummarySerializer,
    StreamServiceSerializer
)
from .models import QuestionnaireAnswer, Person, StreamService
from .helpers import get_answer_totals_csv_data, get_all_data_csv, json_to_csv


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

    @action(
        methods=["get"],
        detail=True,
        url_path="summary",
        url_name="person_summary",
    )
    def summary(self, request, pk=None):
        person = self.get_object()
        serializer = PersonAnswerSummarySerializer(person)
        return Response(serializer.data)


class PersonAnswerViewSet(viewsets.ModelViewSet):
    queryset = QuestionnaireAnswer.objects.all()
    serializer_class = PersonAnswerSerializer

    @action(
        methods=["get"],
        detail=False,
        url_path="summary",
        url_name="answers_summary",
    )
    def summary(self, request):

        stream_services = StreamService.objects.all()
        data = [
            {
                "name": stream.name,
                "count": QuestionnaireAnswer.objects.filter(
                    stream_service=stream, answer=True
                ).count()
            }
            for stream in stream_services
        ]
        return Response(data)

    @action(
        methods=["get"],
        detail=False,
        url_path="total-answers-csv",
        url_name="total_answers_csv",
    )
    def total_answers_csv(self, request):
        data = get_answer_totals_csv_data()
        if not data:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return json_to_csv(data, "total_stats")

    @action(
        methods=["get"],
        detail=False,
        url_path="all-data-csv",
        url_name="all_data_csv",
    )
    def all_data_csv(self, request):
        data = get_all_data_csv()
        if not len(data) > 0:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return json_to_csv(data, "all_data", True)


class StreamServiceViewSet(viewsets.ModelViewSet):
    queryset = StreamService.objects.all()
    serializer_class = StreamServiceSerializer