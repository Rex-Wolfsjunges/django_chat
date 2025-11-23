from django.shortcuts import render
from .models import ChatRoom

# Create your views here.
def index(request):
    chatrooms = ChatRoom.objects.all()
    context = {
        'chatrooms': chatrooms
    }
    return render(request, "index.html", context)

def chatroom(request, slug):
    chatroom = ChatRoom.objects.get(slug=slug)
    context = {
        'chatroom': chatroom
    }
    return render(request, "chatapp/room.html", context)