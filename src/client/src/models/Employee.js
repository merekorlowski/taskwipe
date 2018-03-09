   export default class Employee {
        constructor(id, firstName, lastName, email) {
            this.id=id;
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.roles=[];
        }

        modify(firstName, lastName, email) {
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
        }

        assignRoles(role){
            this.roles.push(role);
        }
        
        removeRoles(role){
            var index =this.roles.indexOf(role);
            if(index > -1){
            this.roles.splice(index,1);
            }
        }
   }
