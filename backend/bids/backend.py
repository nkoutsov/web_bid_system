import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from .models import User
from rest_framework import exceptions, HTTP_HEADER_ENCODING
import backend.settings as settings

def get_authorization_header(request):
    """
    Return request's 'Authorization:' header, as a bytestring.
    Hide some test client ickyness where the header can be unicode.
    """
    auth = request.META.get('HTTP_AUTHORIZATION', b'')
    if type(auth) == type(''):
        # Work around django test client oddness
        auth = auth.encode(HTTP_HEADER_ENCODING)
    return auth

class JWTAuthentication(object):

        """
        Simple token based authentication.
        Clients should authenticate by passing the token key in the "Authorization"
        HTTP header, prepended with the string "Token ".  For example:
        Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
        """

        def authenticate(self, request):
            auth = get_authorization_header(request).split()

            if not auth or auth[0].lower() != b'token':
                return None

            try:
                token = auth[1].decode()
            except UnicodeError:
                msg = _('Invalid token header. Token string should not contain invalid  characters.')
                raise exceptions.AuthenticationFailed(msg)

            return self.authenticate_credentials(token)

        def authenticate_credentials(self, payload):

            decoded_dict = jwt.verify(payload, settings.SECRET_KEY, algorithms=['HS256'])

            username = decoded_dict.get('username', None)
            expiry = decoded_dict.get('expiry', None)

            try:
                usr = User.objects.get(username=username)
            except model.DoesNotExist:
                raise exceptions.AuthenticationFailed(_('Invalid token.'))

            if not usr.is_active:
                raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

            if expiry < datetime.date.today():
                raise exceptions.AuthenticationFailed(_('Token Expired.'))

            return (usr, payload)

        def authenticate_header(self, request):
            return 'token'


from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class AuthenticationMiddlewareJWT(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        return self.get_response(request)

    @staticmethod
    def get_jwt_user(request):
        user = get_user(request)
        print("user:",user)
        if user.is_authenticated:
            return user
        jwt_authentication = JSONWebTokenAuthentication()
        # print(dir(request))
        print(request.headers)
        if jwt_authentication.get_jwt_value(request):
            user, jwt = jwt_authentication.authenticate(request)
        else :
            print("BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD")
        return user