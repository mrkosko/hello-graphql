import graphene

db = {}
db['users'] = [
    {
        'id': 'something',
        'username': 'Royston',
        'password': 'hash'
    },
    {
        'id': 'something1',
        'username': 'Korede',
        'password': 'hash'
    },
    {
        'id': 'something2',
        'username': 'Toyosi',
        'password': 'hash'
    }
]


class GetUserModel(graphene.ObjectType):
    _id = graphene.String()
    username = graphene.String()


class CreateUserModel(graphene.ObjectType):
    user_name = graphene.String()
    password = graphene.String()


class UsersQuery(graphene.ObjectType):
    users = graphene.List(GetUserModel)

    def resolve_users(self, info):
        return [GetUserModel(
            _id = user['id'],
            username = user['username']
        ) for user in db['users']]


class RootQuery(UsersQuery):
    pass


"""class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()"""


schema = graphene.Schema(query=RootQuery)