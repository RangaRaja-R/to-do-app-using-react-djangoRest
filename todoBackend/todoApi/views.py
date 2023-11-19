from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'todo list': '/todo-list',
        'create todo item': '/todo-create',
        'update todo item': '/todo-update',
        'delete todo item': '/todo-delete',
    }
    return Response(api_urls)
