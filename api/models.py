from django.db import models


class Person(models.Model):
    first_name = models.CharField(max_length=60)
    middle_initial = models.CharField(max_length=1, blank=True, null=True)
    last_name = models.CharField(max_length=60)
    email = models.CharField(max_length=100)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class StreamService(models.Model):
    # This will give the app the opportunity to expand 
    # if you have another option to include
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class QuestionnaireAnswer(models.Model):
    person = models.ForeignKey("Person", null=True, on_delete=models.CASCADE)
    stream_service = models.ForeignKey("StreamService", on_delete=models.CASCADE)
    answer = models.BooleanField(default=False)
