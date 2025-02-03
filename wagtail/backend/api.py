from rest_framework.renderers import JSONRenderer
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.api.v2.router import WagtailAPIRouter
from blog.models import BlogPage
from group.models import GroupPage

api_router = WagtailAPIRouter('wagtailapi')

class BlogPagesAPIViewSet(PagesAPIViewSet):
    model = BlogPage
    
    def get_queryset(self):
        return super().get_queryset().live().public()

class GroupPagesAPIViewSet(PagesAPIViewSet):
    model = GroupPage
    
    def get_queryset(self):
        return super().get_queryset().live().public()

api_router.register_endpoint('groups', GroupPagesAPIViewSet)
api_router.register_endpoint('posts', BlogPagesAPIViewSet)