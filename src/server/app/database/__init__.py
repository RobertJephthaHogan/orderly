from .event_operations import EventOperations
from .task_operations import TaskOperations
from .user_operations import UserOperations


class DatabaseOperations:

    class EventOperations(EventOperations):
        pass

    class TaskOperations(TaskOperations):
        pass

    class UserOperations(UserOperations):
        pass

    