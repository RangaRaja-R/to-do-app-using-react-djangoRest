from django.db import models


class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.CharField(max_length=75)
    date = models.DateField()
    completion_status = models.BooleanField(default=False)

    class Meta:
        ordering = ['task', 'date']

    def __str__(self):
        return self.task
