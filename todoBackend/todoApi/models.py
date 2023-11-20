from django.db import models


class Todo(models.Model):
    task = models.CharField(max_length=75)
    date = models.DateField()
    completion_status = models.BooleanField(default=False)

    class Meta:
        ordering = ['id', 'task', 'date']

    def __str__(self):
        return self.task
