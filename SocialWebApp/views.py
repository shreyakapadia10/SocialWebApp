from django.shortcuts import render
import pymongo
from django.contrib import messages
from django.http import JsonResponse
from pymongo import response
from pymongo import message

def index(request):
    if request.method == "POST":
        collection_name = make_db_connection()

        id = request.POST.get('ID')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dob = request.POST.get('dob')
        address = request.POST.get('address')
        email = request.POST.get('email')
        country = request.POST.get('country')
        graduation = request.POST.get('graduation')
        hobbies = request.POST.get('hobbies')
        password = request.POST.get('password')        

        my_hobbies = hobbies.split(', ')

        user = {
            "_id": id,
            "first_name": first_name,
            "last_name": last_name,
            "dob": dob,
            "address": address,
            "email": email,
            "country": country,
            "graduation": graduation,
            "my_hobbies": my_hobbies,
            "password": password,
        }
        
        try:
            collection_name.insert_one(user)
            messages.success(request, 'Registered Successfully!')
        except:
            messages.warning(request, 'Can\'t register, please try again!')
        
    return render(request, 'index.html')

def make_db_connection():
    connect_string = 'mongodb://127.0.0.1:27017/' 
    my_client = pymongo.MongoClient(connect_string)

    dbname = my_client['College']
    collection_name = dbname["socialwebapp"]

    return collection_name

def search(request):
    if request.is_ajax():
        query = request.POST.get('query')
        id = request.POST.get('ID')
        collection_name = make_db_connection()

        if query == "search":
            response = {'msg': 'error'}
            result = collection_name.find({"_id": id})
            
            for data in result:
                response['first_name'] = data['first_name']
                response['last_name'] = data['last_name']
                response['dob'] = data['dob']
                response['address'] = data['address']
                response['email'] = data['email']
                response['country'] = data['country']
                response['graduation'] = data['graduation']
                response['hobbies'] = data['my_hobbies']
                response['password'] = data['password']
                if data:
                    response['msg'] = 'success'
                else:
                    pass
            return JsonResponse(response)
        else:    
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            dob = request.POST.get('dob')
            address = request.POST.get('address')
            email = request.POST.get('email')
            country = request.POST.get('country')
            graduation = request.POST.get('graduation')
            hobbies = request.POST.get('hobbies')
            password = request.POST.get('password')        

            my_hobbies = hobbies.split(', ')
            
            result = collection_name.update_one({"_id": id}, {'$set': {'first_name': first_name, 'last_name': last_name, 'dob': dob, 'address': address, 'email': email, 'country': country, 'graduation': graduation, 'my_hobbies': my_hobbies, 'password': password}})

            response = {'msg': 'error'}

            if result.matched_count == 1:
                response = {'msg': 'success'}
            else:
                pass

            return JsonResponse(response)
    else:
        return render(request, 'search.html')