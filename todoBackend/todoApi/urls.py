from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='todo-api-overview'),
    path('todo-create/', views.api_create, name='create-todo-item'),
    path('todo-list/', views.api_list, name='todo-list'),
    path('todo-details/<str:task_id>', views.api_details, name='todo-detail'),
    path('todo-update/<str:task_id>', views.api_update, name='todo-update'),
    path('todo-delete/<str:task_id>', views.api_delete, name='delete-todo-item')
]
