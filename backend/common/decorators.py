from rest_framework.exceptions import PermissionDenied

def check_admin_nsi_role(function):
    def wrap(request, *args, **kwargs):
        roles = request.user.user_info.get('roles', [])
        if 'admin_nsi' not in roles:
            raise PermissionDenied("You do not have the required role to access this resource.")
        return function(request, *args, **kwargs)
    return wrap
