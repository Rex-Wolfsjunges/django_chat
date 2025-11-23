from django.shortcuts import render
from .models import ChatRoom

# Create your views here.
def index(request):
    chatrooms = ChatRoom.objects.all()
    context = {
        'chatrooms': chatrooms
    }
    return render(request, "index.html", context)