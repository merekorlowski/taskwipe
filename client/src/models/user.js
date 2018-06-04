import { Model } from 'objectmodel';

class User extends Model({
    userId: String,
    firstName: String,
    lastName: String,
    email: String
}) {

}

export default User;