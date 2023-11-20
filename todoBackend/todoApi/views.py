from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'todo list': '/todo-list',
        'task details': '/todo-details',
        'create todo item': '/todo-create',
        'update todo item': '/todo-update/<int:task_id>',
        'delete todo item': '/todo-delete/<int:task_id>',
    }
    return Response(api_urls)


@api_view(['GET'])
def api_list(request):
    tasks = Todo.objects.all()
    serializer = TodoSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_details(request, task_id):
    task = Todo.objects.get(id=task_id)
    serializer = TodoSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
def api_create(request):
    serializer = TodoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['PUT'])
def api_update(request, task_id):
    task = Todo.objects.get(id=task_id)
    serializer = TodoSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_delete(request, task_id):
    task = Todo.objects.get(id=task_id)
    task.delete()
    return Response(f'deleted task {task_id}')
