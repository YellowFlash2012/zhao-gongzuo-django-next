from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):

    response = exception_handler(exc, context)

    exception_class = exc.__class__.__name__

    print(exception_class)

    if exception_class == 'AuthenticationFailed':
        response.data = {
            "error": "Invalid credentials. Please try again."
        }

    if exception_class == 'NotAuthenticated':
        response.data = {
            "error": "You need to login first to access this resource."
        }

    if exception_class == 'InvalidToken':
        response.data = {
            "error": "Your authentication token has expired. Please login again."
        }


    return response