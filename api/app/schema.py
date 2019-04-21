import graphene
import uuid

db = {}
db['users'] = [{**user, 'id': str(uuid.uuid4())}
for user in [
    {
        'username': 'Royston',
        'password': 'hash'
    },
    {
        'username': 'Korede',
        'password': 'hash'
    },
    {
        'username': 'Toyosi',
        'password': 'hash'
    }
]]


class User(graphene.ObjectType):
    _id = graphene.ID()
    username = graphene.String()


class CreateUser(graphene.Mutation):
    class Arguments:
        user_name = graphene.String()
        password = graphene.String()

    _id = graphene.ID()
    user_name = graphene.String()

    def mutate(self, info, user_name, password):
        new_user = {
            'id': str(uuid.uuid4()),
            'username': user_name,
            'password': password
        } 

        db['users'].append(new_user)

        return CreateUser(
            _id=new_user['id'],
            user_name=new_user['username']
        )


class DeleteUser(graphene.Mutation):
    class Arguments:
        _id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(self, info, _id):
        db['users'] = [user for user in db['users'] if user['id'] != _id]
        return DeleteUser(ok=True)


class UsersQuery(graphene.ObjectType):
    users = graphene.List(User, id=graphene.ID())

    def resolve_users(self, info, **kwargs):
        _id = kwargs.get('id', None)

        if _id:
            return [
                User(_id=user['id'], username=user['username']) 
                for user in db['users']
                if user['id'] == _id
            ]

        return [User(_id=user['id'], username=user['username']) for user in db['users']]


class RootQuery(UsersQuery):
    pass


class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    delete_user = DeleteUser.Field()


schema = graphene.Schema(query=RootQuery, mutation=RootMutation)