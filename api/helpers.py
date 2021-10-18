import csv

from django.http import HttpResponse

from .models import QuestionnaireAnswer, StreamService, Person


def json_to_csv(json_data, filename, list=False):
    # customized answer to my json structured data

    headers = [] # json_data.keys()
    if list:
        for k, v in json_data[0].items():
            headers.append(k)
    else:
        for k, v in json_data.items():
            headers.append(k)

    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = (
        'attachment; filename="' + filename + '.csv"'
    )

    writer = csv.DictWriter(response, fieldnames=headers)
    writer.writeheader()
    if list:
        writer.writerows(json_data)
    else:
        writer.writerow(json_data)

    return response

def percent_or_none(value, **kwargs):
    if value is None:
        return None

    return int(round(value * 100, 2))

def get_answer_totals_csv_data():
    """
        Return single row csv data items to process
    """ 
    qs_summary = QuestionnaireAnswer.objects.filter(answer=True)
    total = qs_summary.count()
    data = {"total": total}
    stream_services = StreamService.objects.all()

    for stream in stream_services:
        stream_total = QuestionnaireAnswer.objects.filter(
            stream_service=stream, answer=True
        ).count()
        stream_pct = percent_or_none(stream_total/total)

        data["{}_total".format(stream.name.lower().replace(' ', '_'))] = stream_total
        data["{}_percentage".format(stream.name.lower().replace(' ', '_'))] = stream_pct

    return data

def get_all_data_csv():
    """
        Return all data items to process
    """ 
    qs_person = Person.objects.all()
    data = []
    for person in qs_person:
        data_item = {
            "first_name": person.first_name,
            "last_name": person.last_name,
            "email": person.email
        }

        stream_services = StreamService.objects.all()
        for stream in stream_services:
            stream_answer = True if QuestionnaireAnswer.objects.filter(
                stream_service=stream, person=person, answer=True
            ).count() > 0 else False
            
            data_item[stream.name.lower().replace(' ', '_')] = stream_answer
        data.append(data_item)

    return data
