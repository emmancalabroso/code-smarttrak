from django.contrib import admin
from django.http import JsonResponse
from django.urls import path


def hello_world(_request):
    return JsonResponse({"message": "Hello World from SmartTrak backend"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/hello/", hello_world, name="hello-world"),
]
