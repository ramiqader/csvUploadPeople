import csv
import io
from django.http import JsonResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from .models import Person

# Existing upload_csv view function
@csrf_exempt
def upload_csv(request):
    if request.method == "POST":
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        file = request.FILES['file']
        if not file.name.endswith('.csv'):
            return JsonResponse({'error': 'Invalid file type'}, status=400)

        decoded_file = file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)
        required_columns = {'first_name', 'last_name', 'email', 'age'}
        if not required_columns.issubset(reader.fieldnames):
            return JsonResponse({'error': 'CSV missing required columns'}, status=400)

        created_count = 0
        for row in reader:
            try:
                validate_email(row['email'])
                if Person.objects.filter(email=row['email']).exists():
                    continue
                Person.objects.create(
                    first_name=row['first_name'],
                    last_name=row['last_name'],
                    email=row['email'],
                    age=int(row['age'])
                )
                created_count += 1
            except (ValidationError, ValueError, KeyError):
                continue

        return JsonResponse({'message': f'{created_count} people uploaded successfully'})

# New list_people view function
def list_people(request):
    # Get the page number from the query parameters (default is 1)
    page_number = request.GET.get('page', 1)
    people_list = Person.objects.all()

    # Paginate the people list
    paginator = Paginator(people_list, 10)  # Show 10 people per page
    page_obj = paginator.get_page(page_number)

    # Prepare the data to return in the response
    people_data = []
    for person in page_obj:
        people_data.append({
            'first_name': person.first_name,
            'last_name': person.last_name,
            'email': person.email,
            'age': person.age,
        })

    return JsonResponse({
        'people': people_data,
        'total_pages': paginator.num_pages,
        'current_page': page_obj.number
    })
